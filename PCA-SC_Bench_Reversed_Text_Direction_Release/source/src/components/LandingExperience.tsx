import { useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { Icon } from "./Icons";

function moveSpotlight(event: MouseEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
}

export function SplitTitle({ text }: { text: string }) {
  let characterOffset = 0;
  return (
    <span className="split-title" aria-label={text.replace(/\n/g, " ")}>
      <span aria-hidden="true" className="split-title__lines">
        {text.split("\n").map((line, lineIndex) => {
          const start = characterOffset;
          const accentStart = line.toLowerCase().indexOf("bench");
          characterOffset += line.length;
          return (
            <span className="split-title__line" key={`${line}-${lineIndex}`}>
              {Array.from(line).map((character, index) => (
                <i
                  className={accentStart >= 0 && index >= accentStart ? "split-title__accent" : undefined}
                  style={{ "--char": start + index } as CSSProperties}
                  key={`${character}-${index}`}
                >
                  {character === " " ? "\u00a0" : character}
                </i>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}

export function HeroCaseGallery({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const isZh = locale === "zh";
  const sceneLabels = isZh
    ? ["候车大厅", "开放公共区域", "检票区域", "人群交互"]
    : ["Waiting hall", "Open public area", "Ticket check", "Crowd interaction"];
  const lanes = [[0, 1, 2, 3, 0, 1, 2, 3], [2, 3, 0, 1, 2, 3, 0, 1]];

  return (
    <aside className="diagonal-gallery" data-reveal="right" aria-label={isZh ? "斜向轮换的论文场景案例" : "Rotating diagonal manuscript scene gallery"}>
      <div className="diagonal-gallery__glow" aria-hidden="true" />
      <div className="diagonal-gallery__stage">
        {lanes.map((lane, laneIndex) => (
          <div className={`diagonal-gallery__lane diagonal-gallery__lane--${laneIndex + 1}`} key={laneIndex}>
            {lane.map((sceneIndex, cardIndex) => (
              <figure
                className="diagonal-card"
                aria-label={cardIndex < 4 ? sceneLabels[sceneIndex] : undefined}
                aria-hidden={cardIndex >= 4 ? "true" : undefined}
                key={`${laneIndex}-${cardIndex}`}
              >
                <img
                  src="./paper-assets/representative-scenes.png"
                  alt=""
                  style={{ "--scene": sceneIndex } as CSSProperties}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

function ResearchPreview({ type }: { type: "dataset" | "models" | "method" | "demo" | "paper" }) {
  if (type === "dataset") {
    return <div className="research-preview research-preview--dataset"><strong>300</strong><span /><span /><span /><i>4 × ACTION</i></div>;
  }
  if (type === "models") {
    return (
      <div className="research-preview research-preview--models">
        <svg viewBox="0 0 180 130" aria-hidden="true"><polygon points="90,8 158,42 150,105 90,124 28,101 22,42" /><polygon points="90,27 137,50 130,91 90,106 48,88 44,51" /><polyline points="90,19 144,56 124,96 90,79 42,88 57,50 90,19" /></svg>
        <strong>6 MLLMs</strong>
      </div>
    );
  }
  if (type === "method") {
    return <div className="research-preview research-preview--method"><span>P</span><i /><span>C</span><i /><span>A</span><b>SAFETY GATE</b></div>;
  }
  if (type === "demo") {
    return <div className="research-preview research-preview--demo"><i /><i /><i /><p><span>SELECT</span> ACTION_02</p><p><span>WHY</span> observable evidence</p></div>;
  }
  return <div className="research-preview research-preview--paper"><span>PDF</span><i /><i /><i /><strong>PCA-SC</strong></div>;
}

export function EvolutionFlow({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const copy = locale === "zh"
    ? [
        ["01 · 传统评测", "任务完成了吗？", "单一成功率只能说明最终结果，无法解释行动以什么方式完成。"],
        ["02 · 公共空间缺口", "行动安全且合规吗？", "成功的动作仍可能忽视人群、公共规则、通行秩序或明确安全红线。"],
        ["03 · PCA-SC 诊断", "决策链在哪里断裂？", "分别评估任务成功、安全表现，以及感知–认知–行动之间的信息是否相互支撑。"]
      ]
    : [
        ["01 · Conventional evaluation", "Was the task completed?", "A single success measure describes the outcome, but not how the action was carried out."],
        ["02 · Public-space gap", "Was the action safe and compliant?", "A successful action can still overlook people, public rules, flow order or an explicit safety red line."],
        ["03 · PCA-SC diagnosis", "Where did the decision chain break?", "Task success, safety and evidence transfer across perception, cognition and action are evaluated separately."]
      ];

  return (
    <div className="evolution" aria-label={locale === "zh" ? "评测理念的三阶段演变" : "Three-stage evolution of evaluation"}>
      <div className="evolution__rail" aria-hidden="true">
        <i />
        <span className="evolution__cursor"><b /></span>
      </div>
      <div className="evolution__cards">
        {copy.map(([index, title, description], itemIndex) => (
          <article className="evolution-card spotlight-surface" onMouseMove={moveSpotlight} style={{ "--step": itemIndex } as CSSProperties} key={title}>
            <span>{index}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function OrbitExplorer({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const [open, setOpen] = useState(false);
  const [spark, setSpark] = useState(0);
  const isZh = locale === "zh";
  const links = [
    { type: "dataset" as const, label: isZh ? "数据集" : "Dataset", kicker: isZh ? "300 条公共空间样本" : "300 public-space instances", summary: isZh ? "查看场景、任务、候选动作与安全关键字段。" : "Inspect scenes, tasks, candidate actions and safety-critical fields.", path: isZh ? "/zh/dataset" : "/dataset", icon: "database" as const },
    { type: "models" as const, label: isZh ? "模型结果" : "Model Results", kicker: isZh ? "六模型多指标画像" : "Six multi-metric profiles", summary: isZh ? "比较感知、认知、行动、安全与链路一致性。" : "Compare perception, cognition, action, safety and chain consistency.", path: isZh ? "/zh/models" : "/models", icon: "filter" as const },
    { type: "method" as const, label: isZh ? "评测方法" : "Methodology", kicker: isZh ? "PCA-SC Eval" : "PCA-SC Eval", summary: isZh ? "追踪安全门控、证据字段与自动判卷流程。" : "Trace safety gates, evidence fields and the evaluation pipeline.", path: isZh ? "/zh/methodology" : "/methodology", icon: "shield" as const },
    { type: "demo" as const, label: isZh ? "评测演示" : "Evaluation Demo", kicker: isZh ? "实时选择与理由" : "Live choice and reason", summary: isZh ? "选择模型和案例，播放可观察输出。" : "Choose a model and case, then replay observable outputs.", path: isZh ? "/zh/demo" : "/demo", icon: "play" as const },
    { type: "paper" as const, label: isZh ? "论文" : "Paper", kicker: isZh ? "论文证据与引用" : "Evidence and citation", summary: isZh ? "阅读研究范围、人本评价与待补出版信息。" : "Read the scope, human study and publication record.", path: isZh ? "/zh/paper" : "/paper", icon: "file" as const }
  ];

  const metricSegments = isZh
    ? ["300 条样本 ✦ ", "测试了 6 个模型 ✦ ", "50+ 人参与 ✦ "]
    : ["300 INSTANCES ✦ ", "SIX EVALUATED MODELS ✦ ", "50+ HUMAN PARTICIPANTS ✦ "];
  const ringSegments = Array.from({ length: isZh ? 3 : 2 }, () => metricSegments).flat();
  const totalRingCharacters = ringSegments.reduce((total, segment) => total + Array.from(segment).length, 0);
  let ringCharacterIndex = 0;
  const triggerLabel = isZh ? "开始探索" : "Start exploring";

  return (
    <div className={`orbit-explorer ${open ? "is-open" : ""}`}>
      <div className="orbit-explorer__halo" aria-hidden="true"><i /><i /><i /></div>
      <div className="orbit-metrics" aria-label={isZh ? "基准规模：300 条样本、测试了六个模型、50+ 人参与" : "Benchmark scale: 300 instances, six evaluated models and more than 50 human participants"}>
        <div className="orbit-metric">
          <span aria-hidden="true">
            {ringSegments.flatMap((segment, segmentIndex) => Array.from(segment).map((character) => {
              const currentIndex = ringCharacterIndex++;
              return (
                <i
                  className={`orbit-metric__char orbit-metric__char--${segmentIndex % 3}`}
                  style={{ "--angle": `${(360 / totalRingCharacters) * currentIndex}deg` } as CSSProperties}
                  key={`${segmentIndex}-${currentIndex}`}
                >
                  {character === " " ? "\u00a0" : character}
                </i>
              );
            }))}
          </span>
        </div>
      </div>

      <button
        className="orbit-trigger"
        type="button"
        aria-expanded={open}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
        aria-controls="orbit-destinations"
        onClick={() => { setOpen(true); setSpark((value) => value + 1); }}
      >
        <span className="orbit-trigger__label" aria-label={triggerLabel}>
          <span aria-hidden="true">
            {Array.from(triggerLabel).map((character, index) => (
              <i style={{ "--label-char": index } as CSSProperties} key={`${character}-${index}`}>{character === " " ? "\u00a0" : character}</i>
            ))}
          </span>
        </span>
        <span className="orbit-trigger__live" aria-hidden="true"><i />LIVE <b /><b /><b /><b /></span>
        <Icon name="arrow" size={20} />
        <span className="orbit-sparks" key={spark} aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i style={{ "--ray": index } as CSSProperties} key={index} />)}</span>
      </button>

      <nav className="research-bento" id="orbit-destinations" aria-label={isZh ? "研究入口概览" : "Research destination overview"}>
        {links.map((link, index) => (
          <a href={`#${link.path}`} className={`research-card research-card--${link.type}`} tabIndex={open ? 0 : -1} key={link.path}>
            <header><small>0{index + 1}</small><Icon name={link.icon} size={20} /></header>
            <ResearchPreview type={link.type} />
            <footer>
              <span>{link.kicker}</span>
              <h3>{link.label}</h3>
              <p>{link.summary}</p>
              <Icon name="arrow" size={20} />
            </footer>
          </a>
        ))}
      </nav>

      {!open && <p className="orbit-explorer__hint">
        {isZh ? "点击中心按钮，展开研究路径。" : "Select the center button to reveal the research paths."}
      </p>}
    </div>
  );
}
