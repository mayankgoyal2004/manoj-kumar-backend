import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MODULES, recordTitle } from "@/lib/data/modules";
import api, { getAuthToken } from "@/api/backendClient";

const DataContext = createContext(null);

let sequence = 5000;
const nextId = (key) => `${key}_${++sequence}`;

function buildInitial() {
  const state = {};
  Object.keys(MODULES).forEach((key) => {
    state[key] = [];
  });
  state.activity = [];
  return state;
}

export function DataProvider({ children }) {
  const [collections, setCollections] = useState(buildInitial);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loadingModules, setLoadingModules] = useState({});
  const [loadedKeys, setLoadedKeys] = useState(new Set());
  const loadedModules = useRef(new Set());
  const [actor, setActor] = useState({ name: "Prof. (Dr.) Manoj Kumar", email: "vc@davuniversity.org" });

  // On initial auth load: ONLY fetch single lightweight dashboard stats/activity API
  useEffect(() => {
    let active = true;
    async function loadOverview() {
      const token = getAuthToken();
      if (!token) return;

      try {
        const stats = await api.stats.getDashboardStats();
        if (!active || !stats) return;

        setDashboardStats(stats);

        if (stats.recentActivity && Array.isArray(stats.recentActivity) && stats.recentActivity.length > 0) {
          setCollections((prev) => ({
            ...prev,
            activity: stats.recentActivity.map((log) => ({
              id: log.id,
              actor: log.actor || "System",
              action: log.action || "updated",
              module: log.module || "System",
              target: log.target || "",
              time: log.time || log.createdAt || new Date().toISOString(),
              ip: log.ip || "10.24.6.18",
              kind: log.kind || "system",
            })),
          }));
        }
      } catch (err) {
        console.warn("Overview stats fetch failed:", err);
      }
    }

    loadOverview();
    return () => {
      active = false;
    };
  }, []);

