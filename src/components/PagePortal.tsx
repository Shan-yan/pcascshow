import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, WheelEvent } from "react";
import { Icon } from "./Icons";

export type PortalKind = "dataset" | "models" | "methodology" | "demo" | "paper";

const portalCopy = {
  zh: {
    dataset: ["数据集", "让公共空间决策样本", "可见、可查、可诊断", "300 条人工设计的车站候车大厅样本，以场景、任务、四个候选行动和安全关键锚点构成统一实例。", ["300 条样本", "4 个候选行动", "5 位专家"]],
    models: ["模型结果", "六个模型，六张", "独立能力画像", "分别查看感知、认知、行动、安全和链路一致性，不用单一总分掩盖模型差异。", ["6 个模型", "10 项指标", "300 条样本"]],
    methodology: ["评测方法", "从可观察证据到", "可审计评测结果", "PCA-SC Eval 通过输出解析、安全门控和关键感知门控，独立计算任务成功、安全与一致性。", ["7 个实例字段", "2 个关键门控", "10 项指标"]],
    demo: ["评测演示", "选择模型，实时查看", "行动与理由", "播放输入加载、候选行动、最终选择、普通理由和安全理由，不展示隐藏思维链。", ["6 个模型", "4 个行动", "逐步播放"]],
    paper: ["论文与证据", "把研究主张组织成", "可追溯记录", "集中呈现研究问题、实验范围、模型结果、人本评价、局限性与后续出版信息。", ["49 名参与者", "16 个案例", "784 次观察"]]
  },
  en: {
    dataset: ["Dataset", "Make public-space decisions", "visible and diagnosable", "Three hundred station-hall instances connect scenes, tasks, four candidate actions and safety-critical anchors in one schema.", ["300 instances", "4 actions", "5 experts"]],
    models: ["Model results", "Six models, six", "distinct capability profiles", "Inspect perception, cognition, action, safety and consistency without hiding differences behind one total score.", ["6 models", "10 metrics", "300 instances"]],
    methodology: ["Methodology", "From observable evidence to", "auditable evaluation", "PCA-SC Eval combines output parsing, safety gates and critical-perception gates to score success, safety and consistency separately.", ["7 fields", "2 gates", "10 metrics"]],
    demo: ["Evaluation demo", "Choose a model and watch", "action with reason", "Replay input loading, candidate actions, the final choice, ordinary reason and safety reason without hidden chain-of-thought.", ["6 models", "4 actions", "staged playback"]],
    paper: ["Paper & evidence", "Turn research claims into a", "traceable record", "Bring together the research question, scope, model results, human evaluation, limitations and publication record.", ["49 participants", "16 cases", "784 observations"]]
  }
} as const;

function PortalDatasetGallery() {
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const lastX = useRef(0);
  const scenes = [0, 1, 2, 3, 1, 3, 0, 2];

  useEffect(() => {
    if (dragging || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setRotation((current) => current - .16), 40);
    return () => window.clearInterval(timer);
  }, [dragging]);

  const start = (event: ReactPointerEvent<HTMLDivElement>) => {
    lastX.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const delta = event.clientX - lastX.current;
    lastX.current = event.clientX;
    setRotation((current) => current + delta * .22);
  };
  const stop = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const wheel = (event: WheelEvent<HTMLDivElement>) => setRotation((current) => current - event.deltaY * .045);

  return (
    <div className={`portal-dataset-gallery ${dragging ? "is-dragging" : ""}`} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onWheel={wheel}>
      <div className="portal-dataset-gallery__track" style={{ "--portal-gallery-rotation": `${rotation}deg` } as CSSProperties}>
        {scenes.map((scene, index) => (
          <figure style={{ "--portal-gallery-item": index } as CSSProperties} key={`${scene}-${index}`}>
            <img src="./paper-assets/representative-scenes.png" alt="" style={{ "--scene": scene } as CSSProperties} draggable="false" />
            <figcaption><span>0{(index % 4) + 1}</span>PCA-SC SCENE</figcaption>
          </figure>
        ))}
      </div>
      <div className="portal-dataset-gallery__controls">
        <button type="button" onClick={() => setRotation((current) => current + 45)} aria-label="Previous scene">←</button>
        <span>DRAG · SCROLL</span>
        <button type="button" onClick={() => setRotation((current) => current - 45)} aria-label="Next scene">→</button>
      </div>
    </div>
  );
}

