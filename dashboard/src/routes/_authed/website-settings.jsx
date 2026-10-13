import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Globe, Save } from "lucide-react";
import { toast } from "sonner";
import FieldControl from "@/components/kit/FieldControl";
import PageHeader from "@/components/kit/PageHeader";
import SectionCard from "@/components/kit/SectionCard";
import Toggle from "@/components/kit/Toggle";
import { btnPrimary, chipCls } from "@/components/kit/styles";
import api from "@/api/backendClient";
import { updateFavicon } from "@/lib/utils";

export const Route = createFileRoute("/_authed/website-settings")({
  head: () => ({ meta: [{ title: "Website Settings · Portfolio Console" }] }),
  component: WebsiteSettingsPage,
});

const IDENTITY_FIELDS = [
  { name: "site_title", label: "Site title", type: "text" },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "favicon", label: "Website Favicon", type: "image", full: true, hint: "Upload an official favicon (SVG, PNG, ICO, JPG) to display in browser tabs" },
  { name: "description", label: "Site description", type: "textarea", full: true },
]; 

const CONTACT_FIELDS = [
  { name: "contact_email", label: "Public email", type: "text" },
  { name: "phone", label: "Telephone", type: "text" },
  { name: "address", label: "Campus address", type: "textarea", full: true },
  { name: "footer", label: "Footer note", type: "text", full: true },
];

const SOCIAL_FIELDS = [
  { name: "linkedin", label: "LinkedIn URL", type: "url" },
  { name: "x", label: "X (Twitter) URL", type: "url" },
  { name: "youtube", label: "YouTube channel", type: "url" },
];

const INITIAL = {
  site_title: "Prof. (Dr.) Manoj Kumar",
  tagline: "Vice-Chancellor · DAV University, Jalandhar",
  favicon: "/favicon.svg",
  description:
    "The academic portfolio of Prof. (Dr.) Manoj Kumar — research in machine learning systems, computational intelligence and technology for sustainable agriculture.",
  contact_email: "vc@davuniversity.org",
  phone: "+91 181 662 8000",
  address: "Office of the Vice-Chancellor, Administrative Block, DAV University, Jalandhar, Punjab 144012",
  footer: "© 2026 DAV University, Jalandhar. All rights reserved.",
  linkedin: "https://linkedin.com/in/manojkumar-vc",
  x: "https://x.com/davuniversity",
  youtube: "https://youtube.com/@davuniversity",
};

