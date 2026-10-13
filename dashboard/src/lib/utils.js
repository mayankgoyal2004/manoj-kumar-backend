import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function resolveImageUrl(url) {
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

export function updateFavicon(iconUrl) {
  if (typeof document === "undefined" || !iconUrl) return;

  const resolved = resolveImageUrl(iconUrl);
  if (!resolved) return;

  try {
    localStorage.setItem("mk-favicon", resolved);
  } catch (e) {}

  let mimeType = "image/x-icon";
  const cleanUrl = resolved.split("?")[0].toLowerCase();
  if (cleanUrl.endsWith(".svg")) {
    mimeType = "image/svg+xml";
  } else if (cleanUrl.endsWith(".png")) {
    mimeType = "image/png";
  } else if (cleanUrl.endsWith(".jpg") || cleanUrl.endsWith(".jpeg")) {
    mimeType = "image/jpeg";
  } else if (cleanUrl.endsWith(".webp")) {
    mimeType = "image/webp";
  } else if (cleanUrl.endsWith(".ico")) {
    mimeType = "image/x-icon";
  }

  const existingLinks = document.querySelectorAll(
    "link[rel='icon'], link[rel='shortcut icon'], link[rel='alternate icon']"
  );
  existingLinks.forEach((el) => {
    try {
      el.remove();
    } catch (e) {
      el.parentNode?.removeChild(el);
    }
  });

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = mimeType;
  link.href = resolved;
  document.head.appendChild(link);

  const shortcutLink = document.createElement("link");
  shortcutLink.rel = "shortcut icon";
  shortcutLink.type = mimeType;
  shortcutLink.href = resolved;
  document.head.appendChild(shortcutLink);
}