function PortalVisual({ kind, active }: { kind: PortalKind; active: number }) {
  if (kind === "dataset") {
    return <div className="portal-visual portal-visual--dataset"><PortalDatasetGallery /></div>;
  }
  if (kind === "models") {
    return <div className="portal-visual portal-visual--models">{["Perception", "Safety", "Consistency"].map((label, index) => <article className={active % 3 === index ? "is-active" : ""} key={label}><span>0{index + 1}</span><svg viewBox="0 0 160 130"><polygon points="80,8 144,43 136,107 80,124 22,104 17,43" /><polygon points="80,31 120,53 114,92 80,104 42,90 38,53" /><polyline points="80,20 131,58 105,98 80,78 35,91 52,49 80,20" /></svg><strong>{label}</strong></article>)}</div>;
  }
  if (kind === "methodology") {
    return <div className="portal-visual portal-visual--methodology"><div className="portal-method-line" />{["I", "P", "C", "A", "S"].map((label, index) => <article className={active % 5 === index ? "is-active" : ""} key={label}><span>{label}</span><small>{["INPUT", "PERCEPTION", "COGNITION", "ACTION", "SAFETY"][index]}</small></article>)}</div>;
  }
  if (kind === "demo") {
    return <div className="portal-visual portal-visual--demo"><header><i /><i /><i /><span>OBSERVABLE OUTPUT · LIVE</span></header>{["MODEL SELECTED", "CASE LOADED", "ACTION PARSED", "REASON DISPLAYED"].map((label, index) => <div className={active >= index ? "is-active" : ""} key={label}><span>0{index + 1}</span><strong>{label}</strong><i /></div>)}<footer><b />PCA-SC EVAL</footer></div>;
  }
  return <div className="portal-visual portal-visual--paper"><article><span>PCA-SC / RESEARCH RECORD</span><h3>Safety is not task success.</h3><i /><i /><i /><strong>49 × 16 = 784</strong></article>{[0, 1, 2, 3, 4].map((item) => <b className={active % 5 === item ? "is-active" : ""} style={{ "--person-x": `${15 + item * 15}%`, "--person-y": `${12 + (item % 3) * 28}%` } as CSSProperties} key={item} />)}<em><Icon name="file" /></em></div>;
}

export function PagePortal({ kind, locale = "en" }: { kind: PortalKind; locale?: "zh" | "en" }) {
  const [active, setActive] = useState(0);
  const [eyebrow, title, accent, lead, stats] = portalCopy[locale][kind];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % (kind === "methodology" || kind === "paper" ? 5 : 4)), 1450);
    return () => window.clearInterval(timer);
  }, [kind]);
  const action = locale === "zh" ? "进入详细内容" : "Explore the details";
  const scrollToDetails = () => document.getElementById("page-content")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className={`page-portal page-portal--${kind}`}>
      <div className="page-portal__ambient" aria-hidden="true"><i /><i /><i /></div>
      <div className="page-portal__inner">
        <div className="page-portal__copy">
          <span>{eyebrow}</span>
          <h1>{title} <em>{accent}</em></h1>
          <p>{lead}</p>
          <div className="page-portal__stats">{stats.map((item, index) => <b className={active % stats.length === index ? "is-active" : ""} key={item}>{item}</b>)}</div>
          <button type="button" onClick={scrollToDetails}>{action} <Icon name="arrow" size={17} /></button>
        </div>
        <PortalVisual kind={kind} active={active} />
      </div>
      <span id="page-content" className="page-portal__anchor" />
    </section>
  );
}
