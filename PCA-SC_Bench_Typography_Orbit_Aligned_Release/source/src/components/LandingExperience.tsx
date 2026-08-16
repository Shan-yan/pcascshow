import { useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { Icon } from "./Icons";

function moveSpotlight(event: MouseEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
}

export function SplitTitle({ text }: { text: string }) {
  return (
    <span className="split-title" aria-label={text}>
      <span aria-hidden="true">
        {Array.from(text).map((character, index) => (
          <i style={{ "--char": index } as CSSProperties} key={`${character}-${index}`}>
            {character === " " ? "\u00a0" : character}
          </i>
        ))}
      </span>
    </span>
  );
}

export function HeroCaseGallery({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const isZh = locale === "zh";
  const annotations = isZh
    ? [
        ["01", "场景证据", "站台、人群与通行空间共同构成决策上下文。"],
        ["02", "任务约束", "行动既要推进任务，也不能突破公共空间安全边界。"],
        ["03", "可诊断输出", "分别检查看见了什么、如何判断，以及最终如何行动。"]
      ]
    : [
        ["01", "Scene evidence", "Platforms, people and shared circulation form the decision context."],
        ["02", "Task constraint", "An action must advance the task without crossing a public-space safety boundary."],
        ["03", "Diagnostic output", "Inspect what was perceived, how it was judged and which action followed."]
      ];
  const sceneLabels = isZh
    ? ["候车大厅", "开放公共区域", "检票区域", "人群交互"]
    : ["Waiting hall", "Open public area", "Ticket check", "Crowd interaction"];

  return (
    <aside className="hero-evidence" data-reveal="right" aria-label={isZh ? "论文场景案例预览" : "Paper scene case preview"}>
      <div className="hero-evidence__topline">
        <span>{isZh ? "案例样本 · 论文场景预览" : "CASE SAMPLE · PAPER SCENE PREVIEW"}</span>
        <i>{isZh ? "非逐样本公开数据" : "Not a released instance"}</i>
      </div>
      <figure className="hero-evidence__figure">
        <div className="hero-evidence__scenes">
          {sceneLabels.map((label, index) => (
            <div className="hero-evidence__scene" key={label}>
              <img
                src="./paper-assets/representative-scenes.png"
                alt=""
                style={{ "--scene": index } as CSSProperties}
              />
              <span>{String(index + 1).padStart(2, "0")} · {label}</span>
            </div>
          ))}
        </div>
        <figcaption>
          <span>{isZh ? "观察区域" : "OBSERVE"}</span>
          <strong>{isZh ? "人群 · 通行区域 · 安全标识" : "People · circulation · safety cues"}</strong>
        </figcaption>
      </figure>
      <div className="hero-evidence__annotations">
        {annotations.map(([index, title, description]) => (
          <div key={index}>
            <span>{index}</span>
            <p><strong>{title}</strong>{description}</p>
          </div>
        ))}
      </div>
      <a href={isZh ? "#/zh/dataset" : "#/dataset"}>
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

  const stats = isZh
    ? [
        ["300 条样本 · 300 SAMPLES · ", "300 条样本"],
        ["测试了 6 个模型 · SIX MODELS · ", "测试了六个模型"],
        ["50+ 人参与 · HUMAN STUDY · ", "50+ 人参与人本评测"]
      ]
    : [
        ["300 INSTANCES · 300 INSTANCES · ", "300 benchmark instances"],
        ["SIX EVALUATED MODELS · SIX MODELS · ", "Six evaluated models"],
        ["50+ HUMAN PARTICIPANTS · HUMAN STUDY · ", "More than 50 human-study participants"]
      ];

  return (
    <div className={`orbit-explorer ${open ? "is-open" : ""}`}>
      <div className="orbit-explorer__halo" aria-hidden="true"><i /><i /><i /></div>
      <div className="orbit-metrics" aria-label={isZh ? "基准规模：300 条样本、测试了六个模型、50+ 人参与" : "Benchmark scale: 300 instances, six evaluated models and more than 50 human participants"}>
        {stats.map(([ring, label], index) => (
          <div className={`orbit-metric orbit-metric--${index + 1}`} aria-label={label} key={label}>
            <span aria-hidden="true">
              {Array.from(ring).map((character, characterIndex, characters) => (
                <i
                  style={{ "--angle": `${(360 / characters.length) * characterIndex}deg` } as CSSProperties}
                  key={`${character}-${characterIndex}`}
                >
                  {character === " " ? "\u00a0" : character}
                </i>
              ))}
            </span>
          </div>
        ))}
      </div>

      <button
        className="orbit-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="orbit-destinations"
        onClick={() => { setOpen((value) => !value); setSpark((value) => value + 1); }}
      >
        <span>{open ? (isZh ? "选择入口" : "Choose a path") : (isZh ? "开始探索" : "Start exploring")}</span>
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
