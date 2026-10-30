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
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface SidebarNavProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const { profile, settings, liveMetrics, documents, resolveDocumentUrl } = usePortfolio();

  const rawMetrics = profile?.metrics || {};
  const useManual = rawMetrics.useManualStats !== false;
  const metrics = useManual
    ? { ...liveMetrics, ...rawMetrics }
    : { ...rawMetrics, ...liveMetrics };

  const navItems = [
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
    { id: "awards", label: "Awards & Recognitions", icon: Award, count: `${metrics.awardsCount ?? "26+"}` },
    {
      id: "patents",
      label: "Patents & Intellectual Property",
      icon: Lightbulb,
      count: String(metrics.patentsCount ?? 4).padStart(2, "0"),
    },
    {
      id: "publications",
      label: "Research Publications",
      icon: FileText,
      count: String(metrics.publicationsCount ?? "151"),
    },
    {
      id: "phd",
      label: "Ph.D. Supervision & Mentorship",
      icon: Users,
      count: String(metrics.supervisionCount ?? metrics.phdSupervisedCount ?? 9).padStart(2, "0"),
    },
    {
      id: "books",
      label: "Books Authored & Chapters",
      icon: BookOpen,
      count: String(metrics.booksCount ?? 13),
    },
    {
      id: "grants",
      label: "Research Grants & Funding",
      icon: IndianRupee,
      count: String(metrics.grantsCount ?? 11),
    },
    {
      id: "mous",
      label: "MoUs & Strategic Alliances",
      icon: Globe2,
      count: String(metrics.mousCount ?? 26),
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

  const cvDocObj = documents.find(
    (d: any) =>
      d.category === 'Curriculum Vitae' ||
      d.name?.toLowerCase().includes('vitae') ||
      d.name?.toLowerCase().includes('cv')
  );
  const cvDoc = resolveDocumentUrl(
    cvDocObj?.fileUrl || cvDocObj?.file_url || '/documents/Prof_Manoj_Kumar_Curriculum_Vitae.pdf'
  );
  const cvDocName = cvDocObj?.name || 'Curriculum Vitae (PDF)';

  const briefDocObj = documents.find(
    (d: any) =>
      d.name?.toLowerCase().includes('brief') ||
      d.name?.toLowerCase().includes('profile')
  );
  const briefDoc = resolveDocumentUrl(
    briefDocObj?.fileUrl || briefDocObj?.file_url || '/documents/Prof_Manoj_Kumar_Brief_Profile.pdf'
  );
  const briefDocName = briefDocObj?.name || 'Brief Profile (PDF)';

  const photoUrl = profile.sidebarPhoto || profile.photo || "/images/unnamed.webp";

  const socialLinkedIn = settings?.linkedin || profile.contact?.linkedIn;
  const socialTwitter = settings?.x || profile.contact?.twitter;
  const socialYouTube = settings?.youtube || profile.contact?.youtube;
  const socialScholar = profile.contact?.scholar;
  const socialOrcid = profile.contact?.orcid;
  const websiteUrl = profile.contact?.website || "https://www.davuniversity.org";
  const contactEmail = profile.contact?.officialEmail || settings?.contactEmail || "drmanojkumarindia@gmail.com";

  return (
    <aside className="academic-sidebar">
      {/* Profile Card */}
      <div className="sidebar-profile-card">
        <div className="profile-avatar-container">
          <img
            src={photoUrl}
            alt={profile.fullName}
            className="profile-avatar-img"
          />
        </div>
        <h3 className="profile-card-name">{profile.fullName}</h3>
        <div className="profile-card-role">{profile.designation}</div>
        <div className="profile-card-org">{profile.institution}</div>
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
          href={cvDoc}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-download-btn"
          title={cvDocName}
          download
        >
          <Download size={14} />
          <span>{cvDocName.length > 28 ? 'Curriculum Vitae (PDF)' : cvDocName}</span>
        </a>
        <a
          href={briefDoc}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-download-btn sidebar-download-alt"
          title={briefDocName}
          download
        >
          <Download size={14} />
          <span>{briefDocName.length > 28 ? 'Brief Profile (PDF)' : briefDocName}</span>
        </a>

        {/* Dynamic Social & Official Links */}
        <div className="sidebar-social-row">
          {socialLinkedIn && (
            <a
              href={socialLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-social-link"
              title="LinkedIn Profile"
            >
              <svg
                width="14"
                height="14"
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
          )}
          {socialTwitter && (
            <a
              href={socialTwitter}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-social-link"
              title="X (Twitter) Profile"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-social-link"
            title="DAV University Official Portal"
          >
            <Globe size={15} />
          </a>
          <a
            href={`mailto:${contactEmail}`}
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
