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

    const create = async (key, data) => {
      const now = new Date().toISOString();
      const normalized = normalizeLoadedItem(data);
      try {
        const res = await api.modules.create(key, normalized);
        const serverRecord = res?.data || res;
        const record = { id: serverRecord?.id || nextId(key), ...normalized, ...serverRecord, updated_date: now };
        setCollections((prev) => ({
          ...prev,
          [key]: [record, ...(prev[key] || []).filter((r) => r.id !== record.id)],
        }));
        logActivity("created", key, recordTitle(key, record), "create");
        return record;
      } catch (err) {
        console.error(`Backend create failed for ${key}:`, err);
        throw err;
      }
    };

    const update = async (key, id, patch) => {
      const now = new Date().toISOString();
      const normalizedPatch = normalizeLoadedItem(patch);
      try {
        const res = await api.modules.update(key, id, normalizedPatch);
        const serverRecord = res?.data || res;
        let title = "";
        setCollections((prev) => ({
          ...prev,
          [key]: (prev[key] || []).map((row) => {
            if (row.id !== id) return row;
            const next = { ...row, ...normalizedPatch, ...serverRecord, updated_date: now };
            title = recordTitle(key, next);
            return next;
          }),
        }));
        logActivity("updated", key, title, "update");
        return serverRecord;
      } catch (err) {
        console.error(`Backend update failed for ${key}:`, err);
        throw err;
      }
    };

    const remove = async (key, id) => {
      try {
        await api.modules.remove(key, id);
        let title = "";
        setCollections((prev) => ({
          ...prev,
          [key]: (prev[key] || []).filter((row) => {
            if (row.id === id) title = recordTitle(key, row);
            return row.id !== id;
          }),
        }));
        logActivity("deleted", key, title, "delete");
      } catch (err) {
        console.error(`Backend delete failed for ${key}:`, err);
        throw err;
      }
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
  email: "drmanojkumarindia@gmail.com",
  personalEmail: "drmanojkumarindia@gmail.com",
  phone: "+91-181-2708844",
  directPhone: "+91 9872203898, +91 9478101102",
  office: "Office of the Vice-Chancellor, DAV University, Sarmastpur, Jalandhar - Pathankot National Highway (NH 44), Jalandhar, Punjab (India) - 144012",
  residenceAddress: "251, Lajpat Nagar, Jalandhar, Punjab (India) - 144001",
  city: "Jalandhar, Punjab, India",
  photo: "/images/prof_manoj_kumar.jpg",
  bio: "Prof. (Dr.) Manoj Kumar is an eminent academician, administrator, and researcher with over 35 years of distinguished experience in engineering education, photonics & optical wireless communications research, and university governance. Currently serving as the Vice-Chancellor of DAV University, Jalandhar, he also serves as Dean's Visiting Scholar at the University of Memphis School of Public Health (USA), President of Jalandhar Management Association (AIMA), and Honorary Colonel Commandant in the National Cadet Corps (NCC).",
  expertise: ["Photonics & Optical Wireless Communications", "Visible Light Communication (VLC)", "Free Space Optics (FSO)", "Higher Education Governance", "Strategic Leadership"],
  orcid: "0000-0002-4471-8823",
  scopus: "57204931882",
  scholar: "manoj-kumar-dav",
  linkedin: "https://in.linkedin.com/in/dr-manoj-kumar-56183928",
  website: "https://www.davuniversity.org",
};