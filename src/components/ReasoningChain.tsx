import { useState } from "react";
import { Icon } from "./Icons";

const chain = {
  zh: [
    ["观察场景", "读取图像、任务和四个候选动作，确定当前可观察信息边界。"],
    ["定位关键感知", "识别人群、通行限制、隔离设施以及环境风险。"],
    ["理解目标与约束", "区分完成任务的要求与安全执行必须满足的条件。"],
    ["形成动作判断", "将场景证据与任务要求连接到一个候选动作。"],
    ["检查安全红线", "核对风险源、禁行区域和不可违反的硬约束。"],
    ["评估风险响应", "检查风险识别、缓解措施与不确定性兜底。"],
    ["验证 PCA 链路", "确认感知支持认知，认知与感知共同支持行动。"],
    ["保留审计记录", "保存解析字段、门控状态、证据与专家复核信息。"]
  ],
  en: [
    ["Observe the scene", "Read the image, task and four actions while fixing the boundary of observable evidence."],
    ["Locate critical perceptions", "Identify people, access limits, barriers and environmental risks."],
    ["Interpret goal and constraints", "Separate task-completion requirements from conditions for safe execution."],
    ["Form an action judgment", "Connect scene evidence and task requirements to one candidate action."],
    ["Check safety red lines", "Test hazards, restricted areas and non-negotiable constraints."],
    ["Assess risk response", "Inspect risk awareness, mitigation and uncertainty fallback."],
    ["Verify PCA links", "Confirm that perception supports cognition and that both support action."],
    ["Preserve the audit trace", "Store parsed fields, gate states, evidence and expert-review information."]
  ]
} as const;

export function EvaluationReasoningChain({ locale = "en" }: { locale?: "zh" | "en" }) {
  const [active, setActive] = useState(0);
  const steps = chain[locale];
  return (
    <div className="reasoning-chain">
      <div className="reasoning-chain__track" role="tablist" aria-label={locale === "zh" ? "PCA-SC 评测思维链" : "PCA-SC evaluation reasoning chain"}>
        {steps.map(([title], index) => (
          <button type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : index < active ? "is-passed" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            {index < steps.length - 1 && <i><Icon name="arrow" size={16} /></i>}
          </button>
        ))}
      </div>
      <article className="reasoning-chain__detail" role="tabpanel">
        <span>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
        <div><small>{locale === "zh" ? "当前链路节点" : "ACTIVE CHAIN LINK"}</small><h3>{steps[active][0]}</h3><p>{steps[active][1]}</p></div>
        <strong>P → C → A <b>·</b> Safety <b>·</b> Consistency</strong>
      </article>
    </div>
  );
}
