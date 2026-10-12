import React, { createContext, useContext, useMemo, useState } from "react";
import { MODULES, recordTitle } from "@/lib/data/modules";
import { SEED, SEED_ACTIVITY } from "@/lib/data/seed";

const DataContext = createContext(null);

let sequence = 5000;
const nextId = (key) => `${key}_${++sequence}`;

function buildInitial() {
  const state = {};
  Object.keys(MODULES).forEach((key) => {
    state[key] = (SEED[key] || []).map((row, index) => ({
      id: `${key}_${index + 1}`,
      updated_date: row.updated_date || new Date(Date.UTC(2026, 8, 30)).toISOString(),
      ...row,
    }));
  });
  state.activity = SEED_ACTIVITY.map((row, index) => ({
    id: `activity_${index + 1}`,
    moduleKey: null,
    ...row,
  }));
  return state;
}

export function DataProvider({ children }) {
  const [collections, setCollections] = useState(buildInitial);
  const [actor, setActor] = useState({ name: "Prof. (Dr.) Manoj Kumar", email: "vc@davuniversity.org" });

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
      const record = { id: nextId(key), updated_date: now, ...data };
      setCollections((prev) => ({ ...prev, [key]: [record, ...prev[key]] }));
      logActivity("created", key, recordTitle(key, record), "create");
      return record;
    };

    const update = (key, id, patch) => {
      const now = new Date().toISOString();
      let title = "";
      setCollections((prev) => ({
        ...prev,
        [key]: prev[key].map((row) => {
          if (row.id !== id) return row;
          const next = { ...row, ...patch, updated_date: now };
          title = recordTitle(key, next);
          return next;
        }),
      }));
      logActivity("updated", key, title, "update");
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
    };

    return { collections, actor, setActor, create, update, remove, logActivity };
  }, [collections, actor]);

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