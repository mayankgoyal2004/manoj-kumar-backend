import React, { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Save, BadgeCheck, Plus, Trash2, Building2, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import Modal from "@/components/kit/Modal";
import PageHeader from "@/components/kit/PageHeader";
import RecordForm from "@/components/kit/RecordForm";
import SectionCard from "@/components/kit/SectionCard";
import Toggle from "@/components/kit/Toggle";
import { btnPrimary, btnSecondary, chipCls, inputCls } from "@/components/kit/styles";
import { Image } from "@/components/ui/image";
import { PROFILE } from "@/lib/DataStore";
import api from "@/api/backendClient";
import { useAuth } from "@/lib/AuthContext";

const FIELDS = [
  { name: "name", label: "Full name", type: "text" },
  { name: "honorific", label: "Designation", type: "text" },
  { name: "institution", label: "Institution", type: "text" },
  { name: "email", label: "Email address", type: "text" },
  { name: "phone", label: "Telephone", type: "text" },
  { name: "office", label: "Office", type: "text" },
  { name: "city", label: "City / Campus", type: "text" },
  {
    name: "headerPhoto",
    label: "Top Header Portrait",
    type: "image",
    full: true,
    hint: "Displayed in the top hero header frame next to your designation",
  },
  {
    name: "sidebarPhoto",
    label: "Sidebar Navigation Photo",
    type: "image",
    full: true,
    hint: "Displayed in the left navigation sidebar profile card",
  },
  {
    name: "bioPhoto",
    label: "Executive Biosketch Card Portrait",
    type: "image",
    full: true,
    hint: "Displayed in the About Biosketch overview section next to your quote",
  },
  {
    name: "tagline",
    label: "Executive Tagline",
    type: "text",
    full: true,
    hint: "Displayed under your title in leadership sections",
  },
  {
    name: "quote",
    label: "Leadership Quote",
    type: "text",
    full: true,
    hint: "Displayed in the academic quote card next to your Executive Biosketch portrait",
  },
  { name: "bio", label: "Executive Lead Summary", type: "textarea", full: true, hint: "Highlighted lead paragraph at the beginning of the Executive Biosketch" },
  { name: "orcid", label: "ORCID", type: "text" },
  { name: "scopus", label: "Scopus author ID", type: "text" },
  { name: "scholar", label: "Google Scholar", type: "text" },
  { name: "linkedin", label: "LinkedIn URL", type: "text" },
  { name: "twitter", label: "X (Twitter) URL", type: "text" },
  { name: "youtube", label: "YouTube Channel URL", type: "text" },
  { name: "website", label: "Website", type: "url" },
  {
    name: "cvUrl",
    label: "Official Curriculum Vitae (PDF)",
    type: "file",
    full: true,
    hint: "Upload latest Curriculum Vitae PDF document for public download across website dossiers and sidebar.",
  },
  {
    name: "briefProfileUrl",
    label: "Official Brief Profile / Executive Dossier (PDF)",
    type: "file",
    full: true,
    hint: "Upload latest Executive Brief Profile PDF document for official downloads.",
  },
];

export const Route = createFileRoute("/_authed/profile")({
  head: () => ({ meta: [{ title: "Profile Management · Portfolio Console" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { updateUser } = useAuth();
  const [values, setValues] = useState(() => ({ ...PROFILE }));
  const [draft, setDraft] = useState(() => ({ ...PROFILE }));
  const [editing, setEditing] = useState(false);
  const [docRecords, setDocRecords] = useState({ cvDoc: null, briefDoc: null });
  const [visibility, setVisibility] = useState({
    metrics: true,
    contact: true,
    enquiries: false,
    citations: true,
  });

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      try {
        const [remote, docsData] = await Promise.all([
          api.profile.get().catch(() => null),
          api.modules.getAll("documents").catch(() => null),
        ]);

        let cvDoc = null;
        let briefDoc = null;

        if (docsData) {
          const docsList = Array.isArray(docsData) ? docsData : docsData.items || [];
          cvDoc = docsList.find(
            (d) =>
              d.category === "Curriculum Vitae" ||
              (d.name && d.name.toLowerCase().includes("curriculum vitae")) ||
              (d.name && d.name.toLowerCase().includes("cv"))
          );
          briefDoc = docsList.find(
            (d) =>
              d.category === "Brief Profile" ||
              d.category === "Policy" ||
              (d.name && d.name.toLowerCase().includes("brief profile"))
          );
          if (active) {
            setDocRecords({ cvDoc, briefDoc });
          }
        }

        if (active && remote) {
          const expertiseArr = Array.isArray(remote.expertise)
            ? remote.expertise
            : (typeof remote.expertise === "string" ? remote.expertise.split(",").map(s => s.trim()).filter(Boolean) : (Array.isArray(PROFILE.expertise) ? PROFILE.expertise : []));

          const headerPositionsArr = Array.isArray(remote.headerPositions)
            ? remote.headerPositions
            : (typeof remote.headerPositions === "string" ? remote.headerPositions.split(",").map(s => s.trim()).filter(Boolean) : []);

          const synced = {
            ...PROFILE,
            ...remote,
            honorific: remote.designation || remote.salutation || PROFILE.honorific,
            bio: remote.bioSummary || PROFILE.bio,
            quote: remote.quote || PROFILE.quote || "",
            tagline: remote.tagline || PROFILE.tagline || "",
            fullBioList: Array.isArray(remote.fullBio) ? remote.fullBio : (PROFILE.fullBio || []),
            expertiseList: expertiseArr,
            headerPositionsList: headerPositionsArr,
            cvUrl: cvDoc?.fileUrl || "/documents/Prof_Manoj_Kumar_Curriculum_Vitae.pdf",
            briefProfileUrl: briefDoc?.fileUrl || "/documents/Prof_Manoj_Kumar_Brief_Profile.pdf",
            linkedin: remote.linkedIn || remote.linkedin || PROFILE.linkedin,
            twitter: remote.twitter || PROFILE.twitter,
            youtube: remote.youtube || PROFILE.youtube,
          };
          setValues(synced);
          setDraft(synced);
        }
      } catch (err) {
        console.warn("Could not load remote profile:", err);
      }
    }
    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  const completeness = useMemo(() => {
    const filled = FIELDS.filter((field) => String(values[field.name] ?? "").trim()).length;
    return Math.round((filled / FIELDS.length) * 100);
  }, [values]);

  const save = async () => {
    const source = editing ? draft : values;
    setValues({ ...source });
    setEditing(false);
    toast.success("Profile updated locally", { description: "Persisting changes to database..." });
    try {
      const expertiseArr = Array.isArray(source.expertiseList)
        ? source.expertiseList.map((s) => String(s).trim()).filter(Boolean)
        : (Array.isArray(values.expertiseList) ? values.expertiseList.map((s) => String(s).trim()).filter(Boolean) : []);

      const headerPositionsArr = Array.isArray(source.headerPositionsList)
        ? source.headerPositionsList.map((s) => String(s).trim()).filter(Boolean)
        : (Array.isArray(values.headerPositionsList) ? values.headerPositionsList.map((s) => String(s).trim()).filter(Boolean) : []);

      await api.profile.update({
        name: source.name,
        designation: source.honorific,
        institution: source.institution,
        officialEmail: source.email,
        officePhone: source.phone,
        officeAddress: source.office,
        location: source.city,
        photo: source.photo || source.headerPhoto,
        headerPhoto: source.headerPhoto,
        sidebarPhoto: source.sidebarPhoto,
        bioPhoto: source.bioPhoto,
        bioSummary: source.bio,
        quote: source.quote,
        tagline: source.tagline,
        fullBio: Array.isArray(source.fullBioList)
          ? source.fullBioList.map((s) => String(s).trim()).filter(Boolean)
          : (Array.isArray(values.fullBioList) ? values.fullBioList.map((s) => String(s).trim()).filter(Boolean) : []),
        expertise: expertiseArr,
        headerPositions: headerPositionsArr,
        orcid: source.orcid,
        scopus: source.scopus,
        scholar: source.scholar,
        linkedIn: source.linkedin,
        twitter: source.twitter,
        youtube: source.youtube,
        website: source.website,
      });

      // Synchronize CV Document in database
      if (source.cvUrl) {
        if (docRecords.cvDoc?.id) {
          await api.modules.update("documents", docRecords.cvDoc.id, {
            fileUrl: source.cvUrl,
            status: "Published",
            visibility: "Public",
          }).catch(console.warn);
        } else {
          const created = await api.modules.create("documents", {
            name: `${source.name || "Executive"} — Curriculum Vitae (PDF)`,
            category: "Curriculum Vitae",
            fileType: "PDF",
            fileUrl: source.cvUrl,
            visibility: "Public",
            status: "Published",
            orderIndex: 1,
          }).catch(console.warn);
          if (created) setDocRecords(prev => ({ ...prev, cvDoc: created }));
        }
      }

      // Synchronize Brief Profile Document in database
      if (source.briefProfileUrl) {
        if (docRecords.briefDoc?.id) {
          await api.modules.update("documents", docRecords.briefDoc.id, {
            fileUrl: source.briefProfileUrl,
            status: "Published",
            visibility: "Public",
          }).catch(console.warn);
        } else {
          const created = await api.modules.create("documents", {
            name: `${source.name || "Executive"} — Brief Profile (PDF)`,
            category: "Brief Profile",
            fileType: "PDF",
            fileUrl: source.briefProfileUrl,
            visibility: "Public",
            status: "Published",
            orderIndex: 2,
          }).catch(console.warn);
          if (created) setDocRecords(prev => ({ ...prev, briefDoc: created }));
        }
      }

      updateUser({
        full_name: source.name,
        avatar: source.sidebarPhoto || source.headerPhoto || source.photo,
      });
      toast.success("Profile saved to database", { description: "Your profile details and uploaded dossier documents are now live." });
    } catch (err) {
      toast.error(err.message || "Failed to persist profile to server");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Public identity"
        title="Profile Management"
        description="The biography, contact details and research identity shown across your public portfolio."
        breadcrumb={["Console", "Overview", "Profile Management"]}
        actions={
          <>
            <button
              type="button"
              className={btnSecondary}
              onClick={() => {
                setDraft({ ...values });
                setEditing(true);
              }}
            >
              Edit profile
            </button>
            <button type="button" className={btnPrimary} onClick={save}>
              <Save className="h-4 w-4" />
              Save changes
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <SectionCard title="Biography & contact" description="Core details of your academic profile">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {[
                { label: "Full name", value: values.name },
                { label: "Designation", value: values.honorific },
                { label: "Institution", value: values.institution },
                { label: "Email", value: values.email },
                { label: "Telephone", value: values.phone },
                { label: "Office", value: values.office },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="label-caps">{row.label}</dt>
                  <dd className="mt-1.5 text-sm text-foreground">{row.value || "—"}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="label-caps">Lead Biography</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-foreground">{values.bio || "—"}</dd>
              </div>
              {values.tagline && (
                <div className="sm:col-span-2">
                  <dt className="label-caps">Executive Tagline</dt>
                  <dd className="mt-1.5 text-sm italic text-foreground">{values.tagline}</dd>
                </div>
              )}
              {values.quote && (
                <div className="sm:col-span-2">
                  <dt className="label-caps">Leadership Quote</dt>
                  <dd className="mt-1.5 text-sm italic text-foreground">&quot;{values.quote}&quot;</dd>
                </div>
              )}
              <div className="sm:col-span-2">
                <dt className="label-caps">Areas of expertise</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {(values.expertiseList || []).map((item) => (
                    <span key={item} className={chipCls}>
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </SectionCard>

          {/* Dedicated Executive Biosketch Paragraphs Card */}
          <SectionCard
            title="Executive Biosketch Full Paragraphs (About Section)"
            description="Manage each paragraph of your detailed About Biosketch biography individually. Add, edit, reorder or remove paragraphs."
          >
            <div className="space-y-4">
              {(values.fullBioList || []).length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  No full biography paragraphs added yet. Click &quot;Add Bio Paragraph&quot; below.
                </div>
              ) : (
                <div className="space-y-3">
                  {(values.fullBioList || []).map((para, idx) => (
                    <div key={idx} className="rounded-xl border border-border bg-card p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">Paragraph {idx + 1}</span>
                        <button
                          type="button"
                          title="Remove paragraph"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition"
                          onClick={() => {
                            const updated = (values.fullBioList || []).filter((_, i) => i !== idx);
                            setValues((prev) => ({ ...prev, fullBioList: updated }));
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        value={para}
                        placeholder="Write paragraph narrative..."
                        className={inputCls}
                        onChange={(e) => {
                          const updated = [...(values.fullBioList || [])];
                          updated[idx] = e.target.value;
                          setValues((prev) => ({ ...prev, fullBioList: updated }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  className={btnSecondary}
                  onClick={() => {
                    const current = values.fullBioList || [];
                    setValues((prev) => ({
                      ...prev,
                      fullBioList: [...current, ""],
                    }));
                  }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Bio Paragraph
                </button>

                <button
                  type="button"
                  className={btnPrimary}
                  onClick={async () => {
                    const cleanList = (values.fullBioList || [])
                      .map((s) => s.trim())
                      .filter(Boolean);
                    toast.info("Saving full biography paragraphs to database...");
                    try {
                      await api.profile.update({
                        fullBio: cleanList,
                      });
                      setValues((prev) => ({ ...prev, fullBioList: cleanList }));
                      toast.success("Biography paragraphs saved!", {
                        description: `${cleanList.length} paragraph(s) are now live on your Executive Biosketch.`,
                      });
                    } catch (err) {
                      toast.error(err.message || "Failed to update full biography");
                    }
                  }}
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Bio Paragraphs
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Dedicated Areas of Expertise Columns Card */}
          <SectionCard
            title="Areas of Expertise Columns"
            description="Manage each area of expertise individually in separate columns without commas. Add, edit, or remove items easily."
          >
            <div className="space-y-3">
              {(values.expertiseList || []).length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  No expertise areas added yet. Click &quot;Add Expertise Column&quot; below.
                </div>
              ) : (
                <div className="space-y-2">
                  {(values.expertiseList || []).map((exp, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-semibold text-muted-foreground">
                        {idx + 1}
                      </div>
                      <input
                        type="text"
                        value={exp}
                        placeholder="e.g. Optical & Wireless Communication Systems"
                        className={inputCls}
                        onChange={(e) => {
                          const updated = [...(values.expertiseList || [])];
                          updated[idx] = e.target.value;
                          setValues((prev) => ({ ...prev, expertiseList: updated }));
                        }}
                      />
                      <button
                        type="button"
                        title="Remove expertise"
                        className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => {
                          const updated = (values.expertiseList || []).filter((_, i) => i !== idx);
                          setValues((prev) => ({ ...prev, expertiseList: updated }));
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  className={btnSecondary}
                  onClick={() => {
                    const current = values.expertiseList || [];
                    setValues((prev) => ({
                      ...prev,
                      expertiseList: [...current, ""],
                    }));
                  }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Expertise Column
                </button>

                <button
                  type="button"
                  className={btnPrimary}
                  onClick={async () => {
                    const cleanList = (values.expertiseList || [])
                      .map((s) => s.trim())
                      .filter(Boolean);
                    toast.info("Saving areas of expertise to database...");
                    try {
                      await api.profile.update({
                        expertise: cleanList,
                      });
                      setValues((prev) => ({ ...prev, expertiseList: cleanList }));
                      toast.success("Areas of expertise saved!", {
                        description: `${cleanList.length} expertise area(s) are now live across your profile and hero header.`,
                      });
                    } catch (err) {
                      toast.error(err.message || "Failed to update areas of expertise");
                    }
                  }}
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Areas of Expertise
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Dedicated Header Bar Positions & Affiliations Card */}
          <SectionCard
            title="Header Bar Positions & Affiliations"
            description="Manage each institution/position displayed at the top header bar individually. Add, edit, or remove items without comma formatting."
          >
            <div className="space-y-3">
              {(values.headerPositionsList || []).length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  No custom header positions added yet. The header will default to your primary institution: <strong className="text-foreground">{values.institution}</strong>.
                </div>
              ) : (
                <div className="space-y-2">
                  {(values.headerPositionsList || []).map((pos, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-semibold text-muted-foreground">
                        {idx + 1}
                      </div>
                      <input
                        type="text"
                        value={pos}
                        placeholder="e.g. University of Memphis (USA)"
                        className={inputCls}
                        onChange={(e) => {
                          const updated = [...(values.headerPositionsList || [])];
                          updated[idx] = e.target.value;
                          setValues((prev) => ({ ...prev, headerPositionsList: updated }));
                        }}
                      />
                      <button
                        type="button"
                        title="Remove position"
                        className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => {
                          const updated = (values.headerPositionsList || []).filter((_, i) => i !== idx);
                          setValues((prev) => ({ ...prev, headerPositionsList: updated }));
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  className={btnSecondary}
                  onClick={() => {
                    const current = values.headerPositionsList || [];
                    setValues((prev) => ({
                      ...prev,
                      headerPositionsList: [...current, ""],
                    }));
                  }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Position Column
                </button>

                <button
                  type="button"
                  className={btnPrimary}
                  onClick={async () => {
                    const cleanList = (values.headerPositionsList || [])
                      .map((s) => s.trim())
                      .filter(Boolean);
                    toast.info("Saving header positions to database...");
                    try {
                      await api.profile.update({
                        headerPositions: cleanList,
                      });
                      setValues((prev) => ({ ...prev, headerPositionsList: cleanList }));
                      toast.success("Header positions saved!", {
                        description: `${cleanList.length} position(s) are now live at the top of your website.`,
                      });
                    } catch (err) {
                      toast.error(err.message || "Failed to update header positions");
                    }
                  }}
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Header Positions
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Official Dossiers & Documents Card */}
          <SectionCard
            title="Official Documents & Dossiers (CV & Brief Profile)"
            description="Manage the official PDF dossiers available for download across your website secretariat and navigation."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">Curriculum Vitae</h4>
                      <p className="text-[11px] text-muted-foreground">Category: Curriculum Vitae</p>
                    </div>
                  </div>
                  {values.cvUrl && (
                    <a
                      href={values.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted"
                      title="Download or preview CV"
                    >
                      <Download className="h-3 w-3" />
                      View
                    </a>
                  )}
                </div>
                <div className="pt-1">
                  <p className="truncate text-xs font-mono text-muted-foreground bg-muted/40 px-2 py-1.5 rounded-md border border-border/60">
                    {values.cvUrl || "No file uploaded yet"}
                  </p>
                </div>
                <button
                  type="button"
                  className={`w-full ${btnSecondary} text-xs`}
                  onClick={() => {
                    setDraft({ ...values });
                    setEditing(true);
                  }}
                >
                  Replace CV Document
                </button>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">Brief Profile / Dossier</h4>
                      <p className="text-[11px] text-muted-foreground">Category: Brief Profile</p>
                    </div>
                  </div>
                  {values.briefProfileUrl && (
                    <a
                      href={values.briefProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted"
                      title="Download or preview Brief Profile"
                    >
                      <Download className="h-3 w-3" />
                      View
                    </a>
                  )}
                </div>
                <div className="pt-1">
                  <p className="truncate text-xs font-mono text-muted-foreground bg-muted/40 px-2 py-1.5 rounded-md border border-border/60">
                    {values.briefProfileUrl || "No file uploaded yet"}
                  </p>
                </div>
                <button
                  type="button"
                  className={`w-full ${btnSecondary} text-xs`}
                  onClick={() => {
                    setDraft({ ...values });
                    setEditing(true);
                  }}
                >
                  Replace Brief Profile Document
                </button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Research identifiers & Social profiles" description="Linked scholarly & digital profiles">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "ORCID", value: values.orcid },
                { label: "Scopus author ID", value: values.scopus },
                { label: "Google Scholar", value: values.scholar },
                { label: "LinkedIn", value: values.linkedin },
                { label: "X (Twitter)", value: values.twitter },
                { label: "YouTube Channel", value: values.youtube },
                { label: "Website", value: values.website },
              ].map((row) => (
                <div key={row.label} className="rounded-xl border border-border bg-muted/40 px-4 py-3">
                  <p className="label-caps">{row.label}</p>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">{row.value || "—"}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Public preview" description="How visitors see your profile card">
            <div className="overflow-hidden rounded-xl border border-border">
              <Image
                src={values.photo}
                alt={values.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <p className="font-heading text-base font-semibold leading-tight text-foreground">
                  {values.name}
                </p>
                <p className="mt-1 text-xs font-medium text-[hsl(var(--gold))]">{values.honorific}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{values.institution}</p>

                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" /> {values.email}
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" /> {values.phone}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" /> {values.city}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-medium text-foreground">Profile completeness</span>
                <span className="font-semibold text-primary">{completeness}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${completeness}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                Complete records improve discoverability on the public portfolio and in search
                results.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Visibility" description="Control what the public portfolio reveals">
            <div className="divide-y divide-border">
              <Toggle
                id="vis-metrics"
                label="Show research metrics"
                description="Publication counts and citations on your profile card."
                checked={visibility.metrics}
                onChange={(next) => setVisibility((prev) => ({ ...prev, metrics: next }))}
              />
              <Toggle
                id="vis-contact"
                label="Show contact details"
                description="Office address, telephone and email in the public footer."
                checked={visibility.contact}
                onChange={(next) => setVisibility((prev) => ({ ...prev, contact: next }))}
              />
              <Toggle
                id="vis-enquiries"
                label="Accept media enquiries"
                description="Displays a press enquiry form to visiting journalists."
                checked={visibility.enquiries}
                onChange={(next) => setVisibility((prev) => ({ ...prev, enquiries: next }))}
              />
              <Toggle
                id="vis-citations"
                label="Link citation profiles"
                description="Deep links to Scopus and Google Scholar records."
                checked={visibility.citations}
                onChange={(next) => setVisibility((prev) => ({ ...prev, citations: next }))}
              />
            </div>
            <p className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-[11px] text-muted-foreground">
              <BadgeCheck className="h-3.5 w-3.5 text-[hsl(var(--gold))]" />
              Verified institutional profile · {values.institution || "Executive Leadership"}
            </p>
          </SectionCard>
        </div>
      </div>

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit profile"
        description="Update the biography, contact details, photos, and header positions."
        size="xl"
      >
        <div className="space-y-6">
          <RecordForm
            fields={FIELDS}
            values={draft}
            onChange={(name, value) => setDraft((prev) => ({ ...prev, [name]: value }))}
            onSubmit={save}
            onCancel={() => setEditing(false)}
            submitLabel="Save profile"
          />

          {/* Executive Biosketch Full Paragraphs in Edit Modal */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Executive Biosketch Full Paragraphs (About Section)
              </h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Add each narrative paragraph of your About Biosketch individually. They appear sequentially under your lead summary.
              </p>
            </div>

            <div className="space-y-3">
              {(draft.fullBioList || []).map((para, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-muted/20 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">Paragraph {idx + 1}</span>
                    <button
                      type="button"
                      title="Remove paragraph"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition"
                      onClick={() => {
                        const updated = (draft.fullBioList || []).filter((_, i) => i !== idx);
                        setDraft((prev) => ({ ...prev, fullBioList: updated }));
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={para}
                    placeholder="Write paragraph narrative..."
                    className={inputCls}
                    onChange={(e) => {
                      const updated = [...(draft.fullBioList || [])];
                      updated[idx] = e.target.value;
                      setDraft((prev) => ({ ...prev, fullBioList: updated }));
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`mt-3 ${btnSecondary}`}
              onClick={() => {
                const current = draft.fullBioList || [];
                setDraft((prev) => ({
                  ...prev,
                  fullBioList: [...current, ""],
                }));
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Bio Paragraph
            </button>
          </div>

          {/* Areas of Expertise Columns in Edit Modal */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Areas of Expertise Columns
              </h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Add each area of expertise column individually without commas. They are displayed across your profile badges and top hero banner.
              </p>
            </div>

            <div className="space-y-2">
              {(draft.expertiseList || []).map((exp, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-semibold text-muted-foreground">
                    {idx + 1}
                  </div>
                  <input
                    type="text"
                    value={exp}
                    placeholder="e.g. Optical & Wireless Communication Systems"
                    className={inputCls}
                    onChange={(e) => {
                      const updated = [...(draft.expertiseList || [])];
                      updated[idx] = e.target.value;
                      setDraft((prev) => ({ ...prev, expertiseList: updated }));
                    }}
                  />
                  <button
                    type="button"
                    title="Remove expertise"
                    className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      const updated = (draft.expertiseList || []).filter((_, i) => i !== idx);
                      setDraft((prev) => ({ ...prev, expertiseList: updated }));
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`mt-3 ${btnSecondary}`}
              onClick={() => {
                const current = draft.expertiseList || [];
                setDraft((prev) => ({
                  ...prev,
                  expertiseList: [...current, ""],
                }));
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Expertise Column
            </button>
          </div>

          {/* Header Bar Positions Columns in Edit Modal */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Header Bar Positions / Affiliations Columns
              </h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Add each position/affiliation column individually. They appear separated by bullets at the top header bar of the website.
              </p>
            </div>

            <div className="space-y-2">
              {(draft.headerPositionsList || []).map((pos, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-semibold text-muted-foreground">
                    {idx + 1}
                  </div>
                  <input
                    type="text"
                    value={pos}
                    placeholder="e.g. University of Memphis (USA)"
                    className={inputCls}
                    onChange={(e) => {
                      const updated = [...(draft.headerPositionsList || [])];
                      updated[idx] = e.target.value;
                      setDraft((prev) => ({ ...prev, headerPositionsList: updated }));
                    }}
                  />
                  <button
                    type="button"
                    title="Remove position"
                    className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      const updated = (draft.headerPositionsList || []).filter((_, i) => i !== idx);
                      setDraft((prev) => ({ ...prev, headerPositionsList: updated }));
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`mt-3 ${btnSecondary}`}
              onClick={() => {
                const current = draft.headerPositionsList || [];
                setDraft((prev) => ({
                  ...prev,
                  headerPositionsList: [...current, ""],
                }));
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Position Column
            </button>
          </div>
        </div>
      </Modal>

    </>
  );
}