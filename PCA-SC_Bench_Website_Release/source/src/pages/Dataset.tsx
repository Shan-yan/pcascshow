import { useMemo, useState } from "react";
import { anchors, benchmark } from "../data/benchmark";
import { samples } from "../data/samples";
import { AcademicBadge, MissingData, PageIntro, SectionHeading, SourceNote } from "../components/UI";
import { Icon } from "../components/Icons";

const flow = [
  "Public-space problem definition",
  "Simulation scene construction",
  "Scene image collection",
  "Task design",
  "Candidate action design",
  "Reference annotation",
  "Safety-critical annotation",
  "Expert review",
  "Standardized benchmark instance"
];

export function Dataset() {
  const [query, setQuery] = useState("");
  const [gateOnly, setGateOnly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(
    () => samples.filter((sample) => sample.id.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const randomSample = () => {
    const sample = samples[Math.floor(Math.random() * samples.length)];
    setSelected(sample.id);
    setNotice(`${sample.id} selected. Its source record is awaiting author input.`);
  };

  return (
    <>
      <PageIntro
        eyebrow="Dataset"
        title="A controlled view of public-space safety decisions"
        lead="PCA-SC Bench contains 300 manually designed, annotated and reviewed test instances derived from a simulated station waiting hall. This page separates confirmed dataset structure from per-sample material that has not yet been supplied."
        badges={
          <>
            <AcademicBadge tone="blue">300 instances</AcademicBadge>
            <AcademicBadge>1920 × 1080 PNG</AcademicBadge>
            <AcademicBadge>Isaac Sim</AcademicBadge>
          </>
        }
      />

      <section className="section section--compact">
        <div className="container">
          <div className="dataset-stats">
            {[
              ["300", "scene–task instances"],
              ["1", "station waiting hall"],
              ["4", "candidate actions"],
              ["5", "human experts"]
            ].map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <SourceNote source="Dataset section: simulated station images with multiple camera views, two lighting conditions and crowd-density variation." />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="01 · Construction"
            title="From a public-space problem to a standardized instance"
            description="The workflow is reproduced as an explanatory sequence; no unreported sample counts are assigned to intermediate stages."
          />
          <ol className="construction-flow">
            {flow.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="02 · Instance structure"
            title="What the model sees—and what only the judge can use"
          />
          <div className="visibility-grid">
            <article className="visibility-card visibility-card--model">
              <header>
                <div>
                  <AcademicBadge tone="blue">Model-visible</AcademicBadge>
                  <h3>Evaluation input</h3>
                </div>
                <Icon name="file" size={28} />
              </header>
              <ul>
                <li><span>01</span> Scene image</li>
                <li><span>02</span> Task description</li>
                <li><span>03</span> Four mutually exclusive candidate actions</li>
              </ul>
            </article>
            <article className="visibility-card visibility-card--judge">
              <header>
                <div>
                  <AcademicBadge tone="warning">Judge-only</AcademicBadge>
                  <h3>Evaluation reference</h3>
                </div>
                <Icon name="shield" size={28} />
              </header>
              <ul>
                <li><span>04</span> Reference answer and reason</li>
                <li><span>05</span> Key concepts and environmental perceptions</li>
                <li><span>06</span> Safety-critical anchors and rules</li>
                <li><span>07</span> Annotation and review metadata</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHeading
            eyebrow="03 · Safety-critical anchors"
            title="Structured evidence for public-space safety judging"
            description="All four anchor categories are judge-only. Per-sample records and the final machine-readable field names remain pending."
          />
          <div className="anchor-grid">
            {anchors.map((anchor, index) => (
              <article key={anchor.title}>
                <span className="anchor-index">{String(index + 1).padStart(2, "0")}</span>
                <p className="anchor-label">{anchor.academicLabel}</p>
                <h3>{anchor.title}</h3>
                <p>{anchor.description}</p>
                <dl>
                  <div><dt>Supports</dt><dd>{anchor.supports}</dd></div>
                  <div><dt>Model visible</dt><dd>No · Judge-only</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="browser">
        <div className="container">
          <SectionHeading
            eyebrow="04 · Sample browser"
            title="Browser structure ready; source records pending"
            description="The manuscript confirms the dataset size and schema, but the 300 machine-readable samples and images were not provided to this repository. The interface therefore exposes only honest sample placeholders."
          />
          <div className="browser">
            <aside className="browser__filters" aria-label="Dataset filters">
              <div className="filter-title"><Icon name="filter" />Filters</div>
              <label htmlFor="sample-search">Search samples</label>
              <div className="search-input">
                <Icon name="search" size={17} />
                <input
                  id="sample-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. Sample 03"
                />
              </div>
              <label htmlFor="quadrant-filter">Success–safety quadrant</label>
              <select id="quadrant-filter" disabled>
                <option>[AUTHOR TO PROVIDE LABELS]</option>
              </select>
              <label htmlFor="risk-filter">Risk type</label>
              <select id="risk-filter" disabled>
                <option>[AUTHOR TO PROVIDE TAXONOMY]</option>
              </select>
              <label htmlFor="task-filter">Task category</label>
              <select id="task-filter" disabled>
                <option>[AUTHOR TO PROVIDE TAXONOMY]</option>
              </select>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={gateOnly}
                  onChange={(event) => setGateOnly(event.target.checked)}
                  disabled
                />
                Contains a safety gate
              </label>
              <div className="filter-actions">
                <button className="button button--secondary" type="button" onClick={randomSample}>
                  Random sample
                </button>
                <button
                  className="button button--text"
                  type="button"
                  onClick={() => { setQuery(""); setGateOnly(false); }}
                >
                  Clear filters
                </button>
              </div>
            </aside>
            <div className="browser__results">
              <div className="result-toolbar">
                <span>{filtered.length} illustrative positions</span>
                <AcademicBadge tone="warning">Source records pending</AcademicBadge>
              </div>
              {notice && <p className="inline-notice" role="status">{notice}</p>}
              <div className="sample-grid">
                {filtered.map((sample) => (
                  <button
                    type="button"
                    className="sample-card"
                    key={sample.id}
                    onClick={() => setSelected(sample.id)}
                  >
                    <div className="sample-card__image" role="img" aria-label="Scene image not supplied">
                      <Icon name="database" size={28} />
                      <span>Scene image pending</span>
                    </div>
                    <div className="sample-card__body">
                      <span>{sample.id}</span>
                      <strong>[AUTHOR TO SELECT SAMPLE]</strong>
                      <p>Task, actions, quadrant and safety anchors are not available.</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <div className="drawer-backdrop" onMouseDown={() => setSelected(null)}>
          <aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sample-drawer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <AcademicBadge tone="warning">Judge fields unavailable</AcademicBadge>
                <h2 id="sample-drawer-title">{selected}</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setSelected(null)} aria-label="Close sample detail">
                <Icon name="x" />
              </button>
            </header>
            <div className="drawer__image">
              <Icon name="database" size={36} />
              <span>[AUTHOR TO PROVIDE SCENE IMAGE]</span>
            </div>
            <MissingData detail="The author must select this sample and provide the task, four actions and reference answer." />
            {[
              "Reference reason",
              "Key concepts",
              "Safety-critical anchors",
              "Annotation notes",
              "Evaluation rules"
            ].map((label) => (
              <details key={label}>
                <summary>{label}<AcademicBadge tone="warning">Judge-only</AcademicBadge></summary>
                <MissingData compact detail={`${label} record not supplied.`} />
              </details>
            ))}
          </aside>
        </div>
      )}

      <section className="section section--soft">
        <div className="container next-step">
          <div>
            <p className="eyebrow">Next step</p>
            <h2>See how these fields become evaluation metrics</h2>
          </div>
          <a className="button button--primary" href="#/methodology">Open Methodology <Icon name="arrow" /></a>
        </div>
      </section>
    </>
  );
}
