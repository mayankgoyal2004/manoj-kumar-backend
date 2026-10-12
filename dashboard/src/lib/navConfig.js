import {
  LayoutDashboard,
  UserRound,
  Building2,
  GraduationCap,
  Award,
  Lightbulb,
  BookOpenText,
  UsersRound,
  BookMarked,
  Coins,
  Handshake,
  Landmark,
  Mic,
  Images,
  Newspaper,
  FolderOpen,
  FileText,
  ScrollText,
  Bell,
  Globe,
  Search,
  Settings2,
  ShieldCheck,
} from "lucide-react";

export const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard, exact: true },
      { label: "Profile Management", to: "/profile", icon: UserRound },
    ],
  },
  {
    label: "Academic Record",
    items: [
      { label: "Academic & Executive Positions", to: "/positions", icon: Building2, moduleKey: "positions" },
      { label: "Education & Credentials", to: "/education", icon: GraduationCap, moduleKey: "education" },
      { label: "Awards & Recognitions", to: "/awards", icon: Award, moduleKey: "awards" },
      { label: "Patents & IP", to: "/patents", icon: Lightbulb, moduleKey: "patents" },
      { label: "Research Publications", to: "/publications", icon: BookOpenText, moduleKey: "publications" },
      { label: "PhD Supervision", to: "/supervision", icon: UsersRound, moduleKey: "supervision" },
      { label: "Books & Chapters", to: "/books", icon: BookMarked, moduleKey: "books" },
      { label: "Research Grants", to: "/grants", icon: Coins, moduleKey: "grants" },
    ],
  },
  {
    label: "Outreach & Alliances",
    items: [
      { label: "MoUs & Alliances", to: "/mous", icon: Handshake, moduleKey: "mous" },
      { label: "Affiliations & Governance", to: "/affiliations", icon: Landmark, moduleKey: "affiliations" },
      { label: "Conferences & Keynotes", to: "/conferences", icon: Mic, moduleKey: "conferences" },
    ],
  },
  {
    label: "Media & Content",
    items: [
      { label: "Campus Gallery", to: "/gallery", icon: Images, moduleKey: "gallery" },
      { label: "News & Media", to: "/news", icon: Newspaper, moduleKey: "news" },
      { label: "Media Library", to: "/media-library", icon: FolderOpen, moduleKey: "media" },
      { label: "Documents", to: "/documents", icon: FileText, moduleKey: "documents" },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Users & Roles", to: "/users", icon: ShieldCheck, moduleKey: "users" },
      { label: "Activity Logs", to: "/activity-logs", icon: ScrollText },
      { label: "Notifications", to: "/notifications", icon: Bell, moduleKey: "notifications" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Website Settings", to: "/website-settings", icon: Globe },
      { label: "SEO Settings", to: "/seo-settings", icon: Search },
      { label: "Account Settings", to: "/account-settings", icon: Settings2 },
    ],
  },
];

export const ALL_NAV_ITEMS = NAV_SECTIONS.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.label }))
);

export const MODULE_ROUTES = ALL_NAV_ITEMS.filter((item) => item.moduleKey).reduce((acc, item) => {
  acc[item.moduleKey] = item.to;
  return acc;
}, {});

export function findNavItem(pathname) {
  if (!pathname || pathname === "/") {
    return ALL_NAV_ITEMS.find((item) => item.to === "/");
  }
  return (
    ALL_NAV_ITEMS.find((item) => item.to === pathname) ||
    ALL_NAV_ITEMS.find((item) => item.to !== "/" && pathname.startsWith(item.to))
  );
}