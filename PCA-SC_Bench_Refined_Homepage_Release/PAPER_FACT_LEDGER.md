# PCA-SC809 Paper Fact and Terminology Ledger

Source: `PCA-SC809.docx`, extracted on 2026-08-11 for the website revision.

## Canonical terminology

| Canonical term | First-use definition | Chinese interface term | Decision |
|---|---|---|---|
| PCA-SC Bench | Perception–Cognition–Action for Safety and Consistency Bench | PCA-SC 基准 | Keep the full name at first use. |
| PCA-SC Eval | Automated evaluation protocol | PCA-SC 自动评测协议 | Keep as a proper name. |
| Themis Memory | Versioned precedent memory for LLM-as-a-Judge | Themis 判例记忆 | Do not describe it as changing the benchmark or the tested model. |
| P / C / A | Perception / Cognition / Action | 感知 / 认知 / 行动 | Binary per instance; aggregate in Table 1. |
| HV | Hard violation indicator / safety red-line trigger | 安全红线违反 | The paper uses HV but does not give a stable expanded name. |
| RA / RM / UF | Risk Awareness / Risk Mitigation / Uncertainty Fallback | 风险识别 / 风险缓解 / 不确定性兜底 | Preserve abbreviations across both languages. |
| PC / CA / PA | Perception–Cognition / Cognition–Action / Perception–Action consistency | 感知–认知 / 认知–行动 / 感知–行动一致性 | Distinguish raw and perception-gated values. |
| action permission | Human willingness to allow the robot to act | 行动许可 | Human-study construct; not a model metric. |
| reason–action consistency | Human judgment that the displayed reason supports the action | 理由–行动一致性 | Not hidden chain-of-thought faithfulness. |

## Confirmed website facts

- 300 standardized 1920×1080 PNG instances from an Isaac Sim station environment.
- Four mutually exclusive high-level actions per instance; five human experts.
- Six evaluated MLLMs, with all Table 1, Table 2 and Table 4 values transcribed into `src/data/models.ts`.
- Human evaluation: 51 responses received, 49 eligible participants, 16 cases and 784 participant×case observations.
- Human study correlations are case-level (`n = 16`), not 784 independent samples.
- Ethics institution and approval/exemption number remain missing in the manuscript.
- Table 1 Safety and Table 3 Base remain numerically inconsistent and must not be merged.
- The manuscript provides no sample-level tasks, four-action records, or actual per-model outputs.

## Demo provenance rule

The three UI scenarios in `src/data/samples.ts` are interface-only illustrations
constructed from risk and mitigation categories explicitly named in the paper.
They are not PCA-SC dataset records and their displayed transcripts are not
claimed as outputs of GPT, Claude, or Qwen models. Formal sample replay must
replace them with author-supplied records before public benchmark reporting.
