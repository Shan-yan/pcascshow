import type { DatasetSample } from "./types";

export const samples: DatasetSample[] = Array.from({ length: 10 }, (_, index) => ({
  id: `Sample ${String(index + 1).padStart(2, "0")}`,
  status: "authorRequired",
  task: null,
  actions: [],
  quadrant: null,
  anchors: null
}));

export const taskCategories = {
  status: "authorRequired" as const,
  note: "The formal task taxonomy and per-sample labels were not supplied."
};

export const riskTypes = {
  status: "authorRequired" as const,
  note: "The controlled risk vocabulary and per-sample labels were not supplied."
};