function normalizeLoadedItem(item) {
  if (!item || typeof item !== 'object') return item;
  return {
    ...item,
    // Positions & Grants
    start_year: item.start_year ?? item.startYear ?? null,
    end_year: item.end_year ?? item.endYear ?? null,
    startYear: item.startYear ?? item.start_year ?? null,
    endYear: item.endYear ?? item.end_year ?? null,

    // Patents
    patent_number: item.patent_number ?? item.patentNumber ?? null,
    patentNumber: item.patentNumber ?? item.patent_number ?? null,
    filing_date: item.filing_date ?? item.filingDate ?? null,
    filingDate: item.filingDate ?? item.filing_date ?? null,
    grant_date: item.grant_date ?? item.grantDate ?? null,
    grantDate: item.grantDate ?? item.grant_date ?? null,

    // Books
    co_authors: item.co_authors ?? item.coAuthors ?? null,
    coAuthors: item.coAuthors ?? item.co_authors ?? null,

    // Supervision
    enrolled_year: item.enrolled_year ?? item.enrolledYear ?? null,
    enrolledYear: item.enrolledYear ?? item.enrolled_year ?? null,
    co_supervisor: item.co_supervisor ?? item.coSupervisor ?? null,
    coSupervisor: item.coSupervisor ?? item.co_supervisor ?? null,

    // MoUs
    signed_date: item.signed_date ?? item.signedDate ?? null,
    signedDate: item.signedDate ?? item.signed_date ?? null,

    updated_date: item.updatedAt || item.updated_date || new Date().toISOString(),
  };
}

  // Fetch individual module data on-demand (lazy load when navigated to)
  const fetchModule = useCallback(async (key, force = false) => {
    const token = getAuthToken();
    if (!token || !key || !MODULES[key]) return;
    if (!force && loadedModules.current.has(key)) return;

    setLoadingModules((prev) => ({ ...prev, [key]: true }));
    try {
      const res = await api.modules.getAll(key, { pageSize: 100 });
      if (res && Array.isArray(res)) {
        setCollections((prev) => ({
          ...prev,
          [key]: res.map(normalizeLoadedItem),
        }));
      } else {
        setCollections((prev) => ({
          ...prev,
          [key]: [],
        }));
      }
      loadedModules.current.add(key);
      setLoadedKeys((prev) => new Set([...prev, key]));
    } catch (err) {
      console.warn(`Failed to lazy load module "${key}":`, err);
      setCollections((prev) => ({
        ...prev,
        [key]: prev[key] || [],
      }));
      loadedModules.current.add(key);
      setLoadedKeys((prev) => new Set([...prev, key]));
    } finally {
      setLoadingModules((prev) => ({ ...prev, [key]: false }));
    }
  }, []);

  const value = useMemo(() => {
    const logActivity = (action, moduleKey, target, kind) => {
      setCollections((prev) => ({
        ...prev,
        activity: [
          {
            id: nextId("activity"),
            actor: actor.name,
            action,
            module: MODULES[moduleKey]?.title || moduleKey,
            target,
            time: new Date().toISOString(),
            ip: "10.24.6.18",
            kind,
          },
          ...prev.activity,
        ],
      }));
    };

    const create = (key, data) => {
      const now = new Date().toISOString();
      const normalized = normalizeLoadedItem(data);
      const record = { id: nextId(key), ...normalized, updated_date: now };
      setCollections((prev) => ({ ...prev, [key]: [record, ...prev[key]] }));
      logActivity("created", key, recordTitle(key, record), "create");

      // Asynchronously persist to backend PostgreSQL
      api.modules.create(key, normalized).catch((err) => {
        console.warn(`Backend persist failed for ${key}:`, err);
      });

      return record;
    };

    const update = (key, id, patch) => {
      const now = new Date().toISOString();
      const normalizedPatch = normalizeLoadedItem(patch);
      let title = "";
      setCollections((prev) => ({
        ...prev,
        [key]: prev[key].map((row) => {
          if (row.id !== id) return row;
          const next = { ...row, ...normalizedPatch, updated_date: now };
          title = recordTitle(key, next);
          return next;
        }),
      }));
      logActivity("updated", key, title, "update");

      // Asynchronously update in backend PostgreSQL
      api.modules.update(key, id, normalizedPatch).catch((err) => {
        console.warn(`Backend update failed for ${key}:`, err);
      });
    };

    const remove = (key, id) => {
      let title = "";
      setCollections((prev) => ({
        ...prev,
        [key]: prev[key].map((row) => {
          if (row.id === id) title = recordTitle(key, row);
          return row;
        }).filter((row) => row.id !== id),
      }));
      logActivity("deleted", key, title, "delete");

      // Asynchronously remove in backend PostgreSQL
      api.modules.remove(key, id).catch((err) => {
        console.warn(`Backend delete failed for ${key}:`, err);
      });
    };

    return {
      collections,
      actor,
      setActor,
      create,
      update,
      remove,
      logActivity,
      dashboardStats,
      fetchModule,
      loadingModules,
      loadedKeys,
    };
  }, [collections, actor, dashboardStats, fetchModule, loadingModules, loadedKeys]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used inside DataProvider");
  return context;
}

export const PROFILE = {
  name: "Prof. (Dr.) Manoj Kumar",
  honorific: "Vice-Chancellor",
  institution: "DAV University, Jalandhar",
  email: "vc@davuniversity.org",
  phone: "+91 181 662 8000",
  office: "Office of the Vice-Chancellor, Administrative Block",
  city: "Jalandhar, Punjab 144012, India",
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=75",
  bio: "Prof. (Dr.) Manoj Kumar serves as Vice-Chancellor of DAV University, Jalandhar, where he leads academic strategy, research governance and institutional quality assurance across nine schools. His research spans machine learning systems, computational intelligence and technology for sustainable agriculture, with more than 120 indexed publications and six patents to his name.",
  expertise: ["Machine Learning Systems", "Computational Intelligence", "Precision Agriculture", "Higher Education Governance", "Data Ethics"],
  orcid: "0000-0002-4471-8823",
  scopus: "57204931882",
  scholar: "manoj-kumar-dav",
  linkedin: "in/manojkumar-vc",
  website: "https://davuniversity.org",
};