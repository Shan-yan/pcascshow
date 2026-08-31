import { Icon } from "./Icons";

const construction = {
  zh: [
    ["定义公共空间问题", "人群交互、通行秩序、禁行区域、隔离设施与碰撞风险"],
    ["搭建仿真场景", "构建车站候车大厅典型公共空间环境"],
    ["多视角采集图像", "获取包含关键人员与环境信息的视觉场景"],
    ["设计任务", "设置同时涉及任务目标与安全约束的行动决策问题"],
    ["设计四个候选动作", "统一模型动作空间，形成标准化选择任务"],
    ["标注参考答案", "确定参考动作及支持该动作的参考依据"],
    ["标注安全锚点", "风险源、安全红线、关键感知、风险缓解参考"],
    ["专家复核", "检查场景、任务、答案及安全标注的一致性"],
    ["形成标准化实例", "分离模型可见字段与裁判可见字段，形成最终样本"]
  ],
  en: [
    ["Define the public-space problem", "Crowd interaction, flow order, restricted areas, barriers and collision risks."],
    ["Build the simulation scene", "Construct a representative station waiting-hall environment."],
    ["Capture multiple views", "Acquire visual scenes containing the critical people and environmental cues."],
    ["Design the task", "Create an action-decision problem involving both a goal and safety constraints."],
    ["Design four actions", "Standardize the model action space as a four-way selection task."],
    ["Annotate the reference", "Identify the reference action and the evidence supporting it."],
    ["Annotate safety anchors", "Record hazards, red lines, critical perceptions and mitigation references."],
    ["Expert review", "Check consistency across scene, task, answer and safety annotations."],
    ["Form the standard instance", "Separate model-visible and judge-visible fields to produce the final sample."]
  ]
} as const;

const visibility = {
  zh: {
    model: { badge: "模型可见", title: "推理输入", intro: "模型只能使用任务执行时能够观察到的信息。", items: ["场景图像", "任务描述", "候选动作 A", "动作 1", "动作 2", "动作 3", "动作 4"] },
    judge: { badge: "仅裁判可见", title: "评测参考", intro: "答案、锚点与复核字段仅在判卷阶段使用。", items: ["参考动作 a*", "参考理由 R", "关键概念 K", "风险源", "安全红线", "关键感知", "风险缓解", "复核元数据"] }
  },
  en: {
    model: { badge: "MODEL-VISIBLE", title: "Inference input", intro: "The model can use only information observable at task time.", items: ["Scene image", "Task description", "Candidate set A", "Action 1", "Action 2", "Action 3", "Action 4"] },
    judge: { badge: "JUDGE-ONLY", title: "Evaluation reference", intro: "Answers, anchors and review fields are reserved for judging.", items: ["Reference action a*", "Reference reason R", "Key concepts K", "Hazards", "Safety red lines", "Critical perceptions", "Risk mitigation", "Review metadata"] }
  }
} as const;

export function ConstructionChain({ locale = "en" }: { locale?: "zh" | "en" }) {
  return (
    <ol className="construction-chain">
      {construction[locale].map(([title, detail], index) => (
        <li tabIndex={0} key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{title}</strong>
          <i aria-hidden="true" />
          <aside><small>{locale === "zh" ? "我们的工作" : "OUR WORK"}</small><p>{detail}</p></aside>
        </li>
      ))}
    </ol>
  );
}

export function VisibilityMasonry({ locale = "en" }: { locale?: "zh" | "en" }) {
  const data = visibility[locale];
  return (
    <div className="visibility-masonry-grid">
      {(["model", "judge"] as const).map((kind) => {
        const card = data[kind];
        return (
          <article className={`visibility-masonry visibility-masonry--${kind}`} tabIndex={0} key={kind}>
            <header>
              <div><span>{card.badge}</span><h3>{card.title}</h3><p>{card.intro}</p></div>
              <Icon name={kind === "model" ? "file" : "shield"} size={29} />
            </header>
            <div className="visibility-masonry__items" aria-label={card.title}>
              {card.items.map((item, index) => <div style={{ "--tile": index } as React.CSSProperties} key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
            </div>
            <small className="visibility-masonry__hint">{locale === "zh" ? "悬停展开字段" : "HOVER TO REVEAL FIELDS"}</small>
          </article>
        );
      })}
    </div>
  );
}
