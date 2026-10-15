import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Upload, Loader2, X, Image as ImageIcon, CheckCircle2, FileText, Download } from "lucide-react";
import { inputCls, selectCls, btnSecondary } from "@/components/kit/styles";
import api from "@/api/backendClient";
import { toast } from "sonner";

function Shell({ label, hint, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold tracking-wide text-foreground">{label}</label>
      )}
      {children}
      {hint && <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{hint}</p>}
    </div>
  );
}

function resolveImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const backendHost = apiBase.replace(/\/api\/?$/, "");
  if (url.startsWith("/")) {
    if (url.startsWith("/uploads/")) {
      return `${backendHost}${url}`;
    }
    return url;
  }
  return url;
}

function ImageUploadControl({ name, label, hint, value, onChange }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);

  const stringValue = value === undefined || value === null ? "" : String(value);

  useEffect(() => {
    setImgError(false);
  }, [stringValue]);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WebP, GIF, SVG)");
      return;
    }

    try {
      setIsUploading(true);
      toast.info("Uploading image to server...", { duration: 1500 });
      const uploaded = await api.upload(file);
      const newUrl = uploaded?.url || uploaded?.relativeUrl || "";
      if (newUrl) {
        onChange(name, newUrl);
        setImgError(false);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error("Upload did not return an image URL");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const displaySrc = resolveImageUrl(stringValue);

  return (
    <Shell label={label} hint={hint || "Upload an image from your computer or drag and drop"} full>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={onFileSelect}
      />

      {isUploading ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-foreground">Uploading image to server…</p>
            <p className="text-[11px] text-muted-foreground">Please wait while the file is processed and stored</p>
          </div>
        </div>
      ) : stringValue ? (
        <div className="space-y-3">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-3.5 sm:flex-row sm:items-center">
            {/* Image Preview Box */}
            <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/30 shadow-inner">
              {!imgError ? (
                <img
                  src={displaySrc}
                  alt="Preview"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center text-muted-foreground">
                  <ImageIcon className="h-5 w-5 opacity-50" />
                  <span className="text-[10px] leading-tight">Image preview</span>
                </div>
              )}
            </div>

            {/* Info and Actions */}
            <div className="flex flex-1 flex-col justify-between gap-2.5 overflow-hidden">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Image set
                  </span>
                  <span className="truncate text-[11px] text-muted-foreground" title={stringValue}>
                    {stringValue.split("/").pop()}
                  </span>
                </div>
                <p className="truncate text-xs font-mono text-muted-foreground" title={stringValue}>
                  {stringValue}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={btnSecondary}
                >
                  <Upload className="h-3.5 w-3.5 text-primary" />
                  Upload new image
                </button>
                <button
                  type="button"
                  onClick={() => onChange(name, "")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition"
                >
                  <X className="h-3.5 w-3.5" />
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlFallback((prev) => !prev)}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 ml-auto"
                >
                  {showUrlFallback ? "Hide URL" : "Edit URL"}
                </button>
              </div>
            </div>
          </div>

          {showUrlFallback && (
            <div className="space-y-1.5 pt-1">
              <label className="block text-[11px] font-medium text-muted-foreground">Image URL</label>
              <input
                type="text"
                name={name}
                className={inputCls}
                placeholder="https://… or /uploads/…"
                value={stringValue}
                onChange={(e) => onChange(name, e.target.value)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? "border-primary bg-primary/10 scale-[0.99]"
                : "border-border/80 bg-muted/20 hover:border-primary/50 hover:bg-primary/[0.03]"
            }`}
          >
            <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition shadow-sm">
              <Upload className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-foreground group-hover:text-primary transition">
                Click to upload an image, or drag and drop
              </p>
              <p className="text-[11px] text-muted-foreground">
                PNG, JPG, WebP, GIF or SVG (up to 10MB)
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => setShowUrlFallback((prev) => !prev)}
              className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              {showUrlFallback ? "Hide manual URL input" : "Or enter direct image URL"}
            </button>
          </div>

          {showUrlFallback && (
            <div className="pt-1">
              <input
                type="text"
                name={name}
                className={inputCls}
                placeholder="https://… or /images/…"
                value={stringValue}
                onChange={(e) => onChange(name, e.target.value)}
              />
            </div>
          )}
        </div>
      )}
    </Shell>
  );
}

function FileUploadControl({ name, label, hint, value, onChange }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);

  const stringValue = value === undefined || value === null ? "" : String(value);

  const handleFile = async (file) => {
    if (!file) return;

    try {
      setIsUploading(true);
      toast.info("Uploading document...", { duration: 1500 });
      const uploaded = await api.upload(file);
      const newUrl = uploaded?.url || uploaded?.relativeUrl || "";
      if (newUrl) {
        onChange(name, newUrl);
        toast.success("Document uploaded successfully");
      } else {
        throw new Error("Upload did not return a file URL");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.message || "Failed to upload document");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const resolved = resolveImageUrl(stringValue);

  return (
    <Shell label={label} hint={hint} full>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.xlsx,.xls,.pptx,.txt"
        className="hidden"
        onChange={onFileSelect}
      />

      {stringValue ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/30 p-4 transition-all">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {stringValue.split("/").pop() || "Document Attached"}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Attached
                  </span>
                  {resolved && (
                    <a
                      href={resolved}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                    >
                      <Download className="h-3 w-3" /> Preview / Download
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={btnSecondary}
              >
                {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange(name, "")}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                title="Remove document"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border/80 bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
            </div>
            <p className="text-sm font-semibold text-foreground">
              {isUploading ? "Uploading file to server..." : "Click to upload document or drag and drop"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, XLSX up to 15MB</p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowUrlFallback(!showUrlFallback)}
              className="text-[11px] text-primary hover:underline"
            >
              {showUrlFallback ? "Hide URL input" : "Or enter link directly"}
            </button>
          </div>

          {showUrlFallback && (
            <input
              type="text"
              name={name}
              className={inputCls}
              placeholder="https://… or /documents/…"
              value={stringValue}
              onChange={(e) => onChange(name, e.target.value)}
            />
          )}
        </div>
      )}
    </Shell>
  );
}

export default function FieldControl({ field, value, onChange }) {
  const { name, label, type = "text", options = [], placeholder, hint, required } = field;
  const stringValue = value === undefined || value === null ? "" : String(value);

  if (type === "file" || type === "document") {
    return (
      <FileUploadControl
        name={name}
        label={label}
        hint={hint}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (type === "image") {
    return (
      <ImageUploadControl
        name={name}
        label={label}
        hint={hint}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (type === "textarea") {
    return (
      <Shell label={label} hint={hint} full>
        <textarea
          rows={4}
          name={name}
          required={required}
          className={`${inputCls} resize-y leading-relaxed`}
          placeholder={placeholder}
          value={stringValue}
          onChange={(event) => onChange(name, event.target.value)}
        />
      </Shell>
    );
  }

  if (type === "select") {
    const hasCustomValue = Boolean(stringValue && !options.includes(stringValue));
    return (
      <Shell label={label} hint={hint}>
        <div className="relative">
          <select
            className={selectCls}
            name={name}
            value={stringValue}
            onChange={(event) => onChange(name, event.target.value)}
          >
            <option value="">Select…</option>
            {hasCustomValue && (
              <option value={stringValue}>
                {stringValue}
              </option>
            )}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </Shell>
    );
  }

  return (
    <Shell label={label} hint={hint}>
      <input
        type={type === "url" ? "url" : type}
        name={name}
        required={required}
        className={inputCls}
        placeholder={placeholder}
        value={stringValue}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </Shell>
  );
}