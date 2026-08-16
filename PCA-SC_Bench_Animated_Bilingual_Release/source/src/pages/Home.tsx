import { findings } from "../data/findings";
import { benchmark, limitations } from "../data/benchmark";
import { AcademicBadge, ArrowLink, SectionHeading, SourceNote } from "../components/UI";
import { Icon } from "../components/Icons";
import { EvolutionFlow, OrbitExplorer } from "../components/LandingExperience";

const glance = [
  { value: benchmark.sampleCount.value, label: "standardized test instances", note: "Static station-scene decisions" },
  { value: benchmark.actionCount.value, label: "candidate actions per instance", note: "Mutually exclusive high-level choices" },
  { value: benchmark.expertCount.value, label: "human experts", note: "Manual design, annotation and review" },
  { value: benchmark.modelCount.value, label: "evaluated MLLMs", note: "Open and closed models" },
  { value: "3", label: "evaluation layers", note: "Task success, safety and consistency" },
  { value: "1", label: "representative environment", note: "A simulated station waiting hall" }
];

const quadrants = [
  {
    key: "successful-unsafe",
    title: "Successful but Unsafe",
    status: "Critical distinction",
    description: "The task is completed through an action that violates or overlooks safety constraints."
  },
  {
    key: "successful-safe",
    title: "Successful and Safe",
    status: "Target outcome",
    description: "The task is completed while respecting public-space safety constraints."
  },
  {
    key: "unsuccessful-unsafe",
    title: "Unsuccessful and Unsafe",
    status: "Dual failure",
    description: "The action neither completes the task nor preserves public-space safety."
  },
  {
    key: "unsuccessful-safe",
    title: "Unsuccessful but Safe",
    status: "Safe non-completion",
    description: "The task is not completed, but the action avoids an unsafe response."
  }
];

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <div className="hero__meta">
              <AcademicBadge tone="blue">Academic benchmark</AcademicBadge>
              <span>Static · Simulated · High-level decisions</span>
            </div>
            <h1>PCA-SC Bench</h1>
            <p className="hero__full-name" lang="zh-CN">面向安全与一致性的感知–认知–行动评测基准</p>
            <p className="hero__acronym" aria-label="P means Perception, C means Cognition, A means Action, S means Safety, and C means Consistency">
              <span><b>P</b> · Perception</span>
              <span><b>C</b> · Cognition</span>
              <span><b>A</b> · Action</span>
              <span><b>S</b> · Safety</span>
              <span><b>C</b> · Consistency</span>
            </p>
            <p className="hero__position">
              A multimodal benchmark for safe and consistent high-level embodied
              decisions in public spaces.
            </p>
            <p className="hero__description">
              PCA-SC Bench evaluates high-level decisions made by multimodal
              embodied agents in simulated public-space scenarios. Its 300
              manually designed station-hall instances report task success,
              public-space safety and decision-chain consistency as distinct
              evaluation layers.
            </p>
            <div className="button-row">
              <a className="button button--primary" href="#/paper">
                <Icon name="file" /> Paper
              </a>
              <a className="button button--secondary" href="#/dataset">
                Explore Dataset
              </a>
              <a className="button button--text" href="#/models">
                Compare Models <Icon name="arrow" />
              </a>
            </div>
            <div className="hero__minor-links">
              <a href="#/demo">Evaluation Demo</a>
              <span aria-hidden="true">·</span>
              <a href="#/paper">Citation</a>
            </div>
          </div>

          <div className="system-map" aria-labelledby="system-map-title">
            <div className="system-map__head">
              <span id="system-map-title">Evaluation logic</span>
              <span>Observable evidence only</span>
            </div>
            <div className="system-map__input">
              <span className="system-map__index">01</span>
              <div>
                <strong>Public-space scene</strong>
                <small>Image · task · four actions</small>
              </div>
            </div>
            <div className="system-map__flow">
              {["Perception", "Cognition", "Action"].map((item, index) => (
                <div className="system-node" key={item}>
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <div className="system-map__outputs">
              <div><i className="dot dot--blue" />Task Success</div>
              <div><i className="dot dot--green" />Safety</div>
              <div><i className="dot dot--amber" />Chain Consistency</div>
            </div>
            <div className="system-map__foot">
              <Icon name="shield" />
              <span>Safety is evaluated independently from task completion.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--rule">
        <div className="container">
          <SectionHeading
            eyebrow="01 · Motivation"
            title="Task success is necessary—not sufficient"
            description="Public-space agents must account for people, rules, access restrictions and the risk introduced by the way a task is carried out."
          />
          <EvolutionFlow locale="en" />
        </div>
      </section>

      <section className="section section--orbit">
        <div className="container">
          <SectionHeading
            eyebrow="02 · Begin exploring"
            title="One benchmark, five evidence paths"
            description="The paper reports 300 standardized instances, six evaluated MLLMs, and more than 50 questionnaire responses—49 of which met the eligibility criteria."
          />
          <OrbitExplorer locale="en" />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="03 · Benchmark at a glance"
            title="A controlled, human-designed evaluation set"
            description="Only values explicitly reported in the manuscript-derived source are shown."
          />
          <div className="glance-grid">
            {glance.map((item) => (
              <article className="metric-card" key={item.label}>
                <strong>{item.value}</strong>
                <h3>{item.label}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
          <SourceNote source="Dataset section and Main Experiment, Table 1" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="04 · Success × Safety"
            title="One outcome axis cannot explain the other"
            description="Focus or hover over a quadrant to inspect the manuscript-aligned interpretation."
          />
          <div className="quadrant-layout">
            <div className="quadrant-axis-y">Task Success ↑</div>
            <div className="quadrant-chart" role="figure" aria-label="Task success by safety conceptual quadrant">
              {quadrants.map((quadrant) => (
                <button
                  type="button"
                  className={`quadrant quadrant--${quadrant.key}`}
                  key={quadrant.key}
                  aria-label={`${quadrant.title}: ${quadrant.description}`}
                >
                  <span>{quadrant.status}</span>
                  <strong>{quadrant.title}</strong>
                  <p>{quadrant.description}</p>
                </button>
              ))}
            </div>
            <div className="quadrant-axis-x">Safety →</div>
          </div>
          <SourceNote source="Four-quadrant organization in the Dataset section; quadrant counts are not reported." />
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHeading
            eyebrow="05 · Evaluation framework"
            title="From visible scene evidence to an auditable result"
            description="Model inputs and judge-only references remain explicitly separated."
          />
          <div className="framework-columns">
            <article>
              <div className="framework-label">Model-visible fields</div>
              <ol className="field-list">
                <li><span>01</span> Scene image</li>
                <li><span>02</span> Task description</li>
                <li><span>03</span> Four candidate actions</li>
              </ol>
            </article>
            <div className="framework-divider"><Icon name="arrow" size={24} /></div>
            <article>
              <div className="framework-label">Judge-visible fields</div>
              <ol className="field-list">
                <li><span>04</span> Correct action & reference reason</li>
                <li><span>05</span> Key concepts & safety-critical anchors</li>
                <li><span>06</span> Structured evaluation rules</li>
              </ol>
            </article>
          </div>
          <div className="evaluation-pipeline">
            {[
              "Model response",
              "Output parsing",
              "Task success",
              "Safety evaluation",
              "Chain consistency",
              "Themis reference",
              "Result"
            ].map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="06 · Key findings"
            title="Results are reported as a multi-metric profile"
            description="No cross-metric overall score or statistical significance is claimed."
            actions={<ArrowLink to="/models">Open full results</ArrowLink>}
          />
          <div className="finding-grid">
            {findings.map((finding, index) => (
              <article className="finding-card" key={finding.title}>
                <div className="finding-card__top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <AcademicBadge>{finding.evidenceType}</AcademicBadge>
                </div>
                <h3>{finding.title}</h3>
                <p>{finding.evidence}</p>
                <ArrowLink to={finding.target}>Inspect evidence</ArrowLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split-heading">
          <div>
            <p className="eyebrow">07 · Scope first</p>
            <h2>What this benchmark does—and does not—establish</h2>
          </div>
          <ul className="scope-list">
            {limitations.slice(0, 5).map((item) => (
              <li key={item}><Icon name="info" size={18} />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="08 · Explore"
            title="Move from the research claim to its evidence"
          />
          <div className="module-grid">
            {[
              ["01", "Explore the Dataset", "See the construction protocol, fields and sample-data availability.", "/dataset"],
              ["02", "Compare Models", "Inspect six formal Table 1 profiles on a shared 0–1 scale.", "/models"],
              ["03", "Understand the Method", "Trace safety gates, PCA metrics and Themis Memory.", "/methodology"],
              ["04", "Run the Evaluation Demo", "Replay the ten-position evaluation structure without invented samples.", "/demo"]
            ].map(([index, title, description, target]) => (
              <a className="module-card" href={`#${target}`} key={title}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Icon name="arrow" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
