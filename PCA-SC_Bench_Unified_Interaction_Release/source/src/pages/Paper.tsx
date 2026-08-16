import { useState } from "react";
import { citation } from "../data/benchmark";
import { humanEvaluation } from "../data/models";
import { AcademicBadge, MissingData, PageIntro, SectionHeading, SourceNote } from "../components/UI";
import { Icon } from "../components/Icons";

const resources = [
  ["Paper PDF", "Canonical PDF or DOI", "paper"],
  ["Dataset", "Release URL and version", "dataset"],
  ["Code repository", "Public source repository", "code"],
  ["License", "Dataset, image and website terms", "license"],
  ["Contact", "Maintenance owner and email", "contact"]
];

export function Paper() {
  const [copyState, setCopyState] = useState("Copy BibTeX");

  const copyCitation = async () => {
    if (!citation.bibtex.value) {
      setCopyState("Citation not provided");
      window.setTimeout(() => setCopyState("Copy BibTeX"), 1800);
      return;
    }
    try {
      await navigator.clipboard.writeText(citation.bibtex.value);
      setCopyState("Copied");
    } catch {
      setCopyState("Select text to copy");
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="Paper & Citation"
        title="Research record and reusable citation"
        lead="This page intentionally distinguishes manuscript-confirmed benchmark facts from publication metadata that the authors must finalize before release."
        badges={
          <>
            <AcademicBadge tone="warning">Publication metadata pending</AcademicBadge>
            <AcademicBadge>Source-aware fields</AcademicBadge>
          </>
        }
      />

      <section className="section section--compact">
        <div className="container paper-layout">
          <article className="paper-record">
            <div className="paper-record__mark"><Icon name="file" size={34} /></div>
            <div>
              <p className="eyebrow">Final paper title</p>
              <h2>[AUTHOR TO PROVIDE]</h2>
              <dl>
                <div><dt>Authors</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
                <div><dt>Affiliations</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
                <div><dt>Venue</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
                <div><dt>Status</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
                <div><dt>DOI / URL</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
              </dl>
            </div>
          </article>
          <aside className="paper-scope">
            <p className="eyebrow">Confirmed research identity</p>
            <h3>PCA-SC Bench</h3>
            <p>Perception–Cognition–Action for Safety and Consistency Bench</p>
            <ul>
              <li><Icon name="check" />300 standardized instances</li>
              <li><Icon name="check" />6 evaluated MLLMs</li>
              <li><Icon name="check" />Task success, safety and chain consistency</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container reading-column">
          <SectionHeading eyebrow="01 · Abstract" title="Manuscript abstract available in Chinese" />
          <p className="paper-abstract-zh" lang="zh-CN">
            多模态大语言模型驱动的具身智能体已逐渐走向公共空间服务，但人员密集、规则明确的公共环境仍缺乏同时关注任务达成、安全表现与人类接受判断的系统评测。PCA-SC Bench 包含 300 条车站候车大厅标准化样本，通过 PCA-SC Eval 分析任务成功、安全表现与决策链路一致性，并通过 49 名合格参与者对 16 个案例的 784 次评价补充行动许可和人工干预视角。
          </p>
          <MissingData detail="The manuscript does not contain an author-approved English abstract. The full Chinese abstract remains the publication source." />
          <SourceNote source="PCA-SC809 manuscript abstract" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="02 · Citation"
            title="Citation-ready when final metadata is available"
            description="No authors, DOI, venue or publication status are inferred."
          />
          <div className="citation-block">
            <div className="citation-block__head">
              <div>
                <AcademicBadge tone="warning">[AUTHOR TO PROVIDE]</AcademicBadge>
                <h3>BibTeX</h3>
              </div>
              <button className="button button--secondary" type="button" onClick={copyCitation}>
                <Icon name="copy" />{copyState}
              </button>
            </div>
            <pre tabIndex={0}>{`@article{AUTHOR_TO_PROVIDE,
  title   = {[AUTHOR TO PROVIDE]},
  author  = {[AUTHOR TO PROVIDE]},
  journal = {[AUTHOR TO PROVIDE]},
  year    = {[AUTHOR TO PROVIDE]},
  url     = {[AUTHOR TO PROVIDE]}
}`}</pre>
            <p>This block is a labeled template, not a valid citation record.</p>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHeading
            eyebrow="03 · Resources"
            title="Release links and stewardship"
            description="Unavailable resources are status labels rather than non-functional links."
          />
          <div className="resource-list">
            {resources.map(([title, description]) => (
              <article key={title}>
                <Icon name={title === "Dataset" ? "database" : title === "Paper PDF" ? "file" : "external"} size={24} />
                <div><h3>{title}</h3><p>{description}</p></div>
                <AcademicBadge tone="warning">[AUTHOR TO PROVIDE]</AcademicBadge>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="04 · Human-grounded validation"
            title="Completed questionnaire-based human-centered evaluation"
            description="The final manuscript reports an online study with public-space users. It is a complementary human-centered analysis, not criterion validation of PCA-SC automated metrics."
          />
          <div className="protocol-grid">
            <div><strong>{humanEvaluation.eligibleParticipants}</strong><span>eligible participants</span></div>
            <div><strong>{humanEvaluation.cases}</strong><span>public-space decision cases</span></div>
            <div><strong>{humanEvaluation.observations}</strong><span>participant × case observations</span></div>
            <MissingData detail="Ethics approval or exemption institution and identifier remain missing in the manuscript." />
          </div>
          <div className="paper-figure">
            <img src="./paper-assets/human-evaluation.png" alt="Human evaluation results across 16 public-space cases, including mean ratings and task-completion and stop-intention proportions." />
            <p>Paper Fig. 7 · Case-level human evaluation results. Scale ratings range from 1 to 7.</p>
          </div>
          <SourceNote source="PCA-SC809 §5.1.4 and §5.2.5 · 49 eligible participants, 16 cases, 784 observations" />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container next-step">
          <div><p className="eyebrow">Return to evidence</p><h2>Inspect the formal multi-metric model results</h2></div>
          <a className="button button--primary" href="#/models">Full Benchmark Results <Icon name="arrow" /></a>
        </div>
      </section>
    </>
  );
}