function WebsiteSettingsPage() {
  const [values, setValues] = useState(INITIAL);
  const [sections, setSections] = useState({
    maintenance: false,
    hero: true,
    highlights: true,
    publications: true,
    gallery: true,
    contactForm: true,
  });

  useEffect(() => {
    let active = true;
    async function loadSettings() {
      try {
        const remote = await api.settings.getWebsiteSettings();
        if (active && remote) {
          const effectiveFavicon = remote.favicon || INITIAL.favicon;
          setValues({
            site_title: remote.siteTitle || INITIAL.site_title,
            tagline: remote.tagline || INITIAL.tagline,
            favicon: effectiveFavicon,
            description: remote.description || INITIAL.description,
            contact_email: remote.contactEmail || INITIAL.contact_email,
            phone: remote.phone || INITIAL.phone,
            address: remote.address || INITIAL.address,
            footer: remote.footer || INITIAL.footer,
            linkedin: remote.linkedin || INITIAL.linkedin,
            x: remote.x || INITIAL.x,
            youtube: remote.youtube || INITIAL.youtube,
          });
          if (effectiveFavicon) {
            updateFavicon(effectiveFavicon);
          }
          if (remote.sections && typeof remote.sections === "object") {
            setSections((prev) => ({ ...prev, ...remote.sections }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch remote website settings:", err);
      }
    }
    loadSettings();
    return () => {
      active = false;
    };
  }, []);

  const update = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name === "favicon" && value) {
      updateFavicon(value);
      window.dispatchEvent(new CustomEvent("favicon:updated", { detail: value }));
    }
  };

  const save = async () => {
    toast.info("Saving settings to database...");
    try {
      await api.settings.updateWebsiteSettings({
        siteTitle: values.site_title,
        tagline: values.tagline,
        favicon: values.favicon,
        description: values.description,
        contactEmail: values.contact_email,
        phone: values.phone,
        address: values.address,
        footer: values.footer,
        linkedin: values.linkedin,
        x: values.x,
        youtube: values.youtube,
        sections,
      });

      if (values.favicon) {
        updateFavicon(values.favicon);
        window.dispatchEvent(new CustomEvent("favicon:updated", { detail: values.favicon }));
      }

      toast.success("Website settings saved", { description: "Your configuration and favicon are live across the platform." });
    } catch (err) {
      toast.error(err.message || "Failed to save settings to server");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Configuration"
        title="Website Settings"
        description="Identity, contact details and the sections that appear on your public portfolio."
        breadcrumb={["Console", "Configuration", "Website Settings"]}
        actions={
          <button type="button" className={btnPrimary} onClick={save}>
            <Save className="h-4 w-4" />
            Save settings
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <SectionCard title="Site identity" description="Title, tagline and description used across pages">
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {IDENTITY_FIELDS.map((field) => (
                <FieldControl key={field.name} field={field} value={values[field.name]} onChange={update} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Contact & footer" description="Displayed on the public contact block">
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {CONTACT_FIELDS.map((field) => (
                <FieldControl key={field.name} field={field} value={values[field.name]} onChange={update} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Social profiles" description="Linked accounts shown in the site header">
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {SOCIAL_FIELDS.map((field) => (
                <FieldControl key={field.name} field={field} value={values[field.name]} onChange={update} />
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Live preview" description="Homepage header as visitors see it">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="ml-2 truncate rounded bg-card px-2 py-0.5 text-[10px] text-muted-foreground">
                  davuniversity.org
                </span>
              </div>
              <div className="bg-gradient-to-br from-primary/95 to-primary/75 p-5 text-primary-foreground">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">Portfolio</p>
                <p className="mt-2 font-heading text-lg font-semibold leading-tight">
                  {values.site_title}
                </p>
                <p className="mt-1 text-xs text-white/75">{values.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[hsl(var(--gold))] px-3 py-1.5 text-[11px] font-semibold text-white">
                  <Globe className="h-3 w-3" /> View public site
                </span>
              </div>
              <div className="space-y-2 p-4">
                <p className="text-[11px] leading-relaxed text-muted-foreground">{values.description}</p>
                <p className="border-t border-border pt-3 text-[10px] text-muted-foreground">
                  {values.footer}
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Homepage sections" description="Toggle which blocks are published">
            <div className="divide-y divide-border">
              <Toggle
                id="ws-hero"
                label="Hero introduction"
                checked={sections.hero}
                onChange={(next) => setSections((prev) => ({ ...prev, hero: next }))}
              />
              <Toggle
                id="ws-highlights"
                label="Career highlights"
                checked={sections.highlights}
                onChange={(next) => setSections((prev) => ({ ...prev, highlights: next }))}
              />
              <Toggle
                id="ws-publications"
                label="Selected publications"
                checked={sections.publications}
                onChange={(next) => setSections((prev) => ({ ...prev, publications: next }))}
              />
              <Toggle
                id="ws-gallery"
                label="Campus gallery"
                checked={sections.gallery}
                onChange={(next) => setSections((prev) => ({ ...prev, gallery: next }))}
              />
              <Toggle
                id="ws-contact"
                label="Contact form"
                checked={sections.contactForm}
                onChange={(next) => setSections((prev) => ({ ...prev, contactForm: next }))}
              />
              <Toggle
                id="ws-maintenance"
                label="Maintenance mode"
                description="Temporarily replaces the public site with a notice page."
                checked={sections.maintenance}
                onChange={(next) => setSections((prev) => ({ ...prev, maintenance: next }))}
              />
            </div>
          </SectionCard>

          <SectionCard title="Domain" description="Primary address of the public portfolio">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">davuniversity.org</p>
                <p className="text-[11px] text-muted-foreground">Connected · SSL active</p>
              </div>
              <span className={chipCls}>Primary</span>
            </div>
            <a
              href="https://davuniversity.org"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:opacity-80"
            >
              Open public site <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </SectionCard>
        </div>
      </div>
    </>
  );
}