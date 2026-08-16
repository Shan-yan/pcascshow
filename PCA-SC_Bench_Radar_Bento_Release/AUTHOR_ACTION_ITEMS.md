# PCA-SC Bench — Author Action Items

This checklist contains every material item that must be supplied or verified
before public release. Do not replace placeholders with inferred values.

## Critical evidence and integrity

- [x] Add and read the current manuscript (`PCA-SC809.docx`).
- [x] Transcribe Table 1, Table 2, Table 4 and the reported human-study results.
- [ ] Resolve the Table 1 vs Table 3 Safety mismatch. The planning document
      reports, for example, GPT-5.2 as 0.604 in Table 1 versus 0.564 in the
      Table 3 Base condition, and Qwen3-VL-32B as 0.575 versus 0.477.
- [ ] Confirm whether Table 1 is the official Full Benchmark Result snapshot.
- [ ] Confirm the official Safety weight configuration and version.
- [ ] Confirm the formal English expansion of `HV`.
- [ ] Confirm the final wording of all four success–safety quadrant definitions.

## Publication record

- [ ] Final paper title
- [ ] Author names, order and affiliations
- [ ] Venue and publication/submission status
- [ ] Canonical paper URL and/or DOI
- [ ] Author-approved abstract
- [ ] Final BibTeX and preferred plain-text citation
- [ ] Contact and maintenance owner

## Dataset and release

- [ ] Dataset release URL and version
- [ ] Code repository URL
- [ ] Dataset, scene-image, code and website licenses
- [ ] 300 machine-readable sample records
- [ ] 300 approved PNG scene images and alt-text guidance
- [ ] Exact sample schema / JSON Schema
- [ ] Exact Safety-Critical Anchor field names
- [ ] Per-sample success–safety quadrant labels and quadrant counts
- [ ] Controlled risk taxonomy and per-sample risk labels
- [ ] Task taxonomy and per-sample task labels
- [ ] Safety-gate labels
- [ ] Difficulty definition and labels, if they are intended for release
- [ ] Dataset split policy or an explicit test-only statement
- [ ] Per-sample camera, lighting and crowd-condition labels, if intended

## Model evaluation

- [ ] Final model registry and author-approved display names
- [ ] Model inference dates
- [ ] Temperature, maximum tokens and prompt version
- [ ] Judge model, parser and judge-prompt versions
- [ ] Repetition count and any run-to-run statistics
- [ ] RA, RM and UF aggregate values for all six models
- [ ] Raw and gated PC, CA and PA aggregate values for all six models
- [ ] Per-sample model outputs and structured evaluation records
- [ ] Full error taxonomy and counts
- [ ] Confidence intervals or a confirmed statement that none are reported

## Ten-sample Evaluation Demo

- [ ] Select ten fixed sample IDs
- [ ] Provide the ten sample scene images, tasks and four actions
- [ ] Provide each reference action, reference reason and judge-only anchors
- [ ] Select the demonstrated model and exact version
- [ ] Provide actual, saved observable model outputs
- [ ] Provide parser records and parsing status
- [ ] Provide P, C, A, HV, RA, RM, UF, Safety, P_key_correct, PC, CA and PA
- [ ] Provide evidence fields, reason codes and error categories
- [ ] Provide human-review status and review notes
- [ ] Confirm demo configuration, evaluation date and Themis version
- [ ] Review the required disclaimer in context

Do not provide or display hidden model chain-of-thought. The website needs only
observable output and concise scoring evidence.

## Themis Memory

- [ ] Version used in the reported experiment
- [ ] Memory entry count and type distribution
- [ ] Retrieval method and similarity fields
- [ ] Frozen-build manifest / versioning policy
- [ ] Repeat-judging variance, agreement, consistency or stability statistics
- [ ] Clarify what Figure 6 establishes if it reports score shifts rather than
      stability statistics

## Human-grounded validation

- [x] Final participant count, case count and participant×case observations
- [x] Eligibility and exclusion counts
- [ ] Recruitment and compensation details
- [ ] Ethics approval, exemption or committee identifier
- [ ] Missing-data and withdrawal procedures
- [x] Reported correlations, ICC values, missing-response rates and descriptive results
- [ ] Confirm whether the current study should be described consistently as
      “human-centered evaluation” rather than criterion validation

## Final release QA

- [ ] Replace every `[AUTHOR TO PROVIDE]` after evidence is supplied
- [ ] Resolve or retain every `[AUTHOR TO VERIFY]`
- [ ] Confirm no Demo Score is presented as an official benchmark result
- [ ] Confirm no cross-metric overall score or overall ranking has been added
- [ ] Confirm no model difference is called significant without a test
- [ ] Confirm every chart source, range, sample basis and version
- [ ] Confirm mobile, keyboard and screen-reader review
- [ ] Confirm hosting and privacy statement if any future Demo records user data
- [ ] Replace the three interface-only demo scenarios with author-approved
      sample IDs and saved model outputs when these records are available
