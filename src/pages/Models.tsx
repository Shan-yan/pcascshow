import { lazy, Suspense, useMemo, useState } from "react";
import { errorCategories, humanEvaluation, modelResults } from "../data/models";
import { metrics } from "../data/benchmark";
import { AcademicBadge, SectionHeading, SourceNote } from "../components/UI";
import { Icon } from "../components/Icons";
import { PagePortal } from "../components/PagePortal";

const ModelRadarGrid = lazy(() => import("../components/ModelRadar").then((module) => ({ default: module.ModelRadarGrid })));

type MetricKey = "P" | "C" | "A" | "Safety" | "RA" | "RM" | "UF" | "PC" | "CA" | "PA";
type ProfileGroup = "Task success" | "Safety profile" | "Gated consistency";
const metricGroups: Record<ProfileGroup, MetricKey[]> = {
  "Task success": ["P", "C", "A"],
  "Safety profile": ["RA", "RM", "UF", "Safety"],
  "Gated consistency": ["PC", "CA", "PA"]
};
const allMetricKeys: MetricKey[] = ["P", "C", "A", "Safety", "RA", "RM", "UF", "PC", "CA", "PA"];

const palette = ["#173f5f", "#2c7a6b", "#a76b18", "#8b4a55"];

function format(value: number) {
  return value.toFixed(3);
}

