import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioApi } from '../api/portfolioApi';
import { executiveProfile as fallbackProfile } from '../data/profileData';
import { careerPositions as fallbackPositions } from '../data/positionsData';
import { degrees as fallbackDegrees, executiveCertifications as fallbackCerts } from '../data/educationData';
import { awardsList as fallbackAwards } from '../data/awardsData';
import { patentsList as fallbackPatents } from '../data/patentsData';
import { allPublications as fallbackPublications } from '../data/publicationsData';
import { booksList as fallbackBooks } from '../data/booksData';
import { researchGrantsList as fallbackGrants } from '../data/grantsData';
import { phdScholarsList as fallbackPhd, mtechSupervisionList as fallbackMtech } from '../data/phdSupervisionData';
import { strategicMoUsList as fallbackMous } from '../data/mousData';
import { affiliationsList as fallbackAffiliations } from '../data/affiliationsData';
import { organizedEvents as fallbackEvents, keynotesAndPresentations as fallbackKeynotes, trainingsAttended as fallbackTrainings } from '../data/eventsData';
import { galleryItems as fallbackGallery } from '../data/galleryData';
import { newsMediaItems as fallbackNews } from '../data/newsMediaData';

export interface PortfolioContextValue {
  isLoading: boolean;
  isBackendConnected: boolean;
  profile: any;
  settings: any;
  liveMetrics: Record<string, any>;
  positions: any[];
  education: any[];
  awards: any[];
  patents: any[];
  publications: any[];
  books: any[];
  grants: any[];
  supervision: any[];
  mous: any[];
  affiliations: any[];
  conferences: any[];
  gallery: any[];
  news: any[];
  documents: any[];
  resolveDocumentUrl: (url?: string | null) => string;
  refreshData: () => Promise<void>;
}

