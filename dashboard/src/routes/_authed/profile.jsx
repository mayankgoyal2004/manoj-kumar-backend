import React, { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Save, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import Modal from "@/components/kit/Modal";
import PageHeader from "@/components/kit/PageHeader";
import RecordForm from "@/components/kit/RecordForm";
import SectionCard from "@/components/kit/SectionCard";
import Toggle from "@/components/kit/Toggle";
import { btnPrimary, btnSecondary, chipCls } from "@/components/kit/styles";
import { Image } from "@/components/ui/image";
import { PROFILE } from "@/lib/DataStore";

const FIELDS = [
  { name: "name", label: "Full name", type: "text" },
  { name: "honorific", label: "Designation", type: "text" },
  { name: "institution", label: "Institution", type: "text" },
  { name: "email", label: "Email address", type: "text" },
  { name: "phone", label: "Telephone", type: "text" },
  { name: "office", label: "Office", type: "text" },
  { name: "city", label: "City / Campus", type: "text" },
  { name: "photo", label: "Photograph URL", type: "image", full: true },
  { name: "bio", label: "Biography", type: "textarea", full: true },
  { name: "expertise", label: "Areas of expertise", type: "text", hint: "Separate with commas" },
  { name: "orcid", label: "ORCID", type: "text" },
  { name: "scopus", label: "Scopus author ID", type: "text" },
  { name: "scholar", label: "Google Scholar", type: "text" },
  { name: "linkedin", label: "LinkedIn", type: "text" },
  { name: "website", label: "Website", type: "url" },
];

export const Route = createFileRoute("/_authed/profile")({
  head: () => ({ meta: [{ title: "Profile Management · Portfolio Console" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [values, setValues] = useState(() => ({ ...PROFILE }));
  const [draft, setDraft] = useState(() => ({ ...PROFILE }));
  const [editing, setEditing] = useState(false);
  const [visibility, setVisibility] = useState({
    metrics: true,
    contact: true,
    enquiries: false,
    citations: true,
  });

  const completeness = useMemo(() => {
    const filled = FIELDS.filter((field) => String(values[field.name] ?? "").trim()).length;
    return Math.round((filled / FIELDS.length) * 100);
  }, [values]);

  const expertiseList = String(values.expertise || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const save = () => {
    setValues({ ...draft });
    setEditing(false);
    toast.success("Profile updated", { description: "Your public portfolio details were saved." });
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
                <dt className="label-caps">Biography</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-foreground">{values.bio}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="label-caps">Areas of expertise</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {expertiseList.map((item) => (
                    <span key={item} className={chipCls}>
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </SectionCard>

          <SectionCard title="Research identifiers" description="Linked scholarly profiles">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "ORCID", value: values.orcid },
                { label: "Scopus author ID", value: values.scopus },
                { label: "Google Scholar", value: values.scholar },
                { label: "LinkedIn", value: values.linkedin },
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
              Verified institutional profile · DAV University, Jalandhar
            </p>
          </SectionCard>
        </div>
      </div>

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit profile"
        description="Update the biography, contact details and research identifiers."
        size="xl"
      >
        <RecordForm
          fields={FIELDS}
          values={draft}
          onChange={(name, value) => setDraft((prev) => ({ ...prev, [name]: value }))}
          onSubmit={save}
          onCancel={() => setEditing(false)}
          submitLabel="Save profile"
        />
      </Modal>

    </>
  );
}