import React from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { updateFavicon } from "@/lib/utils";
import api from "@/api/backendClient";
import FullPageLoader from "@/components/layout/FullPageLoader";
import appCss from "@/index.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Portfolio Console · Prof. (Dr.) Manoj Kumar" },
      {
        name: "description",
        content:
          "Administration console for the academic portfolio of Prof. (Dr.) Manoj Kumar, Vice-Chancellor, DAV University, Jalandhar.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        href: "/favicon.svg",
      },
    ],
  }),
  pendingComponent: FullPageLoader,
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  component: RootComponent,
});

function DynamicFavicon() {
  const { user } = useAuth();
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    let active = true;

    // 1. Immediately apply cached favicon from localStorage
    try {
      const cached = localStorage.getItem("mk-favicon");
      if (cached) {
        updateFavicon(cached);
      }
    } catch (e) {}

    // 2. Fetch latest website settings (official uploaded favicon)
    async function syncFavicon() {
      try {
        const settings = await api.settings.getWebsiteSettings();
        if (!active) return;
        const icon = settings?.favicon || user?.avatar || "/favicon.svg";
        if (icon) {
          updateFavicon(icon);
        }
      } catch (err) {
        if (!active) return;
        const icon = user?.avatar || "/favicon.svg";
        if (icon) {
          updateFavicon(icon);
        }
      }
    }

    syncFavicon();

    // 3. Listen to global favicon updates across components and tabs
    const onFaviconUpdate = (e) => {
      const target = e?.detail;
      if (target) {
        updateFavicon(target);
      } else {
        syncFavicon();
      }
    };

    window.addEventListener("favicon:updated", onFaviconUpdate);
    const onStorage = (e) => {
      if (e.key === "mk-favicon" && e.newValue) {
        updateFavicon(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      active = false;
      window.removeEventListener("favicon:updated", onFaviconUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [user?.avatar]);

  return null;
}

function RootComponent() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DynamicFavicon />
        <Outlet />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

function RootDocument({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('mk-theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch(e){}

              try {
                var f = localStorage.getItem('mk-favicon');
                if (f) {
                  var links = document.querySelectorAll("link[rel*='icon']");
                  for (var i = 0; i < links.length; i++) {
                    if (links[i].parentNode) links[i].parentNode.removeChild(links[i]);
                  }
                  var nl = document.createElement('link');
                  nl.rel = 'icon';
                  var clean = f.split('?')[0].toLowerCase();
                  if (clean.indexOf('.svg') !== -1) nl.type = 'image/svg+xml';
                  else if (clean.indexOf('.png') !== -1) nl.type = 'image/png';
                  else if (clean.indexOf('.jpg') !== -1 || clean.indexOf('.jpeg') !== -1) nl.type = 'image/jpeg';
                  else if (clean.indexOf('.webp') !== -1) nl.type = 'image/webp';
                  else nl.type = 'image/x-icon';
                  nl.href = f;
                  document.head.appendChild(nl);

                  var sl = document.createElement('link');
                  sl.rel = 'shortcut icon';
                  sl.type = nl.type;
                  sl.href = f;
                  document.head.appendChild(sl);
                }
              } catch(e){}

              // Automatically unregister any legacy/rogue service workers causing Workbox network stalls on localhost
              if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (var i = 0; i < registrations.length; i++) {
                    registrations[i].unregister();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body data-react-root="true" suppressHydrationWarning className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}