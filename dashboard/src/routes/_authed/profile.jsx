import React, { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MapPin,
  Phone,
  Save,
  BadgeCheck,
  Plus,
  Trash2,
  Building2,
  FileText,
  Download,
  Users,
  GraduationCap,
  BookOpen,
  Lightbulb,
  Award,
  Globe,
  RotateCcw,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Check,
  Sparkles,
  Sliders,
  Compass,
  IndianRupee,
} from "lucide-react";
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
  { name: "email", label: "Official Email address", type: "text" },
  { name: "personalEmail", label: "Personal / Alternate Email", type: "text" },
  { name: "phone", label: "Office Telephone", type: "text" },
  { name: "directPhone", label: "Direct Contact / Mobile Numbers", type: "text", hint: "Comma-separated, e.g. +91 9872203898, +91 9478101102" },
  { name: "office", label: "Official University Office", type: "textarea", full: true },
  { name: "residenceAddress", label: "Permanent Residence", type: "textarea", full: true },
  { name: "city", label: "City / Campus", type: "text" },
  {
    name: "experienceYears",
    label: "Years of Academic Leadership",
    type: "number",
    hint: "Displayed as '35+ Years Leadership' on the website homepage banner",
  },
  {
    name: "publicationsCount",
    label: "Total Publications (SCI / Scopus / IEEE)",
    type: "number",
    hint: "Total publications count shown in website StatStrip and header",
  },
  {
    name: "phdSupervisedCount",
    label: "Ph.D. Scholars Guided",
    type: "number",
    hint: "Ph.D. scholars awarded and guided",
  },
  {
    name: "booksCount",
    label: "Books & Book Chapters Authored",
    type: "number",
    hint: "Total books, edited volumes and chapters",
  },
  {
    name: "patentsCount",
    label: "Patents to Credit",
    type: "number",
    hint: "Published and granted patents",
  },
  {
    name: "awardsCount",
    label: "National Awards & Honors",
    type: "number",
    hint: "National awards & global honors count",
  },
  {
    name: "mousCount",
    label: "MoUs & Strategic Alliances",
    type: "number",
    hint: "Industry and university MoUs count",
  },
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

  // Live database table counts fetched from backend
  const [dbCounts, setDbCounts] = useState({
    publicationsCount: 0,
    supervisionCount: 0,
    booksCount: 0,
    patentsCount: 0,
    awardsCount: 0,
    mousCount: 0,
    grantsCount: 0,
  });

  // Dedicated state for Key Metrics & Public Stats Management
  const [statsValues, setStatsValues] = useState({
    useManualStats: true,
    experienceYears: 35,
    experienceYearsSuffix: "+",
    publicationsCount: 151,
    publicationsSuffix: "+",
    supervisionCount: 9,
    supervisionSuffix: "",
    phdSupervisedCount: 9,
    mtechSupervisedCount: 19,
    booksCount: 18,
    booksSuffix: "",
    bookChaptersCount: 4,
    reviewedBooksCount: 5,
    patentsCount: 4,
    patentsSuffix: "",
    awardsCount: 26,
    awardsSuffix: "+",
    mousCount: 26,
    mousSuffix: "+",
    grantsAmountLakhs: 85,
    grantsCount: 10,
    countriesVisitedCount: 10,
    countriesVisitedSuffix: "+",
  });

  const [savingStats, setSavingStats] = useState(false);

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
          if (remote.dbCounts) {
            setDbCounts(remote.dbCounts);
          }

          const m = remote.metrics || {};
          const loadedStats = {
            useManualStats: m.useManualStats !== false,
            experienceYears: m.experienceYears ?? remote.experienceYears ?? 35,
            experienceYearsSuffix: m.experienceYearsSuffix ?? "+",
            publicationsCount: m.publicationsCount ?? remote.dbCounts?.publicationsCount ?? 151,
            publicationsSuffix: m.publicationsSuffix ?? "+",
            supervisionCount: m.supervisionCount ?? m.phdSupervisedCount ?? remote.dbCounts?.supervisionCount ?? 9,
            supervisionSuffix: m.supervisionSuffix ?? "",
            phdSupervisedCount: m.phdSupervisedCount ?? 9,
            mtechSupervisedCount: m.mtechSupervisedCount ?? 19,
            booksCount: m.booksCount ?? remote.dbCounts?.booksCount ?? 18,
            booksSuffix: m.booksSuffix ?? "",
            bookChaptersCount: m.bookChaptersCount ?? 4,
            reviewedBooksCount: m.reviewedBooksCount ?? 5,
            patentsCount: m.patentsCount ?? remote.dbCounts?.patentsCount ?? 4,
            patentsSuffix: m.patentsSuffix ?? "",
            awardsCount: m.awardsCount ?? remote.dbCounts?.awardsCount ?? 26,
            awardsSuffix: m.awardsSuffix ?? "+",
            mousCount: m.mousCount ?? remote.dbCounts?.mousCount ?? 26,
            mousSuffix: m.mousSuffix ?? "+",
            grantsAmountLakhs: m.grantsAmountLakhs ?? 85,
            grantsCount: m.grantsCount ?? remote.dbCounts?.grantsCount ?? 10,
            countriesVisitedCount: m.countriesVisitedCount ?? 10,
            countriesVisitedSuffix: m.countriesVisitedSuffix ?? "+",
          };

          setStatsValues(loadedStats);

          const expertiseArr = Array.isArray(remote.expertise)
            ? remote.expertise
            : (typeof remote.expertise === "string" ? remote.expertise.split(",").map(s => s.trim()).filter(Boolean) : (Array.isArray(PROFILE.expertise) ? PROFILE.expertise : []));

          const headerPositionsArr = Array.isArray(remote.headerPositions)
            ? remote.headerPositions
            : (typeof remote.headerPositions === "string" ? remote.headerPositions.split(",").map(s => s.trim()).filter(Boolean) : []);

          const directPhoneStr = Array.isArray(remote.mobilePhones)
            ? remote.mobilePhones.join(", ")
            : (typeof remote.mobilePhones === "string" ? remote.mobilePhones : (PROFILE.directPhone || ""));

          const synced = {
            ...PROFILE,
            ...remote,
            honorific: remote.designation || remote.salutation || PROFILE.honorific,
            bio: remote.bioSummary || PROFILE.bio,
            quote: remote.quote || PROFILE.quote || "",
            tagline: remote.tagline || PROFILE.tagline || "",
            office: remote.officeAddress || PROFILE.office,
            residenceAddress: remote.residenceAddress || PROFILE.residenceAddress,
            phone: remote.officePhone || PROFILE.phone,
            email: remote.officialEmail || PROFILE.email,
            personalEmail: remote.personalEmail || PROFILE.personalEmail,
            directPhone: directPhoneStr,
            fullBioList: Array.isArray(remote.fullBio) ? remote.fullBio : (PROFILE.fullBio || []),
            expertiseList: expertiseArr,
            headerPositionsList: headerPositionsArr,
            cvUrl: cvDoc?.fileUrl || "/documents/Prof_Manoj_Kumar_Curriculum_Vitae.pdf",
            briefProfileUrl: briefDoc?.fileUrl || "/documents/Prof_Manoj_Kumar_Brief_Profile.pdf",
            linkedin: remote.linkedIn || remote.linkedin || PROFILE.linkedin,
            twitter: remote.twitter || PROFILE.twitter,
            youtube: remote.youtube || PROFILE.youtube,
            metrics: loadedStats,
            experienceYears: loadedStats.experienceYears,
            publicationsCount: loadedStats.publicationsCount,
            phdSupervisedCount: loadedStats.phdSupervisedCount,
            booksCount: loadedStats.booksCount,
            patentsCount: loadedStats.patentsCount,
            awardsCount: loadedStats.awardsCount,
            mousCount: loadedStats.mousCount,
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

  const handleStatChange = (key, val) => {
    setStatsValues((prev) => {
      const next = { ...prev, [key]: val };
      return next;
    });
    setValues((prev) => ({
      ...prev,
      [key]: val,
      metrics: { ...(prev.metrics || {}), [key]: val },
    }));
    setDraft((prev) => ({
      ...prev,
      [key]: val,
      metrics: { ...(prev.metrics || {}), [key]: val },
    }));
  };

  // Sync inputs with exact live database counts
  const copyDatabaseCounts = () => {
    setStatsValues((prev) => ({
      ...prev,
      publicationsCount: dbCounts.publicationsCount || prev.publicationsCount,
      supervisionCount: dbCounts.supervisionCount || prev.supervisionCount,
      phdSupervisedCount: dbCounts.supervisionCount || prev.phdSupervisedCount,
      booksCount: dbCounts.booksCount || prev.booksCount,
      patentsCount: dbCounts.patentsCount || prev.patentsCount,
      awardsCount: dbCounts.awardsCount || prev.awardsCount,
      mousCount: dbCounts.mousCount || prev.mousCount,
      grantsCount: dbCounts.grantsCount || prev.grantsCount,
    }));
    toast.info("Copied database table counts to fields", {
      description: "Click 'Save Stats & Metrics' to persist these values.",
    });
  };

  // Reset to executive standard numbers
  const resetStandardStats = () => {
    setStatsValues((prev) => ({
      ...prev,
      useManualStats: true,
      experienceYears: 35,
      experienceYearsSuffix: "+",
      publicationsCount: 151,
      publicationsSuffix: "+",
      supervisionCount: 9,
      supervisionSuffix: "",
      phdSupervisedCount: 9,
      mtechSupervisedCount: 19,
      booksCount: 18,
      booksSuffix: "",
      patentsCount: 4,
      patentsSuffix: "",
      awardsCount: 26,
      awardsSuffix: "+",
      mousCount: 26,
      mousSuffix: "+",
      grantsAmountLakhs: 85,
      countriesVisitedCount: 10,
      countriesVisitedSuffix: "+",
    }));
    toast.info("Reset to executive standard values", {
      description: "Click 'Save Stats & Metrics' to persist these values.",
    });
  };

  // Save dedicated stats & metrics directly
  const saveStatsOnly = async () => {
    setSavingStats(true);
    toast.info("Saving platform statistics to database...");
    try {
      await api.profile.updateMetrics(statsValues);
      setValues((prev) => ({
        ...prev,
        metrics: { ...(prev.metrics || {}), ...statsValues },
        experienceYears: Number(statsValues.experienceYears) || 35,
        publicationsCount: Number(statsValues.publicationsCount) || 151,
        phdSupervisedCount: Number(statsValues.phdSupervisedCount) || 9,
        booksCount: Number(statsValues.booksCount) || 18,
        patentsCount: Number(statsValues.patentsCount) || 4,
        awardsCount: Number(statsValues.awardsCount) || 26,
        mousCount: Number(statsValues.mousCount) || 26,
      }));
      toast.success("Platform statistics updated!", {
        description: "Your stats are now live across your public website StatStrip, hero header, and navigation counters.",
      });
    } catch (err) {
      toast.error(err.message || "Failed to update statistics");
    } finally {
      setSavingStats(false);
    }
  };

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

      const mobilePhonesArr = source.directPhone
        ? (Array.isArray(source.directPhone)
            ? source.directPhone
            : String(source.directPhone).split(",").map((s) => s.trim()).filter(Boolean))
        : [];

      const mergedMetricsToSave = {
        ...(source.metrics || values.metrics || {}),
        ...statsValues,
        experienceYears: Number(source.experienceYears ?? statsValues.experienceYears) || 35,
        publicationsCount: Number(source.publicationsCount ?? statsValues.publicationsCount) || 151,
        phdSupervisedCount: Number(source.phdSupervisedCount ?? statsValues.phdSupervisedCount) || 9,
        booksCount: Number(source.booksCount ?? statsValues.booksCount) || 18,
        patentsCount: Number(source.patentsCount ?? statsValues.patentsCount) || 4,
        awardsCount: Number(source.awardsCount ?? statsValues.awardsCount) || 26,
        mousCount: Number(source.mousCount ?? statsValues.mousCount) || 26,
      };

      await api.profile.update({
        name: source.name,
        designation: source.honorific,
        institution: source.institution,
        officialEmail: source.email,
        personalEmail: source.personalEmail,
        officePhone: source.phone,
        officeAddress: source.office,
        residenceAddress: source.residenceAddress,
        mobilePhones: mobilePhonesArr,
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
        metrics: mergedMetricsToSave,
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
      toast.success("Profile saved to database", { description: "Your profile details, stats, and dossiers are now live." });
    } catch (err) {
      toast.error(err.message || "Failed to persist profile to server");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Public identity"
        title="Profile & Stats Management"
        description="The biography, contact details, research identity, and headline stats shown across your public portfolio."
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
              Edit full profile
            </button>
            <button type="button" className={btnPrimary} onClick={save}>
              <Save className="h-4 w-4" />
              Save all changes
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          
          {/* ========================================================================= */}
          {/* DEDICATED STATS MANAGEMENT SECTION                                        */}
          {/* ========================================================================= */}
          <SectionCard title="Biography & contact" description="Core details of your academic profile">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {[
                { label: "Full name", value: values.name },
                { label: "Designation", value: values.honorific },
                { label: "Institution", value: values.institution },
                { label: "Official Email", value: values.email },
                { label: "Personal Email", value: values.personalEmail },
                { label: "Office Telephone", value: values.phone },
                { label: "Direct Contact / Mobile", value: values.directPhone },
                { label: "Official Office Address", value: values.office },
                { label: "Permanent Residence", value: values.residenceAddress },
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

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
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
                    toast.info("Saving full biography to database...");
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

          <div id="stats-management-section">
            <SectionCard
            title="Platform Stats & Key Metrics Management"
            description="Manage and update the headline statistics displayed across your public website StatStrip, hero header, and navigation counters."
          >
            <div className="space-y-5">
              
              {/* Controls Bar: Source Mode Toggle & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 p-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Display Mode:
                  </span>
                  <div className="inline-flex rounded-lg border border-border bg-background p-0.5 shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleStatChange("useManualStats", true)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                        statsValues.useManualStats
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      Manual Custom Stats
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatChange("useManualStats", false)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                        !statsValues.useManualStats
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <RefreshCw className="h-3 w-3" />
                      Auto DB Sync
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyDatabaseCounts}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm hover:bg-muted transition"
                    title="Copy numbers directly from database tables"
                  >
                    <RefreshCw className="h-3 w-3 text-muted-foreground" />
                    Copy DB Counts
                  </button>
                  <button
                    type="button"
                    onClick={resetStandardStats}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm hover:bg-muted transition"
                    title="Reset to verified standard values"
                  >
                    <RotateCcw className="h-3 w-3 text-muted-foreground" />
                    Reset Standards
                  </button>
                  <button
                    type="button"
                    onClick={saveStatsOnly}
                    disabled={savingStats}
                    className={`${btnPrimary} text-xs py-1 px-3 shadow-sm`}
                  >
                    <Save className="h-3 w-3" />
                    {savingStats ? "Saving..." : "Save Stats"}
                  </button>
                </div>
              </div>

              {/* Real-time Website StatStrip Replica Preview */}
              <div className="rounded-xl border border-border bg-gradient-to-b from-card to-muted/20 p-4 shadow-sm">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    Live Website StatStrip Preview (Real-time)
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Updates instantly as you edit numbers below
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center divide-x divide-border/60 bg-background/80 rounded-lg p-2.5 border border-border">
                  <div className="p-1">
                    <div className="text-base font-bold text-[hsl(var(--crimson,#8b151a))]">
                      {statsValues.experienceYears}
                      <span className="text-xs">{statsValues.experienceYearsSuffix || "+"}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-foreground truncate">Years Leadership</div>
                    <div className="text-[9px] text-muted-foreground truncate">Higher Education</div>
                  </div>

                  <div className="p-1">
                    <div className="text-base font-bold text-[hsl(var(--crimson,#8b151a))]">
                      {statsValues.publicationsCount}
                      <span className="text-xs">{statsValues.publicationsSuffix || "+"}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-foreground truncate">Publications</div>
                    <div className="text-[9px] text-muted-foreground truncate">SCI / Scopus / IEEE</div>
                  </div>

                  <div className="p-1">
                    <div className="text-base font-bold text-[hsl(var(--crimson,#8b151a))]">
                      {statsValues.supervisionCount ?? statsValues.phdSupervisedCount}
                      <span className="text-xs">{statsValues.supervisionSuffix || ""}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-foreground truncate">Ph.D. Scholars</div>
                    <div className="text-[9px] text-muted-foreground truncate">Supervised & Guided</div>
                  </div>

                  <div className="p-1">
                    <div className="text-base font-bold text-[hsl(var(--gold,#b38e44))]">
                      {statsValues.booksCount}
                      <span className="text-xs">{statsValues.booksSuffix || ""}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-foreground truncate">Books & Chapters</div>
                    <div className="text-[9px] text-muted-foreground truncate">Authored & Edited</div>
                  </div>

                  <div className="p-1">
                    <div className="text-base font-bold text-[hsl(var(--gold,#b38e44))]">
                      {statsValues.patentsCount}
                      <span className="text-xs">{statsValues.patentsSuffix || ""}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-foreground truncate">Patents to Credit</div>
                    <div className="text-[9px] text-muted-foreground truncate">Published & Granted</div>
                  </div>

                  <div className="p-1">
                    <div className="text-base font-bold text-[hsl(var(--crimson,#8b151a))]">
                      {statsValues.awardsCount}
                      <span className="text-xs">{statsValues.awardsSuffix || "+"}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-foreground truncate">National Awards</div>
                    <div className="text-[9px] text-muted-foreground truncate">& Global Honors</div>
                  </div>

                  <div className="p-1">
                    <div className="text-base font-bold text-[#1e3a8a]">
                      {statsValues.mousCount}
                      <span className="text-xs">{statsValues.mousSuffix || "+"}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-foreground truncate">MoUs & Alliances</div>
                    <div className="text-[9px] text-muted-foreground truncate">Industry & Global</div>
                  </div>
                </div>
              </div>

              {/* 8 Detailed Metric Control Cards */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                
                {/* 1. Years Leadership */}
                <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-rose-500/10 text-rose-600">
                        <Users className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">Years Leadership</h4>
                        <p className="text-[10px] text-muted-foreground">Subtitle: Higher Education</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-medium text-muted-foreground">Display Number</label>
                      <input
                        type="number"
                        value={statsValues.experienceYears}
                        onChange={(e) => handleStatChange("experienceYears", Number(e.target.value))}
                        className={inputCls}
                        placeholder="35"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Suffix</label>
                      <input
                        type="text"
                        value={statsValues.experienceYearsSuffix}
                        onChange={(e) => handleStatChange("experienceYearsSuffix", e.target.value)}
                        className={inputCls}
                        placeholder="+"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Total Publications */}
                <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-blue-500/10 text-blue-600">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">Total Publications</h4>
                        <p className="text-[10px] text-muted-foreground">Subtitle: SCI / Scopus / IEEE</p>
                      </div>
                    </div>
                    {dbCounts.publicationsCount > 0 && (
                      <button
                        type="button"
                        onClick={() => handleStatChange("publicationsCount", dbCounts.publicationsCount)}
                        className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground hover:text-foreground"
                        title="Click to set to database count"
                      >
                        DB: {dbCounts.publicationsCount}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-medium text-muted-foreground">Display Number</label>
                      <input
                        type="number"
                        value={statsValues.publicationsCount}
                        onChange={(e) => handleStatChange("publicationsCount", Number(e.target.value))}
                        className={inputCls}
                        placeholder="151"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Suffix</label>
                      <input
                        type="text"
                        value={statsValues.publicationsSuffix}
                        onChange={(e) => handleStatChange("publicationsSuffix", e.target.value)}
                        className={inputCls}
                        placeholder="+"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Ph.D. Scholars */}
                <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-rose-500/10 text-rose-600">
                        <GraduationCap className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">Ph.D. Scholars Guided</h4>
                        <p className="text-[10px] text-muted-foreground">Subtitle: Supervised & Guided</p>
                      </div>
                    </div>
                    {dbCounts.supervisionCount > 0 && (
                      <button
                        type="button"
                        onClick={() => handleStatChange("supervisionCount", dbCounts.supervisionCount)}
                        className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground hover:text-foreground"
                        title="Click to set to database count"
                      >
                        DB: {dbCounts.supervisionCount}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-medium text-muted-foreground">Display Number</label>
                      <input
                        type="number"
                        value={statsValues.supervisionCount}
                        onChange={(e) => {
                          const num = Number(e.target.value);
                          handleStatChange("supervisionCount", num);
                          handleStatChange("phdSupervisedCount", num);
                        }}
                        className={inputCls}
                        placeholder="9"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Suffix</label>
                      <input
                        type="text"
                        value={statsValues.supervisionSuffix}
                        onChange={(e) => handleStatChange("supervisionSuffix", e.target.value)}
                        className={inputCls}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Books & Chapters */}
                <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                        <BookOpen className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">Books & Book Chapters</h4>
                        <p className="text-[10px] text-muted-foreground">Subtitle: Authored & Edited</p>
                      </div>
                    </div>
                    {dbCounts.booksCount > 0 && (
                      <button
                        type="button"
                        onClick={() => handleStatChange("booksCount", dbCounts.booksCount)}
                        className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground hover:text-foreground"
                        title="Click to set to database count"
                      >
                        DB: {dbCounts.booksCount}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-medium text-muted-foreground">Display Number</label>
                      <input
                        type="number"
                        value={statsValues.booksCount}
                        onChange={(e) => handleStatChange("booksCount", Number(e.target.value))}
                        className={inputCls}
                        placeholder="18"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Suffix</label>
                      <input
                        type="text"
                        value={statsValues.booksSuffix}
                        onChange={(e) => handleStatChange("booksSuffix", e.target.value)}
                        className={inputCls}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Patents to Credit */}
                <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                        <Lightbulb className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">Patents to Credit</h4>
                        <p className="text-[10px] text-muted-foreground">Subtitle: Published & Granted</p>
                      </div>
                    </div>
                    {dbCounts.patentsCount > 0 && (
                      <button
                        type="button"
                        onClick={() => handleStatChange("patentsCount", dbCounts.patentsCount)}
                        className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground hover:text-foreground"
                        title="Click to set to database count"
                      >
                        DB: {dbCounts.patentsCount}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-medium text-muted-foreground">Display Number</label>
                      <input
                        type="number"
                        value={statsValues.patentsCount}
                        onChange={(e) => handleStatChange("patentsCount", Number(e.target.value))}
                        className={inputCls}
                        placeholder="4"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Suffix</label>
                      <input
                        type="text"
                        value={statsValues.patentsSuffix}
                        onChange={(e) => handleStatChange("patentsSuffix", e.target.value)}
                        className={inputCls}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                {/* 6. National Awards */}
                <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-rose-500/10 text-rose-600">
                        <Award className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">National Awards</h4>
                        <p className="text-[10px] text-muted-foreground">Subtitle: & Global Honors</p>
                      </div>
                    </div>
                    {dbCounts.awardsCount > 0 && (
                      <button
                        type="button"
                        onClick={() => handleStatChange("awardsCount", dbCounts.awardsCount)}
                        className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground hover:text-foreground"
                        title="Click to set to database count"
                      >
                        DB: {dbCounts.awardsCount}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-medium text-muted-foreground">Display Number</label>
                      <input
                        type="number"
                        value={statsValues.awardsCount}
                        onChange={(e) => handleStatChange("awardsCount", Number(e.target.value))}
                        className={inputCls}
                        placeholder="26"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Suffix</label>
                      <input
                        type="text"
                        value={statsValues.awardsSuffix}
                        onChange={(e) => handleStatChange("awardsSuffix", e.target.value)}
                        className={inputCls}
                        placeholder="+"
                      />
                    </div>
                  </div>
                </div>

                {/* 7. MoUs & Alliances */}
                <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-blue-500/10 text-blue-600">
                        <Globe className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">MoUs & Strategic Alliances</h4>
                        <p className="text-[10px] text-muted-foreground">Subtitle: Industry & Global</p>
                      </div>
                    </div>
                    {dbCounts.mousCount > 0 && (
                      <button
                        type="button"
                        onClick={() => handleStatChange("mousCount", dbCounts.mousCount)}
                        className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground hover:text-foreground"
                        title="Click to set to database count"
                      >
                        DB: {dbCounts.mousCount}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[10px] font-medium text-muted-foreground">Display Number</label>
                      <input
                        type="number"
                        value={statsValues.mousCount}
                        onChange={(e) => handleStatChange("mousCount", Number(e.target.value))}
                        className={inputCls}
                        placeholder="26"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Suffix</label>
                      <input
                        type="text"
                        value={statsValues.mousSuffix}
                        onChange={(e) => handleStatChange("mousSuffix", e.target.value)}
                        className={inputCls}
                        placeholder="+"
                      />
                    </div>
                  </div>
                </div>

                {/* 8. Research Grants / Delegations */}
                <div className="rounded-xl border border-border bg-card p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
                        <IndianRupee className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">Research Grants & Funding</h4>
                        <p className="text-[10px] text-muted-foreground">Total Extramural Grants (in Lakhs)</p>
                      </div>
                    </div>
                    {dbCounts.grantsCount > 0 && (
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">
                        {dbCounts.grantsCount} Projects in DB
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Funding (₹ Lakhs)</label>
                      <input
                        type="number"
                        value={statsValues.grantsAmountLakhs}
                        onChange={(e) => handleStatChange("grantsAmountLakhs", Number(e.target.value))}
                        className={inputCls}
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">Countries Visited</label>
                      <input
                        type="number"
                        value={statsValues.countriesVisitedCount}
                        onChange={(e) => handleStatChange("countriesVisitedCount", Number(e.target.value))}
                        className={inputCls}
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <p className="text-[11px] text-muted-foreground">
                  Saved statistics immediately propagate to your website StatStrip banner, header chips, and sidebar navigation counters.
                </p>
                <button
                  type="button"
                  onClick={saveStatsOnly}
                  disabled={savingStats}
                  className={`${btnPrimary} shadow-sm`}
                >
                  <Save className="h-4 w-4" />
                  {savingStats ? "Saving..." : "Save Stats & Metrics"}
                </button>
              </div>
            </div>
          </SectionCard>

          {/* ========================================================================= */}
          {/* CORE BIOGRAPHY & CONTACT                                                  */}
          {/* ========================================================================= */}
          </div>

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

        {/* Right Column: Public Preview & Stats Summary */}
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

          {/* Key Metrics Quick Summary Box */}
          <SectionCard title="Current Public Metrics" description="Headline numbers shown to visitors">
            <div className="space-y-2.5">
              {[
                { label: "Leadership", val: `${statsValues.experienceYears}${statsValues.experienceYearsSuffix || "+"}`, desc: "Years Leadership" },
                { label: "Publications", val: `${statsValues.publicationsCount}${statsValues.publicationsSuffix || "+"}`, desc: "SCI / Scopus / IEEE" },
                { label: "Ph.D. Scholars", val: `${statsValues.supervisionCount ?? statsValues.phdSupervisedCount}${statsValues.supervisionSuffix || ""}`, desc: "Supervised & Guided" },
                { label: "Books & Chapters", val: `${statsValues.booksCount}${statsValues.booksSuffix || ""}`, desc: "Authored & Edited" },
                { label: "Patents", val: `${statsValues.patentsCount}${statsValues.patentsSuffix || ""}`, desc: "Published & Granted" },
                { label: "Awards", val: `${statsValues.awardsCount}${statsValues.awardsSuffix || "+"}`, desc: "National & Global" },
                { label: "MoUs", val: `${statsValues.mousCount}${statsValues.mousSuffix || "+"}`, desc: "Industry & Alliances" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border/50 pb-2 text-xs">
                  <div>
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="ml-1.5 text-[10px] text-muted-foreground hidden sm:inline">({item.desc})</span>
                  </div>
                  <span className="font-bold text-primary font-mono">{item.val}</span>
                </div>
              ))}

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("stats-management-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Manage these numbers above ↑
                </button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit profile & stats"
        description="Update the biography, contact details, photos, and header positions."
        size="xl"
      >
        <div className="space-y-6">
          <RecordForm
            fields={FIELDS}
            values={draft}
            onChange={(name, value) => {
              setDraft((prev) => ({ ...prev, [name]: value }));
              if (
                name === "experienceYears" ||
                name === "publicationsCount" ||
                name === "phdSupervisedCount" ||
                name === "booksCount" ||
                name === "patentsCount" ||
                name === "awardsCount" ||
                name === "mousCount"
              ) {
                setStatsValues((prev) => ({ ...prev, [name]: Number(value) }));
              }
            }}
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