export function resolveDocumentUrl(url?: string | null): string {
  if (!url) return '';
  const cleanUrl = url.trim();
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') || cleanUrl.startsWith('blob:') || cleanUrl.startsWith('data:')) {
    return cleanUrl;
  }
  const apiBase = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api/public';
  const backendHost = apiBase.replace(/\/api\/public\/?$/, '').replace(/\/api\/?$/, '');
  if (cleanUrl.startsWith('/uploads/') || cleanUrl.startsWith('uploads/')) {
    const path = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
    return `${backendHost}${path}`;
  }
  return cleanUrl;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Dynamic state
  const [profile, setProfile] = useState<any>(fallbackProfile);
  const [settings, setSettings] = useState<any>({
    siteTitle: 'Prof. (Dr.) Manoj Kumar — Academic Portfolio',
    tagline: 'Vice-Chancellor · DAV University, Jalandhar, Punjab, India',
    contactEmail: fallbackProfile.contact?.officialEmail || 'drmanojkumarindia@gmail.com',
    phone: fallbackProfile.contact?.officePhone || '+91-181-2708844',
    address: fallbackProfile.contact?.officeAddress || 'Office of the Vice-Chancellor, DAV University, Sarmastpur, Jalandhar - Pathankot National Highway (NH 44), Jalandhar, Punjab (India) - 144012',
    footer: '© 2026 DAV University, Jalandhar. All rights reserved.',
  });
  const [liveMetrics, setLiveMetrics] = useState<Record<string, any>>(fallbackProfile.metrics || {});

  const [positions, setPositions] = useState<any[]>(fallbackPositions);
  const [education, setEducation] = useState<any[]>([...fallbackDegrees, ...fallbackCerts]);
  const [awards, setAwards] = useState<any[]>(fallbackAwards);
  const [patents, setPatents] = useState<any[]>(fallbackPatents);
  const [publications, setPublications] = useState<any[]>(fallbackPublications);
  const [books, setBooks] = useState<any[]>(fallbackBooks);
  const [grants, setGrants] = useState<any[]>(fallbackGrants);
  const [supervision, setSupervision] = useState<any[]>([...fallbackPhd, ...fallbackMtech]);
  const [mous, setMous] = useState<any[]>(fallbackMous);
  const [affiliations, setAffiliations] = useState<any[]>(fallbackAffiliations);
  const [conferences, setConferences] = useState<any[]>([
    ...fallbackEvents.map((e: any) => ({ ...e, role: 'Convener / Organizer', category: 'Conferences & FDPs Organized' })),
    ...fallbackKeynotes.map((e: any) => ({ ...e, role: 'Keynote', category: 'Keynotes & Invited Talks' })),
    ...fallbackTrainings.map((e: any) => ({ ...e, role: 'Executive Participant', category: 'Advanced Executive Trainings' })),
  ]);
  const [gallery, setGallery] = useState<any[]>(fallbackGallery);
  const [news, setNews] = useState<any[]>(fallbackNews);
  const [documents, setDocuments] = useState<any[]>([
    {
      name: 'Curriculum Vitae (PDF)',
      fileUrl: '/documents/Prof_Manoj_Kumar_Curriculum_Vitae.pdf',
    },
    {
      name: 'Brief Profile (PDF)',
      fileUrl: '/documents/Prof_Manoj_Kumar_Brief_Profile.pdf',
    },
  ]);

  const loadData = useCallback(async () => {
    try {
      // 1. Load initial fast overview bundle
      const overview = await portfolioApi.getOverview();
      if (overview) {
        setIsBackendConnected(true);
        const s = overview.settings || {};
        if (overview.settings) {
          setSettings(overview.settings);
        }

        if (overview.profile) {
          // Merge dynamic profile with fallback contact structure if needed
          const p = overview.profile;
          let parsedMobile = fallbackProfile.contact?.mobilePhones || ['+91 9872203898', '+91 9478101102'];
          if (p.mobilePhones) {
            if (Array.isArray(p.mobilePhones) && p.mobilePhones.length > 0) {
              parsedMobile = p.mobilePhones;
            } else if (typeof p.mobilePhones === 'string' && p.mobilePhones.trim() !== '') {
              try {
                const parsed = JSON.parse(p.mobilePhones);
                if (Array.isArray(parsed) && parsed.length > 0) parsedMobile = parsed;
                else parsedMobile = p.mobilePhones.split(',').map((ph: string) => ph.trim()).filter(Boolean);
              } catch {
                parsedMobile = p.mobilePhones.split(',').map((ph: string) => ph.trim()).filter(Boolean);
              }
            }
          }

          setProfile({
            ...fallbackProfile,
            ...p,
            fullName: p.name || fallbackProfile.fullName,
            salutation: p.salutation || fallbackProfile.salutation,
            designation: p.designation || fallbackProfile.designation,
            institution: p.institution || fallbackProfile.institution,
            location: p.location || fallbackProfile.location,
            bioSummary: p.bioSummary || fallbackProfile.bioSummary,
            fullBio: Array.isArray(p.fullBio) && p.fullBio.length ? p.fullBio : fallbackProfile.fullBio,
            quote: p.quote || fallbackProfile.quote,
            tagline: p.tagline || fallbackProfile.tagline,
            specializations: Array.isArray(p.expertise) && p.expertise.length ? p.expertise : fallbackProfile.specializations,
            leadershipPillars: Array.isArray(p.leadershipPillars) && p.leadershipPillars.length ? p.leadershipPillars : fallbackProfile.leadershipPillars,
            headerPositions: Array.isArray(p.headerPositions) ? p.headerPositions : (p.header_positions || []),
            metrics: (() => {
              const rawMetrics = p.metrics || {};
              const dbCounts = overview.dbCounts || overview.liveMetrics || {};
              const useManual = rawMetrics.useManualStats !== false;
              return useManual
                ? {
                    ...fallbackProfile.metrics,
                    ...dbCounts,
                    ...rawMetrics,
                  }
                : {
                    ...fallbackProfile.metrics,
                    ...rawMetrics,
                    ...dbCounts,
                  };
            })(),
            contact: {
              ...fallbackProfile.contact,
              officeAddress: p.officeAddress || s.address || fallbackProfile.contact.officeAddress,
              residenceAddress: p.residenceAddress || fallbackProfile.contact.residenceAddress,
              officePhone: p.officePhone || s.phone || fallbackProfile.contact.officePhone,
              mobilePhones: parsedMobile,
              officialEmail: p.officialEmail || s.contactEmail || fallbackProfile.contact.officialEmail,
              personalEmail: p.personalEmail || fallbackProfile.contact.personalEmail,
              linkedIn: s.linkedin || p.linkedIn || fallbackProfile.contact.linkedIn,
              orcid: p.orcid || fallbackProfile.contact.orcid,
              scopus: p.scopus || fallbackProfile.contact.scopus,
              scholar: p.scholar || fallbackProfile.contact.scholar,
              twitter: s.x || p.twitter || fallbackProfile.contact.twitter,
              youtube: s.youtube || p.youtube || fallbackProfile.contact.youtube,
              website: p.website || fallbackProfile.contact.website,
            },
            photo: p.photo || fallbackProfile.photo || '/images/prof_manoj_kumar.jpg',
            headerPhoto: p.headerPhoto || fallbackProfile.headerPhoto || '/images/prof_manoj_kumar.jpg',
            sidebarPhoto: p.sidebarPhoto || fallbackProfile.sidebarPhoto || '/images/unnamed.webp',
            bioPhoto: p.bioPhoto || fallbackProfile.bioPhoto || '/images/iamge-2.webp',
          });
        }

        if (overview.positions && Array.isArray(overview.positions) && overview.positions.length) {
          setPositions(overview.positions);
        }

        if (overview.liveMetrics || overview.profile?.metrics) {
          const rawMetrics = overview.profile?.metrics || {};
          const dbCounts = overview.dbCounts || overview.liveMetrics || {};
          const useManual = rawMetrics.useManualStats !== false;
          const merged = useManual
            ? { ...fallbackProfile.metrics, ...dbCounts, ...rawMetrics }
            : { ...fallbackProfile.metrics, ...rawMetrics, ...dbCounts };
          setLiveMetrics(merged);
        }
      }

      // 2. Load all module collections in parallel
      const [
        posData,
        eduData,
        awData,
        patData,
        pubData,
        bkData,
        grData,
        supData,
        moData,
        afData,
        cfData,
        glData,
        nwData,
        dcData,
      ] = await Promise.all([
        portfolioApi.getPositions({ pageSize: '100' }),
        portfolioApi.getEducation(),
        portfolioApi.getAwards(),
        portfolioApi.getPatents(),
        portfolioApi.getPublications({ pageSize: '200' }),
        portfolioApi.getBooks(),
        portfolioApi.getGrants(),
        portfolioApi.getSupervision(),
        portfolioApi.getMous(),
        portfolioApi.getAffiliations(),
        portfolioApi.getConferences(),
        portfolioApi.getGallery(),
        portfolioApi.getNews(),
        portfolioApi.getDocuments(),
      ]);

      if (posData && Array.isArray(posData) && posData.length) setPositions(posData);
      if (eduData && Array.isArray(eduData) && eduData.length) setEducation(eduData);
      if (awData && Array.isArray(awData) && awData.length) setAwards(awData);
      if (patData && Array.isArray(patData) && patData.length) setPatents(patData);
      if (pubData && Array.isArray(pubData) && pubData.length) setPublications(pubData);
      if (bkData && Array.isArray(bkData) && bkData.length) {
        setBooks(bkData);
        setLiveMetrics((prev) => ({ ...prev, booksCount: bkData.length }));
      }
      if (grData && Array.isArray(grData) && grData.length) setGrants(grData);
      if (supData && Array.isArray(supData) && supData.length) setSupervision(supData);
      if (moData && Array.isArray(moData) && moData.length) setMous(moData);
      if (afData && Array.isArray(afData) && afData.length) setAffiliations(afData);
      if (cfData && Array.isArray(cfData) && cfData.length) setConferences(cfData);
      if (glData && Array.isArray(glData) && glData.length) setGallery(glData);
      if (nwData && Array.isArray(nwData) && nwData.length) setNews(nwData);
      if (dcData && Array.isArray(dcData) && dcData.length) setDocuments(dcData);
    } catch (err) {
      console.warn('Error loading dynamic portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Dynamically synchronize browser tab title and favicon with backend settings and profile photo
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (settings?.siteTitle) {
      document.title = settings.tagline
        ? `${settings.siteTitle} | ${settings.tagline}`
        : settings.siteTitle;
    }

    const dynamicFavicon = settings?.favicon || profile?.photo || '/favicon.svg';
    if (dynamicFavicon) {
      let mimeType = 'image/x-icon';
      const clean = dynamicFavicon.split('?')[0].toLowerCase();
      if (clean.endsWith('.svg')) mimeType = 'image/svg+xml';
      else if (clean.endsWith('.png')) mimeType = 'image/png';
      else if (clean.endsWith('.jpg') || clean.endsWith('.jpeg')) mimeType = 'image/jpeg';
      else if (clean.endsWith('.webp')) mimeType = 'image/webp';

      const existing = document.querySelectorAll(
        "link[rel='icon'], link[rel='shortcut icon'], link[rel='alternate icon']"
      );
      existing.forEach((el) => {
        try {
          el.remove();
        } catch (e) {
          el.parentNode?.removeChild(el);
        }
      });

      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.type = mimeType;
      newLink.href = dynamicFavicon;
      document.head.appendChild(newLink);

      const shortcutLink = document.createElement('link');
      shortcutLink.rel = 'shortcut icon';
      shortcutLink.type = mimeType;
      shortcutLink.href = dynamicFavicon;
      document.head.appendChild(shortcutLink);
    }
  }, [settings?.favicon, settings?.siteTitle, settings?.tagline, profile?.photo]);

  return (
    <PortfolioContext.Provider
      value={{
        isLoading,
        isBackendConnected,
        profile,
        settings,
        liveMetrics,
        positions,
        education,
        awards,
        patents,
        publications,
        books,
        grants,
        supervision,
        mous,
        affiliations,
        conferences,
        gallery,
        news,
        documents,
        resolveDocumentUrl,
        refreshData: loadData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export default PortfolioContext;
