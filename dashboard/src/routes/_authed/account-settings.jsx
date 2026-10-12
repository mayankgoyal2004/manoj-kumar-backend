import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Moon, Save, Sun } from "lucide-react";
import { toast } from "sonner";
import FieldControl from "@/components/kit/FieldControl";
import PageHeader from "@/components/kit/PageHeader";
import SectionCard from "@/components/kit/SectionCard";
import Toggle from "@/components/kit/Toggle";
import { btnPrimary, btnSecondary, inputCls } from "@/components/kit/styles";
import { PROFILE } from "@/lib/DataStore";
import { useTheme } from "@/lib/ThemeContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authed/account-settings")({
  head: () => ({ meta: [{ title: "Account Settings · Portfolio Console" }] }),
  component: AccountSettingsPage,
});

const ACCOUNT_FIELDS = [
  { name: "full_name", label: "Full name", type: "text" },
  { name: "email", label: "Sign-in email", type: "text" },
  { name: "phone", label: "Telephone", type: "text" },
  { name: "designation", label: "Console designation", type: "text" },
  { name: "timezone", label: "Time zone", type: "select", options: ["Asia/Kolkata (IST)", "Asia/Dubai (GST)", "Europe/London (GMT)", "America/New_York (EST)"] },
  { name: "language", label: "Interface language", type: "select", options: ["English (India)", "English (UK)", "हिन्दी"] },
];

function AccountSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [values, setValues] = useState({
    full_name: PROFILE.name,
    email: PROFILE.email,
    phone: PROFILE.phone,
    designation: "Vice-Chancellor",
    timezone: "Asia/Kolkata (IST)",
    language: "English (India)",
  });
  const [prefs, setPrefs] = useState({
    review: true,
    publishing: true,
    security: true,
    digest: false,
  });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  const update = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const saveProfile = () =>
    toast.success("Account updated", { description: "Your console profile has been saved." });

  const savePassword = () => {
    if (!passwords.current) {
      toast.error("Enter your current password");
      return;
    }
    if (passwords.next.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    setPasswords({ current: "", next: "", confirm: "" });
    toast.success("Password changed", { description: "Use your new password the next time you sign in." });
  };

  return (
    <>
      <PageHeader
        eyebrow="Your console account"
        title="Account Settings"
        description="Personal details, appearance, notification preferences and sign-in security."
        breadcrumb={["Console", "Configuration", "Account Settings"]}
        actions={
          <button type="button" className={btnPrimary} onClick={saveProfile}>
            <Save className="h-4 w-4" />
            Save changes
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <SectionCard title="Personal details" description="Used for authorship and activity attribution">
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {ACCOUNT_FIELDS.map((field) => (
                <FieldControl key={field.name} field={field} value={values[field.name]} onChange={update} />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <button type="button" className={btnSecondary} onClick={saveProfile}>
                Save details
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Sign-in security" description="Update the password for this console account">
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {[
                { key: "current", label: "Current password" },
                { key: "next", label: "New password" },
                { key: "confirm", label: "Confirm new password" },
              ].map((field) => (
                <div key={field.key} className={field.key === "confirm" ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">
                    {field.label}
                  </label>
                  <input
                    type="password"
                    className={inputCls}
                    placeholder="••••••••"
                    value={passwords[field.key]}
                    onChange={(event) =>
                      setPasswords((prev) => ({ ...prev, [field.key]: event.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
              <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <KeyRound className="h-3.5 w-3.5" />
                Minimum 8 characters · last changed 62 days ago
              </p>
              <button type="button" className={btnPrimary} onClick={savePassword}>
                Update password
              </button>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Appearance" description="Choose how the console looks">
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "light", label: "Light", icon: Sun },
                { key: "dark", label: "Dark", icon: Moon },
              ].map((option) => {
                const Icon = option.icon;
                const active = theme === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setTheme(option.key)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition",
                      active
                        ? "border-primary/50 bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/25 hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
                    <p className="mt-2 text-sm font-medium text-foreground">{option.label}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {option.key === "light" ? "Navy on white" : "Deep navy with gold accents"}
                    </p>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Notification preferences" description="Choose what reaches your inbox">
            <div className="divide-y divide-border">
              <Toggle
                id="pref-review"
                label="Review requests"
                description="When a record is submitted for your approval."
                checked={prefs.review}
                onChange={(next) => setPrefs((prev) => ({ ...prev, review: next }))}
              />
              <Toggle
                id="pref-publishing"
                label="Publishing updates"
                description="Imports, publishing failures and scheduled releases."
                checked={prefs.publishing}
                onChange={(next) => setPrefs((prev) => ({ ...prev, publishing: next }))}
              />
              <Toggle
                id="pref-security"
                label="Security alerts"
                description="New device sign-ins and permission changes."
                checked={prefs.security}
                onChange={(next) => setPrefs((prev) => ({ ...prev, security: next }))}
              />
              <Toggle
                id="pref-digest"
                label="Weekly digest"
                description="A Monday summary of portfolio activity."
                checked={prefs.digest}
                onChange={(next) => setPrefs((prev) => ({ ...prev, digest: next }))}
              />
            </div>
          </SectionCard>

          <SectionCard title="Session" description="Current access to this console">
            <dl className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Signed in as</dt>
                <dd className="truncate font-medium text-foreground">{values.email}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Role</dt>
                <dd className="font-medium text-foreground">Super Admin</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Time zone</dt>
                <dd className="font-medium text-foreground">{values.timezone}</dd>
              </div>
            </dl>
          </SectionCard>
        </div>
      </div>
    </>
  );
}