export function Models() {
  const [selected, setSelected] = useState(modelResults.slice(0, 4).map((model) => model.id));
  const [access, setAccess] = useState<"All" | "Open" | "Closed">("All");
  const [metric, setMetric] = useState<MetricKey>("Safety");
  const [profileGroup, setProfileGroup] = useState<ProfileGroup>("Task success");
  const [view, setView] = useState<"chart" | "table">("chart");

  const visibleModels = useMemo(
    () =>
      modelResults.filter(
        (model) => selected.includes(model.id) && (access === "All" || model.access === access)
      ),
    [selected, access]
  );

  const toggleModel = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < 4
          ? [...current, id]
          : current
    );
  };

  const metricDefinition = metrics.find((item) => item.key === metric);
  const metricKeys = metricGroups[profileGroup];
  const ranked = [...modelResults].sort((a, b) => b[metric] - a[metric]);

  return (
    <div className="results-page">
      <PagePortal kind="models" locale="en" />

      <section className="section section--compact">
        <div className="container">
          <div className="result-rule">
            <Icon name="shield" size={24} />
            <div>
              <strong>Formal aggregate results</strong>
              <span>Separate from the ten-position Evaluation Demo and its provisional outputs.</span>
            </div>
            <a href="#/demo">Open Demo context <Icon name="arrow" size={16} /></a>
          </div>
        </div>
      </section>

      <section className="section model-radar-section">
        <div className="container">
          <SectionHeading
            eyebrow="01 · Six model portraits"
            title="A radar profile for every evaluated model"
            description="Each radar uses the manuscript values for perception, cognition, action, safety and uncertainty fallback; chain consistency is the mean of PC, CA and PA for visualization only, not an overall benchmark score."
          />
          <Suspense fallback={<div className="radar-loading">Loading six radar profiles…</div>}><ModelRadarGrid locale="en" /></Suspense>
          <SourceNote source="Manuscript Table 1, Table 2 and Table 4 · all axes use 0–1" />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="02 · Model selector"
            title="Select models, then inspect their values"
            description="Choose up to four models and one metric group for a focused comparison."
          />
          <div className="metric-tabs" role="tablist" aria-label="Metric profile group">
            {(Object.keys(metricGroups) as ProfileGroup[]).map((group) => (
              <button
                type="button"
                role="tab"
                aria-selected={profileGroup === group}
                className={profileGroup === group ? "is-active" : ""}
                onClick={() => setProfileGroup(group)}
                key={group}
              >
                {group}
              </button>
            ))}
          </div>
          <div className="selector-panel">
            <div className="segmented" aria-label="Filter by model access type">
              {(["All", "Open", "Closed"] as const).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={access === item ? "is-active" : ""}
                  onClick={() => setAccess(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="model-checkboxes">
              {modelResults.map((model) => (
                <label key={model.id} className={!selected.includes(model.id) && selected.length >= 4 ? "is-disabled" : ""}>
                  <input
                    type="checkbox"
                    checked={selected.includes(model.id)}
                    disabled={!selected.includes(model.id) && selected.length >= 4}
                    onChange={() => toggleModel(model.id)}
                  />
                  <span>
                    <strong>{model.label}</strong>
                    <small>{model.id} · {model.access}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="03 · Metric profile"
            title="Shared scale, independent definitions"
            description="Every bar uses the same 0–1 aggregate scale. Values are descriptive; confidence intervals were not reported in the current manuscript."
            actions={
              <div className="segmented segmented--small" aria-label="Choose chart or table view">
                <button type="button" className={view === "chart" ? "is-active" : ""} onClick={() => setView("chart")}>Chart</button>
                <button type="button" className={view === "table" ? "is-active" : ""} onClick={() => setView("table")}>Table</button>
              </div>
            }
          />
          {visibleModels.length === 0 ? (
            <div className="empty-state"><Icon name="filter" /><strong>No models match this filter.</strong><p>Change access type or model selection.</p></div>
          ) : view === "chart" ? (
            <div className="profile-chart" role="figure" aria-label="Grouped horizontal bars comparing P, C, A and Safety across selected models">
              <div className="chart-scale" aria-hidden="true">
                <span>0</span><span>0.25</span><span>0.50</span><span>0.75</span><span>1.00</span>
              </div>
              {visibleModels.map((model, modelIndex) => (
                <article className="model-row" key={model.id}>
                  <div className="model-row__label">
                    <strong>{model.label}</strong>
                    <span>{model.id}</span>
                  </div>
                  <div className="model-row__metrics">
                    {metricKeys.map((key) => (
                      <div className="metric-bar" key={key}>
                        <span className="metric-bar__label">{key}</span>
                        <div className="metric-bar__track">
                          <div
                            className="metric-bar__value"
                            style={{ width: `${model[key] * 100}%`, backgroundColor: palette[modelIndex % palette.length] }}
                          />
                        </div>
                        <strong>{format(model[key])}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
              <p className="chart-caption">Aggregate scores over 300 benchmark instances.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="result-table">
                <caption>Formal benchmark aggregate values from manuscript Table 1</caption>
                <thead><tr><th scope="col">Model</th><th scope="col">Type</th>{metricKeys.map((key) => <th scope="col" key={key}>{key}</th>)}</tr></thead>
                <tbody>
                  {visibleModels.map((model) => (
                    <tr key={model.id}>
                      <th scope="row"><strong>{model.label}</strong><small>{model.id}</small></th>
                      <td>{model.access}</td>
                      {metricKeys.map((key) => <td key={key}>{format(model[key])}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <SourceNote source="Manuscript Table 1 · n = 300 · aggregate range 0–1 · no confidence intervals reported" />
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHeading
            eyebrow="04 · Safety × Action"
            title="High action accuracy does not determine the highest safety score"
            description="Each point is one model. X is Action; Y is Safety. Both axes show the full 0–1 range."
          />
          <div className="scatter-layout">
            <div className="scatter-wrap">
              <svg className="scatter" viewBox="0 0 720 440" role="img" aria-labelledby="scatter-title scatter-desc">
                <title id="scatter-title">Safety versus Action scores by model</title>
                <desc id="scatter-desc">GPT-4o has the highest Action value while GPT-5.2 has the highest Safety value.</desc>
                {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                  <g key={tick}>
                    <line x1={70} x2={680} y1={380 - tick * 330} y2={380 - tick * 330} className="scatter__grid" />
                    <text x={54} y={385 - tick * 330}>{tick.toFixed(2)}</text>
                    <line y1={50} y2={380} x1={70 + tick * 610} x2={70 + tick * 610} className="scatter__grid" />
                    <text x={60 + tick * 610} y={406}>{tick.toFixed(2)}</text>
                  </g>
                ))}
                <line x1="70" x2="680" y1="380" y2="380" className="scatter__axis" />
                <line x1="70" x2="70" y1="50" y2="380" className="scatter__axis" />
                {modelResults.map((model, index) => {
                  const x = 70 + model.A * 610;
                  const y = 380 - model.Safety * 330;
                  return (
                    <g key={model.id} tabIndex={0} aria-label={`${model.label}: Action ${format(model.A)}, Safety ${format(model.Safety)}`}>
                      <circle cx={x} cy={y} r="7" className={`scatter__point scatter__point--${index}`} />
                      <text x={x + 10} y={y - 8} className="scatter__label">{model.label}</text>
                    </g>
                  );
                })}
                <text x="350" y="435" className="scatter__title">Action (A) →</text>
                <text transform="translate(18 260) rotate(-90)" className="scatter__title">Safety →</text>
              </svg>
            </div>
            <div className="scatter-summary">
              <p className="eyebrow">Text summary</p>
              <h3>Different metrics identify different leaders.</h3>
              <p>
                GPT-4o reports the highest Action score (0.745), while GPT-5.2
                reports the highest Safety score (0.604). The chart is descriptive
                and does not establish a statistically significant difference.
              </p>
              <dl>
                <div><dt>Highest A</dt><dd>GPT-4o · 0.745</dd></div>
                <div><dt>Highest Safety</dt><dd>GPT-5.2 · 0.604</dd></div>
                <div><dt>Sample basis</dt><dd>300 instances</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="05 · Metric drill-down"
            title="Read one metric without collapsing the profile"
          />
          <div className="metric-tabs" role="tablist" aria-label="Choose metric">
            {allMetricKeys.map((key) => (
              <button
                type="button"
                role="tab"
                aria-selected={metric === key}
                className={metric === key ? "is-active" : ""}
                key={key}
                onClick={() => setMetric(key)}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="drilldown">
            <article className="drilldown__definition">
              <AcademicBadge tone="blue">{metricDefinition?.group}</AcademicBadge>
              <h3>{metricDefinition?.label}</h3>
              <p>{metricDefinition?.definition}</p>
              <dl>
                <div><dt>Range</dt><dd>{metricDefinition?.range}</dd></div>
                <div><dt>Source</dt><dd>Manuscript Table 1</dd></div>
                <div><dt>Inference caution</dt><dd>No confidence interval or significance test reported</dd></div>
              </dl>
            </article>
            <ol className="metric-ranking">
              {ranked.map((model, index) => (
                <li key={model.id}>
                  <span>{index + 1}</span>
                  <div><strong>{model.label}</strong><small>{model.id}</small></div>
                  <b>{format(model[metric])}</b>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="06 · Error analysis"
            title="Reported top-level error distribution"
            description="Perception is the largest category; missing key perception is the largest reported subtype at 19%."
          />
          <div className="error-bars">
            {errorCategories.map((category) => (
              <div key={category.label}>
                <span>{category.label}</span>
                <div><i style={{ width: `${category.value}%` }} /></div>
                <strong>{category.value}%</strong>
              </div>
            ))}
          </div>
          <SourceNote source="Manuscript error analysis · category percentages sum to 100%" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="07 · Human-centered evidence"
            title="Action permission reflects safety, acceptability and the displayed reason"
            description="The questionnaire contributes a separate human-centered perspective; it is not presented as criterion validation of the automated PCA-SC metrics."
          />
          <div className="human-result-grid">
            <div className="human-result-summary">
              <div><strong>{humanEvaluation.eligibleParticipants}</strong><span>eligible participants</span></div>
              <div><strong>{humanEvaluation.cases}</strong><span>public-space cases</span></div>
              <div><strong>{humanEvaluation.observations}</strong><span>participant × case observations</span></div>
            </div>
            <div className="correlation-list">
              {humanEvaluation.correlations.map((item) => (
                <div key={item.pair}>
                  <span>{item.pair}</span>
                  <strong>ρ = {item.rho.toFixed(3)}</strong>
                  <small>95% CI {item.ci} · p {item.p}</small>
                </div>
              ))}
            </div>
          </div>
          <SourceNote source="PCA-SC809 §5.2.5 · case-level Spearman correlations, n = 16 cases" />
        </div>
      </section>

      <section className="section">
        <div className="container next-step">
          <div><p className="eyebrow">Next step</p><h2>Understand how each metric is produced</h2></div>
          <a className="button button--primary" href="#/methodology">Open Methodology <Icon name="arrow" /></a>
        </div>
      </section>
    </div>
  );
}
