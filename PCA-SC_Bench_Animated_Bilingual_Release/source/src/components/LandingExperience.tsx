import { useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icons";

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
          <article className="evolution-card" style={{ "--step": itemIndex } as CSSProperties} key={title}>
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
        ["300", "条标准化样本", "车站公共空间"],
        ["6", "个评测模型", "开源与闭源 MLLMs"],
        ["50+", "人参与人本评测", "51 份问卷 · 49 人合格"]
      ]
    : [
        ["300", "standardized instances", "station public space"],
        ["6", "evaluated models", "open and closed MLLMs"],
        ["50+", "human-study respondents", "51 received · 49 eligible"]
      ];

  return (
    <div className={`orbit-explorer ${open ? "is-open" : ""}`}>
      <div className="orbit-explorer__halo" aria-hidden="true"><i /><i /><i /></div>
      <div className="orbit-stats" aria-label={isZh ? "基准规模" : "Benchmark scale"}>
        {stats.map(([value, label, note], index) => (
          <div className={`orbit-stat orbit-stat--${index + 1}`} key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>{note}</small>
          </div>
        ))}
      </div>

      <button
        className="orbit-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="orbit-destinations"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? (isZh ? "选择入口" : "Choose a path") : (isZh ? "开始探索" : "Start exploring")}</span>
        <Icon name={open ? "x" : "arrow"} size={20} />
      </button>

      <nav className="orbit-destinations" id="orbit-destinations" aria-label={isZh ? "研究入口" : "Research destinations"}>
        {links.map((link, index) => (
          <a href={`#${link.path}`} className={`orbit-link orbit-link--${index + 1}`} tabIndex={open ? 0 : -1} key={link.path}>
            <Icon name={link.icon} size={19} />
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
