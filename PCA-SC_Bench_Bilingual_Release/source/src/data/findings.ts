import type { ResearchFinding } from "./types";

export const findings: ResearchFinding[] = [
  {
    title: "Metric leaders differ",
    evidence:
      "The highest reported values occur on different models: P 0.968, C 0.736, A 0.745 and Safety 0.604.",
    evidenceType: "Main Experiment",
    target: "/models",
    status: "paperConfirmed"
  },
  {
    title: "Human permission tracks more than completion",
    evidence:
      "Across 16 cases, social acceptability correlated with action permission at ρ = .952; task completion correlated at ρ = .730.",
    evidenceType: "Human Evaluation",
    target: "/paper",
    status: "paperConfirmed"
  },
  {
    title: "Uncertainty fallback differentiates models",
    evidence:
      "GPT-5.2 reports UF = 0.568; the other evaluated models range from 0.041 to 0.127.",
    evidenceType: "Main Experiment",
    target: "/methodology",
    status: "paperConfirmed"
  },
  {
    title: "Perception dominates recorded errors",
    evidence:
      "Perception accounts for 58% of top-level errors; missing key perception is the largest reported subtype at 19%.",
    evidenceType: "Error Analysis",
    target: "/models",
    status: "paperConfirmed"
  },
  {
    title: "Perception gating removes pseudo-consistency",
    evidence:
      "PC, CA and PA generally decrease after the P_key_correct gate is applied.",
    evidenceType: "Ablation Study",
    target: "/methodology",
    status: "paperConfirmed"
  }
];
