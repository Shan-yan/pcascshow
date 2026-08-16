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
          characterOffset += line.length;
          return (
            <span className="split-title__line" key={`${line}-${lineIndex}`}>
              {Array.from(line).map((character, index) => (
                <i style={{ "--char": start + index } as CSSProperties} key={`${character}-${index}`}>
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
  const rows = [[0, 1, 2], [3, 0, 2]];

  return (
    <aside className="dome-gallery" data-reveal="right" aria-label={isZh ? "论文场景案例预览" : "Paper scene case preview"}>
      <div className="dome-gallery__glow" aria-hidden="true" />
      <div className="dome-gallery__stage">
        {rows.map((row, rowIndex) => (
          <div className={`dome-gallery__row dome-gallery__row--${rowIndex + 1}`} key={rowIndex}>
            {row.map((sceneIndex, cardIndex) => (
              <figure className="dome-card" style={{ "--card": cardIndex } as CSSProperties} key={`${rowIndex}-${sceneIndex}`}>
                <div>
                  <img
                    src="./paper-assets/representative-scenes.png"
                    alt=""
                    style={{ "--scene": sceneIndex } as CSSProperties}
                  />
                </div>
                <figcaption>{String(sceneIndex + 1).padStart(2, "0")} · {sceneLabels[sceneIndex]}</figcaption>
              </figure>
            ))}
          </div>
        ))}
        <div className="dome-gallery__caption">
          <span>{isZh ? "案例样本 · 论文场景预览" : "CASE SAMPLES · PAPER SCENE PREVIEW"}</span>
          <strong>{isZh ? "一行信息，一行场景；悬停聚焦具体案例" : "One line of context, one line of scenes — hover to focus"}</strong>
          <small>{isZh ? "场景证据 · 任务约束 · 可诊断输出" : "Scene evidence · Task constraints · Diagnostic outputs"}</small>
        </div>
      </div>
      <a className="dome-gallery__link" href={isZh ? "#/zh/dataset" : "#/dataset"}>
        {isZh ? "查看数据集与样本字段" : "Inspect dataset and sample fields"}
        <Icon name="arrow" size={17} />
      </a>
    </aside>
  );
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
    { label: isZh ? "数据集" : "Dataset", path: isZh ? "/zh/dataset" : "/dataset", icon: "database" as const },
    { label: isZh ? "模型结果" : "Model Results", path: isZh ? "/zh/models" : "/models", icon: "filter" as const },
    { label: isZh ? "评测方法" : "Methodology", path: isZh ? "/zh/methodology" : "/methodology", icon: "shield" as const },
    { label: isZh ? "评测演示" : "Evaluation Demo", path: isZh ? "/zh/demo" : "/demo", icon: "play" as const },
    { label: isZh ? "论文" : "Paper", path: isZh ? "/zh/paper" : "/paper", icon: "file" as const }
  ];

  const metricPhrase = isZh
    ? "300 条样本 ✦ 测试了 6 个模型 ✦ 50+ 人参与 ✦ "
    : "300 INSTANCES ✦ SIX EVALUATED MODELS ✦ 50+ HUMAN PARTICIPANTS ✦ ";
  const ringText = metricPhrase.repeat(isZh ? 3 : 2);
  const triggerLabel = open ? (isZh ? "选择入口" : "Choose a path") : (isZh ? "开始探索" : "Start exploring");

  return (
    <div className={`orbit-explorer ${open ? "is-open" : ""}`}>
      <div className="orbit-explorer__halo" aria-hidden="true"><i /><i /><i /></div>
      <div className="orbit-metrics" aria-label={isZh ? "基准规模：300 条样本、测试了六个模型、50+ 人参与" : "Benchmark scale: 300 instances, six evaluated models and more than 50 human participants"}>
        <div className="orbit-metric">
          <span aria-hidden="true">
            {Array.from(ringText).map((character, characterIndex, characters) => (
              <i
                style={{ "--angle": `${(360 / characters.length) * characterIndex}deg` } as CSSProperties}
                key={`${character}-${characterIndex}`}
              >
                {character === " " ? "\u00a0" : character}
              </i>
            ))}
          </span>
        </div>
      </div>

      <button
        className="orbit-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="orbit-destinations"
        onClick={() => { setOpen((value) => !value); setSpark((value) => value + 1); }}
      >
        <span className="orbit-trigger__label" aria-label={triggerLabel}>
          <span aria-hidden="true">
            {Array.from(triggerLabel).map((character, index) => (
              <i style={{ "--label-char": index } as CSSProperties} key={`${character}-${index}`}>{character === " " ? "\u00a0" : character}</i>
            ))}
          </span>
        </span>
        <span className="orbit-trigger__live" aria-hidden="true"><i />LIVE <b /><b /><b /><b /></span>
        <Icon name={open ? "x" : "arrow"} size={20} />
        <span className="orbit-sparks" key={spark} aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i style={{ "--ray": index } as CSSProperties} key={index} />)}</span>
      </button>

      <nav className="orbit-destinations" id="orbit-destinations" aria-label={isZh ? "研究入口" : "Research destinations"}>
        {links.map((link, index) => (
          <a href={`#${link.path}`} className={`orbit-link orbit-link--${index + 1}`} aria-label={link.label} tabIndex={open ? 0 : -1} key={link.path}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <b><Icon name={link.icon} size={20} /></b>
            <span>{link.label}</span>
          </a>
        ))}
      </nav>

      <p className="orbit-explorer__hint">
        {open
          ? (isZh ? "将鼠标移到入口上查看聚焦效果，点击进入对应页面。" : "Hover to focus, then select a destination.")
          : (isZh ? "点击中心按钮，展开研究路径。" : "Select the center button to reveal the research paths.")}
      </p>
    </div>
  );
}
