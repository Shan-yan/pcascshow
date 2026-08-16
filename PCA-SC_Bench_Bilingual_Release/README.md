# PCA-SC Bench Research Atlas

A bilingual, static, source-aware academic presentation website for PCA-SC
Bench. Both English and Chinese versions implement six sections:

- Overview
- Dataset
- Models / Full Benchmark Results
- Methodology
- Evaluation Demo
- Paper & Citation

The implementation uses React, TypeScript and Vite. All visible benchmark data
is isolated in `src/data/`. Missing or conflicting source material is represented
explicitly as `[AUTHOR TO PROVIDE]` or `[AUTHOR TO VERIFY]`.

Use the `中文 / EN` control in the header to switch language. Routes are kept
separate (`#/models` and `#/zh/models`) so each language can be shared directly.

## Quick start

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The static output is written to `dist/`.

## Zero-install distributable

The delivery archive contains a prebuilt `site/` directory and launch scripts.
After extracting:

- Linux/macOS: run `./run-local.sh`
- Windows: double-click `run-local.bat`

The launcher serves the prebuilt site at `http://localhost:4173`. It requires
only Python 3, which is commonly available on Linux/macOS. On Windows,
`run-local.bat` tries `py -3`, then `python`.

The site has no runtime API, database, account system or external asset
dependency.

## Data provenance

- `src/data/benchmark.ts`: benchmark metadata, metric definitions, limitations
- `src/data/models.ts`: manuscript Table 1 formal model results and integrity note
- `src/data/samples.ts`: ten explicit sample placeholders
- `src/data/findings.ts`: evidence-linked findings
- `src/data/types.ts`: source-aware data model

`PCA-SC809.docx` is the current fact source. The website transcribes the
reported Table 1, Table 2 and Table 4 model metrics and the completed
questionnaire-based human-centered evaluation. `PAPER_FACT_LEDGER.md` records
canonical terminology and the remaining provenance constraints.

## Important interpretation constraints

- Table 1 values are displayed as Full Benchmark Results.
- The ten-position Demo is a separate explanatory interface and calculates no
  score without approved sample outputs.
- No single overall score or official total ranking is constructed.
- No hidden chain-of-thought is shown or inferred.
- Confidence intervals and statistical significance are not claimed.
- Table 1 and Table 3 Safety values are not merged because the source document
  flags a mismatch.
- The live example lab lets visitors select any of the six paper models and
  watch action/reason fields appear step by step. Because the paper contains no
  per-sample model outputs, these transcripts are explicitly labeled
  interface-only illustrations and are not attributed to the selected model.

## Accessibility

The site includes semantic landmarks, a skip link, keyboard-operable controls,
visible focus styling, text/table alternatives for charts, non-color status
labels, reduced-motion support, responsive layouts and mobile navigation.
