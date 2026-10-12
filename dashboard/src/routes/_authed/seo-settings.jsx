import React, { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Save, Search } from "lucide-react";
import { toast } from "sonner";
import FieldControl from "@/components/kit/FieldControl";
import PageHeader from "@/components/kit/PageHeader";
import SectionCard from "@/components/kit/SectionCard";
import Toggle from "@/components/kit/Toggle";
import { btnPrimary } from "@/components/kit/styles";
import { Image } from "@/components/ui/image";

export const Route = createFileRoute("/_authed/seo-settings")({
  head: () => ({ meta: [{ title: "SEO Settings · Portfolio Console" }] }),
  component: SeoSettingsPage,
});

const FIELDS = [
  { name: "meta_title", label: "Meta title", type: "text", hint: "30–60 characters is ideal" },
  { name: "canonical", label: "Canonical URL", type: "url" },
  { name: "meta_description", label: "Meta description", type: "textarea", full: true, hint: "120–160 characters" },
  { name: "keywords", label: "Focus keywords", type: "text", hint: "Comma separated" },
  { name: "twitter_handle", label: "X (Twitter) handle", type: "text" },
  { name: "og_image", label: "Social share image URL", type: "image", full: true },
];

const INITIAL = {
  meta_title: "Prof. (Dr.) Manoj Kumar — Vice-Chancellor, DAV University",
  meta_description:
    "Academic portfolio of Prof. (Dr.) Manoj Kumar: research in machine learning systems, computational intelligence and sustainable agriculture, with 120+ indexed publications.",
  keywords:
    "Manoj Kumar, Vice-Chancellor, DAV University Jalandhar, machine learning, computational intelligence, precision agriculture, higher education",
  canonical: "https://davuniversity.org/vc/manoj-kumar",
  twitter_handle: "@davuniversity",
  og_image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=70",
};

function SeoSettingsPage() {
  const [values, setValues] = useState(INITIAL);
  const [flags, setFlags] = useState({ sitemap: true, structured: true, og: true, noindex: false });

  const update = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const checks = useMemo(() => {
    const titleLength = values.meta_title.trim().length;
    const descriptionLength = values.meta_description.trim().length;
    return [
      {
        label: "Meta title length",
        ok: titleLength >= 30 && titleLength <= 70,
        detail: `${titleLength} characters`,
      },
      {
        label: "Meta description length",
        ok: descriptionLength >= 110 && descriptionLength <= 170,
        detail: `${descriptionLength} characters`,
      },
      { label: "Focus keywords", ok: values.keywords.trim().length > 0, detail: `${values.keywords.split(",").filter(Boolean).length} keywords` },
      { label: "Social share image", ok: Boolean(values.og_image), detail: values.og_image ? "Set" : "Missing" },
      { label: "Canonical URL", ok: Boolean(values.canonical), detail: values.canonical ? "Set" : "Missing" },
    ];
  }, [values]);

  const score = Math.round((checks.filter((check) => check.ok).length / checks.length) * 100);

  const save = () =>
    toast.success("SEO settings saved", { description: `Metadata score ${score}% on next publish.` });

  return (
    <>
      <PageHeader
        eyebrow={`Metadata score ${score}%`}
        title="SEO Settings"
        description="Control how this portfolio appears in search results and when shared on social platforms."
        breadcrumb={["Console", "Configuration", "SEO Settings"]}
        actions={
          <button type="button" className={btnPrimary} onClick={save}>
            <Save className="h-4 w-4" />
            Save settings
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <SectionCard title="Search metadata" description="Titles, descriptions and canonical details">
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <FieldControl key={field.name} field={field} value={values[field.name]} onChange={update} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Search result preview" description="Approximate appearance on Google">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-primary/10 text-[8px] font-bold text-primary">
                  MK
                </span>
                davuniversity.org › vc › manoj-kumar
              </p>
              <p className="mt-2 text-base font-medium leading-snug text-[#1a0dab] dark:text-sky-300">
                {values.meta_title || "Untitled page"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {values.meta_description}
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Technical SEO" description="Crawling, indexing and structured data">
            <div className="divide-y divide-border">
              <Toggle
                id="seo-sitemap"
                label="Generate XML sitemap"
                description="Publishes /sitemap.xml for search engines."
                checked={flags.sitemap}
                onChange={(next) => setFlags((prev) => ({ ...prev, sitemap: next }))}
              />
              <Toggle
                id="seo-structured"
                label="Structured data (Schema.org)"
                description="Person and ScholarlyArticle markup for rich results."
                checked={flags.structured}
                onChange={(next) => setFlags((prev) => ({ ...prev, structured: next }))}
              />
              <Toggle
                id="seo-og"
                label="Open Graph and X cards"
                description="Rich previews when the portfolio is shared."
                checked={flags.og}
                onChange={(next) => setFlags((prev) => ({ ...prev, og: next }))}
              />
              <Toggle
                id="seo-noindex"
                label="Discourage search indexing"
                description="Adds a noindex directive to every page."
                checked={flags.noindex}
                onChange={(next) => setFlags((prev) => ({ ...prev, noindex: next }))}
              />
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Metadata audit" description="Checks applied before publishing">
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
              <div className="relative grid h-14 w-14 place-items-center">
                <svg viewBox="0 0 36 36" className="absolute h-14 w-14 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * 97.4} 97.4`}
                  />
                </svg>
                <span className="font-heading text-sm font-semibold text-foreground">{score}%</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Metadata quality</p>
                <p className="text-[11px] text-muted-foreground">
                  {checks.filter((check) => check.ok).length} of {checks.length} checks passing
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {checks.map((check) => (
                <li key={check.label} className="flex items-start gap-3">
                  {check.ok ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-foreground">{check.label}</span>
                    <span className="block text-[11px] text-muted-foreground">{check.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Social preview" description="How a shared link renders">
            <div className="overflow-hidden rounded-xl border border-border">
              <Image src={values.og_image} alt="Social share preview" className="h-40 w-full object-cover" />
              <div className="p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {values.twitter_handle}
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-foreground">
                  {values.meta_title}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                  {values.meta_description}
                </p>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Search className="h-3.5 w-3.5" /> Indexing priority: high
            </p>
          </SectionCard>
        </div>
      </div>
    </>
  );
}