import React from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  FileText,
  Users,
  BookOpen,
  IndianRupee,
  Globe2,
  ShieldCheck,
  Calendar,
  Image as ImageIcon,
  Newspaper,
  Mail,
  Download,
  Globe,
  ExternalLink,
} from "lucide-react";
import { executiveProfile } from "../data/profileData";

interface SidebarNavProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const navItems = [
  { id: "overview", label: "About Biosketch", icon: User, count: null },
  {
    id: "positions",
    label: "Academic & Executive Positions",
    icon: Briefcase,
    count: null,
  },
  {
    id: "education",
    label: "Education & Credentials",
    icon: GraduationCap,
    count: null,
  },
  { id: "awards", label: "Awards & Recognitions", icon: Award, count: "26+" },
  {
    id: "patents",
    label: "Patents & Intellectual Property",
    icon: Lightbulb,
    count: "04",
  },
  {
    id: "publications",
    label: "Research Publications",
    icon: FileText,
    count: "151",
  },
  {
    id: "phd",
    label: "Ph.D. Supervision & Mentorship",
    icon: Users,
    count: "09",
  },
  {
    id: "books",
    label: "Books Authored & Chapters",
    icon: BookOpen,
    count: "13",
  },
  {
    id: "grants",
    label: "Research Grants & Funding",
    icon: IndianRupee,
    count: "11",
  },
  {
    id: "mous",
    label: "MoUs & Strategic Alliances",
    icon: Globe2,
    count: "26",
  },
  {
    id: "affiliations",
    label: "Affiliations & Governance",
    icon: ShieldCheck,
    count: null,
  },
  {
    id: "events",
    label: "Conferences & Keynotes",
    icon: Calendar,
    count: "50+",
  },
  {
    id: "gallery",
    label: "Campus & Leadership Gallery",
    icon: ImageIcon,
    count: null,
  },
  {
    id: "news",
    label: "News & Media Coverage",
    icon: Newspaper,
    count: "10+",
  },
  { id: "contact", label: "Contact & Secretariat", icon: Mail, count: null },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeSection,
  onSelectSection,
}) => {
  return (
    <aside className="academic-sidebar">
      {/* Profile Card */}
      <div className="sidebar-profile-card">
        <div className="profile-avatar-container">
          <img
            src="/images/prof_manoj_kumar.jpg"
            alt={executiveProfile.fullName}
            className="profile-avatar-img"
          />
        </div>
        <h3 className="profile-card-name">{executiveProfile.fullName}</h3>
        <div className="profile-card-role">{executiveProfile.designation}</div>
        <div className="profile-card-org">DAV University, Jalandhar</div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav-list" aria-label="Academic Sections">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeSection === item.id;
          return (
            <div key={item.id} className="sidebar-nav-item">
              <button
                className={`sidebar-nav-button ${isActive ? "active" : ""}`}
                onClick={() => onSelectSection(item.id)}
              >
                <div className="nav-label-group">
                  <IconComp size={16} className="nav-icon" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="nav-count-badge">{item.count}</span>
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Official Dossiers & Downloads */}
      <div className="sidebar-footer">
        <a
          href="/documents/Prof_Manoj_Kumar_Curriculum_Vitae.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-download-btn"
          download
        >
          <Download size={14} />
          <span>Curriculum Vitae (PDF)</span>
        </a>
        <a
          href="/documents/Prof_Manoj_Kumar_Brief_Profile.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-download-btn sidebar-download-alt"
          download
        >
          <Download size={14} />
          <span>Brief Profile (PDF)</span>
        </a>

        {/* Social & Official Links */}
        <div className="sidebar-social-row">
          <a
            href={executiveProfile.contact.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-social-link"
            title="LinkedIn Profile"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://www.davuniversity.org"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-social-link"
            title="DAV University Official Portal"
          >
            <Globe size={15} />
          </a>
          <a
            href={`mailto:${executiveProfile.contact.officialEmail}`}
            className="sidebar-social-link"
            title="Email Vice-Chancellor Secretariat"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </aside>
  );
};
