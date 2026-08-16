export type SourceStatus =
  | "paperConfirmed"
  | "paperInferred"
  | "authorRequired"
  | "authorVerify";

export interface SourceAwareValue<T> {
  value: T | null;
  status: SourceStatus;
  source?: string;
  note?: string;
}

export interface BenchmarkMetadata {
  shortName: SourceAwareValue<string>;
  fullName: SourceAwareValue<string>;
  sampleCount: SourceAwareValue<number>;
  environmentCount: SourceAwareValue<number>;
  imageResolution: SourceAwareValue<string>;
  actionCount: SourceAwareValue<number>;
  expertCount: SourceAwareValue<number>;
  modelCount: SourceAwareValue<number>;
}

export interface ModelResult {
  id: string;
  label: string;
  access: "Open" | "Closed";
  P: number;
  C: number;
  A: number;
  Safety: number;
  source: string;
}

export interface MetricDefinition {
  key: string;
  label: string;
  group: "Task Success" | "Safety" | "Chain Consistency";
  definition: string;
  range: string;
}

export interface SafetyCriticalAnchors {
  objectiveRiskSources: SourceAwareValue<string[]>;
  safetyGates: SourceAwareValue<string[]>;
  keyEnvironmentalPerceptions: SourceAwareValue<string[]>;
  riskMitigationReferences: SourceAwareValue<string[]>;
}

export interface DatasetSample {
  id: string;
  status: "authorRequired";
  task: null;
  actions: [];
  quadrant: null;
  anchors: null;
}

export interface ResearchFinding {
  title: string;
  evidence: string;
  evidenceType: string;
  target: string;
  status: SourceStatus;
}

export interface CitationData {
  title: SourceAwareValue<string>;
  authors: SourceAwareValue<string>;
  venue: SourceAwareValue<string>;
  abstract: SourceAwareValue<string>;
  bibtex: SourceAwareValue<string>;
  paperUrl: SourceAwareValue<string>;
  datasetUrl: SourceAwareValue<string>;
  codeUrl: SourceAwareValue<string>;
  license: SourceAwareValue<string>;
  contact: SourceAwareValue<string>;
}
