import React, { useEffect, useMemo, useState } from "react";
import { Plus, Upload, Video, Play, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import CardGrid from "@/components/kit/CardGrid";
import ConfirmDialog from "@/components/kit/ConfirmDialog";
import DataTable from "@/components/kit/DataTable";
import DetailList from "@/components/kit/DetailList";
import Drawer from "@/components/kit/Drawer";
import EmptyState from "@/components/kit/EmptyState";
import Modal from "@/components/kit/Modal";
import Pagination from "@/components/kit/Pagination";
import PageHeader from "@/components/kit/PageHeader";
import RecordForm from "@/components/kit/RecordForm";
import SectionCard from "@/components/kit/SectionCard";
import StatCard from "@/components/kit/StatCard";
import StatusBadge from "@/components/kit/StatusBadge";
import ListToolbar from "@/components/kit/ListToolbar";
import { btnPrimary, btnSecondary } from "@/components/kit/styles";
import ContentImage from "@/components/kit/ContentImage";
import { useData } from "@/lib/DataStore";
import { MODULES, recordTitle } from "@/lib/data/modules";
import { formatDate } from "@/lib/format";
import { findNavItem } from "@/lib/navConfig";
import { cn } from "@/lib/utils";
import api from "@/api/backendClient";

const PAGE_SIZE = 8;

function extractYoutubeId(url = "") {
  if (!url) return null;
  const match = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

function defaultsFor(config) {
  const values = {};
  config.fields.forEach((field) => {
    values[field.name] = field.type === "select" ? field.options?.[0] || "" : "";
  });
  return values;
}

export default function ResourcePage({ moduleKey }) {
  const config = MODULES[moduleKey];
  const { collections, create, update, remove, fetchModule, loadingModules, loadedKeys } = useData();
  const isLoaded = loadedKeys?.has(moduleKey);
  const isLoading = Boolean(loadingModules?.[moduleKey] || !isLoaded);
  const rows = collections[moduleKey] || [];
  const navItem = findNavItem(`/${moduleKey}`);

  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [sort, setSort] = useState({ key: "updated_date", dir: "desc" });
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState(() => defaultsFor(config));
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Lazy load this specific module from backend PostgreSQL
  useEffect(() => {
    if (moduleKey && fetchModule) {
      fetchModule(moduleKey);
    }
  }, [moduleKey, fetchModule]);

  useEffect(() => {
    setQuery("");
    setFilterValues({});
    setPage(1);
    setSelectedId(null);
    setSort({ key: "updated_date", dir: "desc" });
  }, [moduleKey]);

  const openCreate = () => {
    setEditingId(null);
    setFormValues(defaultsFor(config));
    setFormOpen(true);
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const megabytes = file.size / 1048576;
    const size = megabytes >= 1 ? `${megabytes.toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`;

    try {
      toast.info("Uploading asset to server...");
      const uploaded = await api.upload(file);
      const record = {
        name: uploaded?.originalName?.replace(/\.[^.]+$/, "") || file.name.replace(/\.[^.]+$/, ""),
        kind: uploaded?.asset?.kind || (file.type.startsWith("video") ? "Video" : file.type.startsWith("image") ? "Image" : "Document"),
        folder: "Brand",
        image: uploaded?.url || URL.createObjectURL(file),
        size: uploaded?.size || size,
        status: "Draft",
      };
      create(moduleKey, record);
      toast.success("Asset uploaded and saved", { description: `${record.name} · ${record.size}` });
    } catch (err) {
      console.warn("Backend upload failed, saving local preview:", err);
      const record = {
        name: file.name.replace(/\.[^.]+$/, ""),
        kind: file.type.startsWith("video") ? "Video" : file.type.startsWith("image") ? "Image" : "Document",
        folder: "Brand",
        image: URL.createObjectURL(file),
        size,
        status: "Draft",
      };
      create(moduleKey, record);
      toast.success("Asset added to the library (local)", { description: `${record.name} · ${size}` });
    }
  };

  const filters = useMemo(() => {
    const list = [];
    if (config.statusOptions?.length) {
      list.push({ key: "status", label: "Status", options: config.statusOptions });
    }
    (config.filters || []).forEach((key) => {
      const label = config.columns.find((column) => column.key === key)?.label || key;
      const options = Array.from(new Set(rows.map((row) => row[key]).filter(Boolean))).sort();
      list.push({ key, label, options, isColumn: true });
    });
    return list;
  }, [config, rows]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        !term ||
        config.fields.some((field) => String(row[field.name] ?? "").toLowerCase().includes(term)) ||
        recordTitle(moduleKey, row).toLowerCase().includes(term);
      const matchesFilters = Object.entries(filterValues).every(
        ([key, value]) => !value || String(row[key] ?? "") === value
      );
      return matchesQuery && matchesFilters;
    });
  }, [rows, query, filterValues, config, moduleKey]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    const { key, dir } = sort;
    list.sort((a, b) => {
      const left = a[key];
      const right = b[key];
      const leftNumber = Number(left);
      const rightNumber = Number(right);
      let result;
      if (left !== "" && right !== "" && Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
        result = leftNumber - rightNumber;
      } else {
        result = String(left ?? "").localeCompare(String(right ?? ""), "en", { sensitivity: "base" });
      }
      return dir === "asc" ? result : -result;
    });
    return list;
  }, [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const selected = rows.find((row) => row.id === selectedId) || null;

  const stats = useMemo(() => {
    const total = rows.length;
    const byStatus = {};
    rows.forEach((row) => {
      const value = row.status || "—";
      byStatus[value] = (byStatus[value] || 0) + 1;
    });
    return { total, byStatus, lastUpdated: rows[0]?.updated_date };
  }, [rows]);

  const sortOptions = [
    { value: "updated_date:desc", label: "Recently updated" },
    { value: "updated_date:asc", label: "Oldest updated" },
    ...config.columns
      .filter((column) => column.type !== "status")
      .flatMap((column) => [
        { value: `${column.key}:asc`, label: `${column.label} (A–Z)` },
        { value: `${column.key}:desc`, label: `${column.label} (Z–A)` },
      ]),
  ];

  const handleSortChange = (value) => {
    const [key, dir] = value.split(":");
    setSort({ key, dir });
    setPage(1);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    const values = {};
    config.fields.forEach((field) => {
      values[field.name] = row[field.name] === undefined || row[field.name] === null ? "" : String(row[field.name]);
    });
    setFormValues(values);
    setFormOpen(true);
  };

  const submitForm = async () => {
    const missing = config.fields.find(
      (field) => field.required && !String(formValues[field.name] ?? "").trim()
    );
    if (missing) {
      toast.error(`${missing.label} is required`);
      return;
    }
    try {
      if (editingId) {
        await update(moduleKey, editingId, formValues);
        toast.success(`${config.singular} updated`);
      } else {
        const title = recordTitle(moduleKey, formValues);
        await create(moduleKey, formValues);
        toast.success(`${config.singular} created`, { description: title });
      }
      setFormOpen(false);
      setEditingId(null);
    } catch (err) {
      toast.error(`Failed to ${editingId ? "update" : "create"} ${config.singular}`, {
        description: err.message || "Server error occurred",
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(moduleKey, deleteTarget.id);
      toast.success(`${config.singular} deleted`, { description: recordTitle(moduleKey, deleteTarget) });
      if (selectedId === deleteTarget.id) setSelectedId(null);
      setDeleteTarget(null);
    } catch (err) {
      toast.error(`Failed to delete ${config.singular}`, {
        description: err.message || "Server error occurred",
      });
    }
  };

  const statCards = [
    { label: "Total records", value: stats.total, hint: `across ${config.columns.length} fields tracked`, tone: "navy" },
    ...(config.statusOptions || []).slice(0, 3).map((option, index) => ({
      label: option,
      value: stats.byStatus[option] || 0,
      hint: option === config.statusOptions[0] ? "primary state" : undefined,
      tone: ["gold", "teal", "violet"][index] || "navy",
    })),
  ];

  const breadcrumb = [navItem?.section || "Console", config.short || config.title];

  if (isLoading && rows.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          eyebrow="Loading live records…"
          title={config.title}
          description={config.description}
          breadcrumb={breadcrumb}
        />
        <div className="surface rounded-xl p-16 text-center flex flex-col items-center justify-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          <span className="text-xs text-muted-foreground font-medium">Loading {config.short || config.title} from database…</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`${stats.total} ${stats.total === 1 ? "record" : "records"}`}
        title={config.title}
        description={config.description}
        breadcrumb={breadcrumb}
        actions={
          <>
            {config.upload && (
              <label className={`${btnSecondary} cursor-pointer`}>
                <Upload className="h-4 w-4" />
                Upload {config.singular.toLowerCase()}
                <input type="file" className="hidden" onChange={handleUpload} />
              </label>
            )}
            <button type="button" className={btnPrimary} onClick={openCreate}>
              <Plus className="h-4 w-4" />
              New {config.singular}
            </button>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <SectionCard
        flush
        title={`${config.short || config.title} library`}
        description="Search, filter and manage every record in this module."
      >
        <ListToolbar
          query={query}
          onQueryChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          placeholder={`Search ${config.short?.toLowerCase() || "records"}…`}
          filters={filters}
          values={filterValues}
          onFilterChange={(key, value) => {
            setFilterValues((prev) => ({ ...prev, [key]: value }));
            setPage(1);
          }}
          sortOptions={sortOptions}
          sortValue={`${sort.key}:${sort.dir}`}
          onSortChange={handleSortChange}
        />

        {config.view === "grid" ? (
          paged.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title={`No ${config.short?.toLowerCase() || "records"} found`}
                description="Adjust your search and filters, or upload the first item for this module."
              />
            </div>
          ) : (
            <div className="p-5">
              <CardGrid
                items={paged}
                columns={3}
              renderCard={(row) => {
                const ytId = extractYoutubeId(row.videoUrl || row.image);
                const isVideo = row.mediaType === "YouTube Video" || row.mediaType === "Direct Video" || Boolean(ytId || row.videoUrl);
                const displayImg = row[config.imageKey] || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "");

                return (
                  <button
                    type="button"
                    onClick={() => setSelectedId(row.id)}
                    className="surface surface-shadow group block w-full overflow-hidden rounded-xl text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      {displayImg ? (
                        <ContentImage
                          src={displayImg}
                          alt={recordTitle(moduleKey, row)}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                          {isVideo ? <Video className="h-10 w-10 opacity-40" /> : null}
                        </div>
                      )}

                      {isVideo && (
                        <div className="absolute inset-0 grid place-items-center bg-black/20 transition group-hover:bg-black/35">
                          <div className="grid h-11 w-11 place-items-center rounded-full bg-rose-600 text-white shadow-lg transition duration-300 group-hover:scale-110">
                            <Play className="h-5 w-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      <div className="absolute left-3 top-3 flex items-center gap-1.5">
                        {isVideo && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white backdrop-blur uppercase">
                            <Video className="h-3 w-3" /> Video
                          </span>
                        )}
                      </div>

                      <div className="absolute right-3 top-3">
                        <StatusBadge value={row.status} className="bg-card/90 backdrop-blur" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-foreground">
                        {recordTitle(moduleKey, row)}
                      </h3>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {row[config.cardMetaKey] || "—"} · {formatDate(row.date)}
                      </p>
                    </div>
                  </button>
                );
              }}
            />
          </div>
          )
        ) : (
          <DataTable
            columns={config.columns}
            rows={paged}
            sort={sort}
            onSort={(key) =>
              setSort((prev) => ({
                key,
                dir: prev.key === key && prev.dir === "desc" ? "asc" : "desc",
              }))
            }
            onRowClick={(row) => setSelectedId(row.id)}
            onEdit={openEdit}
            onDelete={(row) => setDeleteTarget(row)}
            emptyTitle={`No ${config.short?.toLowerCase() || "records"} found`}
            emptyDescription="Adjust your search and filters, or create the first record for this module."
          />
        )}

        <Pagination
          page={currentPage}
          pageCount={pageCount}
          total={sorted.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </SectionCard>

      <Drawer
        open={Boolean(selected)}
        onClose={() => setSelectedId(null)}
        title={selected ? recordTitle(moduleKey, selected) : ""}
        subtitle={selected ? `${config.title} · Updated ${formatDate(selected.updated_date)}` : ""}
        footer={
          selected && (
            <>
              <button
                type="button"
                className={cn(btnSecondary, "text-destructive hover:border-destructive/40")}
                onClick={() => setDeleteTarget(selected)}
              >
                Delete
              </button>
              <button type="button" className={btnPrimary} onClick={() => openEdit(selected)}>
                Edit record
              </button>
            </>
          )
        }
      >
        {selected && (() => {
          const ytId = extractYoutubeId(selected.videoUrl || selected.image);
          const isVideo = selected.mediaType === "YouTube Video" || selected.mediaType === "Direct Video" || Boolean(ytId || selected.videoUrl);
          const displayImg = selected[config.imageKey] || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "");

          return (
            <div className="space-y-6">
              {config.view === "grid" && (
                ytId ? (
                  <div className="aspect-video w-full overflow-hidden rounded-xl border border-border shadow-sm">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
                      title={recordTitle(moduleKey, selected)}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : displayImg ? (
                  <div className="overflow-hidden rounded-xl border border-border">
                    <ContentImage
                      src={displayImg}
                      alt={recordTitle(moduleKey, selected)}
                      className="h-56 w-full object-cover"
                    />
                  </div>
                ) : null
              )}

              <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="label-caps">Status</span>
                  {isVideo && (
                    <span className="inline-flex items-center gap-1 rounded bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-600">
                      <Video className="h-3 w-3" /> Video / YouTube
                    </span>
                  )}
                </div>
                <StatusBadge value={selected.status} />
              </div>

              {selected.videoUrl && (
                <div className="rounded-xl border border-border bg-muted/20 p-3">
                  <a
                    href={selected.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Watch video externally <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              <DetailList fields={config.fields} record={selected} />
            </div>
          );
        })()}
      </Drawer>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? `Edit ${config.singular}` : `New ${config.singular}`}
        description={
          editingId
            ? "Update the details below and save your changes."
            : `Add a new record to ${config.title}.`
        }
      >
        <RecordForm
          fields={config.fields}
          values={formValues}
          onChange={(name, value) => setFormValues((prev) => ({ ...prev, [name]: value }))}
          onSubmit={submitForm}
          onCancel={() => setFormOpen(false)}
          submitLabel={editingId ? "Save changes" : `Create ${config.singular}`}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title={`Delete this ${config.singular.toLowerCase()}?`}
        description={
          deleteTarget
            ? `“${recordTitle(moduleKey, deleteTarget)}” will be removed from ${config.title}. This action cannot be undone.`
            : ""
        }
      />
    </>
  );
}