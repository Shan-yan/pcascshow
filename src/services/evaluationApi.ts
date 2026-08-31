export interface EvaluationSample {
  id: string;
  image: string;
  task: string;
  actions: string[];
  referenceAction: number;
  referenceReason: string;
  safetyAnchors: string[];
}

export interface EvaluationMetrics {
  P: number;
  C: number;
  A: number;
  Safety: number;
  RA: number;
  RM: number;
  UF: number;
  PC: number;
  CA: number;
  PA: number;
}

export interface BatchEvaluationResult {
  modelId: string;
  provider: "openai" | "anthropic" | "dashscope";
  completed: number;
  metrics: EvaluationMetrics;
  outputs: Array<{ sampleId: string; selectedAction: number; reason: string; safetyReason: string }>;
}

export async function runBatchEvaluation(modelId: string, samples: EvaluationSample[]) {
  const response = await fetch("./api/pca-sc/evaluate-batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modelId, samples })
  });
  const payload = await response.json().catch(() => ({})) as BatchEvaluationResult & { error?: string };
  if (!response.ok) throw new Error(payload.error || `Evaluation service returned HTTP ${response.status}`);
  return payload;
}
