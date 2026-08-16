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
    RA: 0.518,
    RM: 0.471,
    UF: 0.074,
    PC_raw: 0.697,
    CA_raw: 0.792,
    PA_raw: 0.794,
    PC: 0.504,
    CA: 0.551,
    PA: 0.556,
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
    RA: 0.535,
    RM: 0.526,
    UF: 0.127,
    PC_raw: 0.636,
    CA_raw: 0.801,
    PA_raw: 0.799,
    PC: 0.401,
    CA: 0.487,
    PA: 0.486,
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
    RA: 0.6,
    RM: 0.56,
    UF: 0.086,
    PC_raw: 0.712,
    CA_raw: 0.792,
    PA_raw: 0.802,
    PC: 0.529,
    CA: 0.573,
    PA: 0.581,
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
    RA: 0.517,
    RM: 0.452,
    UF: 0.041,
    PC_raw: 0.741,
    CA_raw: 0.825,
    PA_raw: 0.835,
    PC: 0.541,
    CA: 0.579,
    PA: 0.589,
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
    RA: 0.505,
    RM: 0.457,
    UF: 0.041,
    PC_raw: 0.713,
    CA_raw: 0.795,
    PA_raw: 0.784,
    PC: 0.481,
    CA: 0.504,
    PA: 0.502,
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
    RA: 0.606,
    RM: 0.537,
    UF: 0.568,
    PC_raw: 0.711,
    CA_raw: 0.825,
    PA_raw: 0.83,
    PC: 0.494,
    CA: 0.551,
    PA: 0.557,
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

export const safetyWeightResults = [
  { id: "claude-sonnet-4-5-20250929", Base: 0.406, Balanced: 0.354, RAHeavy: 0.415, RMHeavy: 0.401, UFHeavy: 0.282 },
  { id: "gpt-5-mini", Base: 0.449, Balanced: 0.396, RAHeavy: 0.451, RMHeavy: 0.448, UFHeavy: 0.328 },
  { id: "qwen3-vl-32b-instruct", Base: 0.477, Balanced: 0.415, RAHeavy: 0.485, RMHeavy: 0.473, UFHeavy: 0.331 },
  { id: "gpt-4o-2024-11-20", Base: 0.389, Balanced: 0.337, RAHeavy: 0.402, RMHeavy: 0.383, UFHeavy: 0.26 },
  { id: "qwen3-vl-8b-instruct", Base: 0.388, Balanced: 0.334, RAHeavy: 0.398, RMHeavy: 0.383, UFHeavy: 0.259 },
  { id: "gpt-5.2-2025-12-11", Base: 0.564, Balanced: 0.57, RAHeavy: 0.578, RMHeavy: 0.557, UFHeavy: 0.566 }
];

export const humanEvaluation = {
  eligibleParticipants: 49,
  cases: 16,
  observations: 784,
  conceptUnderstanding: { mean: 6.02, sd: 1.23 },
  clarity: { mean: 4.61, sd: 1.53 },
  fatigue: { mean: 4.73, sd: 1.44 },
  correlations: [
    { pair: "Perceived safety ↔ action permission", rho: 0.861, p: "< .001", ci: "[.572, .972]" },
    { pair: "Task completion ↔ action permission", rho: 0.73, p: ".001", ci: "[.288, .934]" },
    { pair: "Social acceptability ↔ action permission", rho: 0.952, p: "< .001", ci: "[.795, 1.000]" },
    { pair: "Reason–action consistency ↔ action permission", rho: 0.948, p: "< .001", ci: "[.732, 1.000]" },
    { pair: "Perceived safety ↔ stop intention", rho: -0.799, p: "< .001", ci: "[-.957, -.467]" }
  ]
};
