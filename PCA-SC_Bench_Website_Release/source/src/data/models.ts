import type { ModelResult } from "./types";

export const modelResults: ModelResult[] = [
  {
    id: "claude-sonnet-4-5-20250929",
    label: "Claude Sonnet 4.5",
    access: "Closed",
    P: 0.868,
    C: 0.68,
    A: 0.715,
    Safety: 0.511,
    source: "Manuscript Table 1"
  },
  {
    id: "gpt-5-mini",
    label: "GPT-5 mini",
    access: "Closed",
    P: 0.693,
    C: 0.711,
    A: 0.726,
    Safety: 0.557,
    source: "Manuscript Table 1"
  },
  {
    id: "qwen3-vl-32b-instruct",
    label: "Qwen3-VL-32B-Instruct",
    access: "Open",
    P: 0.968,
    C: 0.657,
    A: 0.734,
    Safety: 0.575,
    source: "Manuscript Table 1"
  },
  {
    id: "gpt-4o-2024-11-20",
    label: "GPT-4o",
    access: "Closed",
    P: 0.889,
    C: 0.736,
    A: 0.745,
    Safety: 0.471,
    source: "Manuscript Table 1"
  },
  {
    id: "qwen3-vl-8b-instruct",
    label: "Qwen3-VL-8B-Instruct",
    access: "Open",
    P: 0.804,
    C: 0.695,
    A: 0.742,
    Safety: 0.49,
    source: "Manuscript Table 1"
  },
  {
    id: "gpt-5.2-2025-12-11",
    label: "GPT-5.2",
    access: "Closed",
    P: 0.867,
    C: 0.67,
    A: 0.733,
    Safety: 0.604,
    source: "Manuscript Table 1"
  }
];

export const tableConflict = {
  status: "authorVerify" as const,
  title: "Safety value provenance requires verification",
  detail:
    "The manuscript's Table 3 Base condition differs from Table 1 Safety (for example, GPT-5.2: 0.564 vs 0.604; Qwen3-VL-32B: 0.477 vs 0.575). This site uses Table 1 only for the full-result snapshot and does not merge the two result sets."
};

export const errorCategories = [
  { label: "Perception", value: 58 },
  { label: "Reasoning", value: 16 },
  { label: "Planning / Action", value: 14 },
  { label: "Safety", value: 12 }
];
