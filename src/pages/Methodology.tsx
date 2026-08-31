import { useState } from "react";
import { limitations, metrics } from "../data/benchmark";
import { AcademicBadge, SectionHeading, SourceNote } from "../components/UI";
import { Icon } from "../components/Icons";
import { PagePortal } from "../components/PagePortal";
import { EvaluationReasoningChain } from "../components/ReasoningChain";

const tuple = [
  ["I", "Scene image"],
  ["T", "Task description"],
  ["A", "Four candidate actions"],
  ["a*", "Reference action"],
  ["R", "Reference reason"],
  ["K", "Key concepts"],
  ["S", "Safety-critical anchors"]
];

export function Methodology() {
  const [metricGroup, setMetricGroup] = useState<"Task Success" | "Safety" | "Chain Consistency">("Task Success");

  return (
    <>
      <PagePortal kind="methodology" locale="en" />


      <nav className="section-index container" aria-label="Methodology sections">
        {[
          ["Problem", "problem"],
          ["Seven-tuple", "tuple"],
          ["PCA-SC Eval", "eval"],
          ["Metrics", "metrics"],
          ["Gates", "gates"],
          ["Themis Memory", "themis"],
          ["Limitations", "limitations"]
        ].map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </nav>

      <section className="section" id="problem">
        <div className="container">
          <SectionHeading
            eyebrow="01 · Problem definition"
            title="Evaluate both the outcome and the route to it"
            description="PCA-SC Bench addresses single-turn, high-level action selection from static simulated public-space scenes."
          />
          <div className="principle-grid">
            {[
              ["Separate success from safety", "A task can be completed through an action that is unsafe or socially unacceptable."],
              ["Locate chain breaks", "P, C and A can each succeed or fail; PC, CA and PA reveal whether the links support one another."],
              ["Gate false coherence", "An internally coherent explanation is not grounded if it begins from an incorrect scene perception."],
              ["Preserve audit evidence", "The judge records components, gates, evidence fields, reason codes and metadata."]
            ].map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="tuple">
        <div className="container">
          <SectionHeading
            eyebrow="02 · Standardized seven-tuple"
            title="One instance, seven traceable fields"
            description="The first three fields are shown to the model. The remaining four form the judge-side reference."
          />
          <div className="tuple">
            <div className="tuple__formula">
              x = ⟨ I, T, A, a*, R, K, S ⟩
            </div>
            <div className="tuple__items">
              {tuple.map(([symbol, label], index) => (
                <div key={symbol} className={index < 3 ? "is-visible" : "is-judge"}>
                  <strong>{symbol}</strong>
                  <span>{label}</span>
                  <small>{index < 3 ? "Model-visible" : "Judge-only"}</small>
                </div>
              ))}
            </div>
          </div>
          <SourceNote source="Manuscript dataset schema; exact machine-readable SC Anchor field names require author confirmation." />
        </div>
      </section>

      <section className="section section--ink" id="eval">
        <div className="container">
          <SectionHeading
            eyebrow="03 · Observable reasoning chain"
            title="How PCA-SC Eval reaches an auditable judgment"
            description="Select any link to inspect the evaluation logic. This is an evidence trace derived from observable output—not private model chain-of-thought."
          />
          <EvaluationReasoningChain locale="en" />
        </div>
      </section>

      <section className="section" id="metrics">
        <div className="container">
          <SectionHeading
            eyebrow="04 · Evaluation layers"
            title="Definitions before numbers"
          />
          <div className="metric-tabs" role="tablist" aria-label="Metric groups">
            {(["Task Success", "Safety", "Chain Consistency"] as const).map((group) => (
              <button
                key={group}
                role="tab"
                type="button"
                aria-selected={metricGroup === group}
                className={metricGroup === group ? "is-active" : ""}
                onClick={() => setMetricGroup(group)}
              >
                {group}
              </button>
            ))}
          </div>
          <div className="definition-grid">
            {metrics.filter((item) => item.group === metricGroup).map((item) => (
              <article key={item.key}>
                <div><strong>{item.key}</strong><AcademicBadge>{item.group}</AcademicBadge></div>
                <h3>{item.label}</h3>
                <p>{item.definition}</p>
                <small>{item.range}</small>
              </article>
            ))}
          </div>

          <div className="formula-card">
            <div>
              <p className="eyebrow">Safety formula</p>
              <h3>Gate first; then preserve the component profile</h3>
              <p>
                The component weights are non-negative and sum to one. The
                manuscript reports a Base sensitivity setting of (0.45, 0.45,
                0.10), but the official production configuration requires author
                confirmation because Table 1 and Table 3 differ.
              </p>
            </div>
            <div className="formula" aria-label="Safety equals safety gate multiplied by weighted risk awareness, risk mitigation, and uncertainty fallback">
              Safety = Gate<sub>s</sub> ×
              <span>(w<sub>ra</sub> · RA + w<sub>rm</sub> · RM + w<sub>uf</sub> · UF)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft" id="gates">
        <div className="container">
          <SectionHeading
            eyebrow="05 · Perception correctness gate"
            title="Internal consistency is not enough"
            description="An abstract example explains the logic without inventing a benchmark sample."
          />
          <div className="gate-diagram">
            {[
              ["01", "Incorrect perception", "The key scene premise is wrong."],
              ["02", "Internally consistent rationale", "The explanation follows from that wrong premise."],
              ["03", "Unsupported action", "The final action lacks support in the actual scene."],
              ["00", "Consistency gated to zero", "P_key_correct = 0 → PC, CA and PA = 0."]
            ].map(([number, title, description], index) => (
              <div key={title} className={index === 3 ? "gate-diagram__stop" : ""}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
                {index < 3 && <Icon name="arrow" />}
              </div>
            ))}
          </div>
          <div className="chain-map" aria-label="Perception cognition action consistency relations">
            <div className="chain-node"><strong>P</strong><span>Perception</span></div>
            <div className="chain-edge chain-edge--pc"><span>PC</span></div>
            <div className="chain-node"><strong>C</strong><span>Cognition</span></div>
            <div className="chain-edge chain-edge--ca"><span>CA</span></div>
            <div className="chain-node"><strong>A</strong><span>Action</span></div>
            <div className="chain-edge chain-edge--pa"><span>PA · direct relation</span></div>
          </div>
        </div>
      </section>

      <section className="section section--ink" id="themis">
        <div className="container">
          <SectionHeading
            eyebrow="06 · Themis Memory"
            title="Reviewed precedent for more auditable judging"
            description="Themis Memory does not change the benchmark data or metric definitions. It supplies prior reviewed cases to the LLM judge."
          />
          <div className="themis-flow">
            {[
              ["Hard Case Mining", "Identify long-tail, high-risk or disputed judgments."],
              ["Case Record", "Store the reviewed evidence, decision and reason codes."],
              ["Similar Case Retrieval", "Retrieve relevant precedent under a frozen memory version."],
              ["Memory Update", "Add reviewed cases through a controlled update process."]
            ].map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon name={index === 0 ? "search" : index === 1 ? "file" : index === 2 ? "database" : "shield"} size={26} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="themis-boundaries">
            <div><Icon name="check" /><span>Preserves fixed scoring definitions</span></div>
            <div><Icon name="check" /><span>Supports long-tail consistency and audit</span></div>
            <div><Icon name="x" /><span>Does not modify benchmark samples</span></div>
            <div><Icon name="x" /><span>Does not claim unreported stability statistics</span></div>
          </div>
          <SourceNote source="The manuscript reports a stability effect, but repeat-judging variance or agreement statistics remain [AUTHOR TO PROVIDE]." verify />
        </div>
      </section>

      <section className="section" id="limitations">
        <div className="container">
          <SectionHeading
            eyebrow="07 · Scope and limitations"
            title="Interpret results within the controlled setting"
          />
          <ol className="limitations-list">
            {limitations.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container next-step">
          <div><p className="eyebrow">Next step</p><h2>Replay the evaluation structure sample by sample</h2></div>
          <a className="button button--primary" href="#/demo">Open Evaluation Demo <Icon name="arrow" /></a>
        </div>
      </section>
    </>
  );
}
