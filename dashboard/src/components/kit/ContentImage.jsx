import React from "react";
import { Image } from "@/components/ui/image";

// Renders hosted images through the platform Image component (resized + encoded),
// and falls back to a plain <img> for locally created previews (blob:/data:).
export default function ContentImage({ src, alt, className }) {
  const value = src || "";
  if (!value || value.startsWith("blob:") || value.startsWith("data:")) {
    return <img src={value} alt={alt || ""} className={className} />;
  }
  return <Image src={value} alt={alt || ""} className={className} />;
}