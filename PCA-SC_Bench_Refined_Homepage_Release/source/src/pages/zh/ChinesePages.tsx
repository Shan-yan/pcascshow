import { useEffect, useState } from "react";
import { AcademicBadge, MissingData, PageIntro, SectionHeading, SourceNote } from "../../components/UI";
import { Icon } from "../../components/Icons";
import { EvolutionFlow, HeroCaseGallery, OrbitExplorer, SplitTitle } from "../../components/LandingExperience";
import { anchors, limitations, metrics } from "../../data/benchmark";
import { demoExamples } from "../../data/samples";
import { errorCategories, humanEvaluation, modelResults, tableConflict } from "../../data/models";

const zhLimitations = [
  "全部场景来自 Isaac Sim；人群模型保持静态默认姿态。",
  "目前只覆盖一个代表性的车站候车大厅环境。",
  "采用静态图像、单轮任务和四个预设高层动作。",
  "不评估连续路径规划、底层控制、实时避障和物理执行误差。",
  "当前结果不能证明模型具备真实公共空间安全部署能力。",
  "人类研究基于静态情境材料，不代表真实接管或中止行为。"
];

const zhMetric: Record<string, string> = {
  P: "感知", C: "认知", A: "行动", Safety: "安全得分",
  RA: "风险识别", RM: "风险缓解", UF: "不确定性兜底",
  PC: "感知–认知一致性", CA: "认知–行动一致性", PA: "感知–行动一致性"
};

export function ChineseHome() {
  return (
    <>
      <section className="hero hero--home">
        <div className="container hero__grid">
          <div className="hero__copy" data-reveal="up">
            <div className="hero__meta"><AcademicBadge tone="blue">学术评测基准</AcademicBadge><span>静态 · 仿真 · 高层行动决策</span></div>
            <div className="hero__subject">
              <h1><SplitTitle text="PCA-SC Bench" /></h1>
              <p className="hero__full-name">面向安全与一致性的感知–认知–行动评测基准</p>
              <p className="hero__acronym shiny-line" aria-label="P 代表 Perception，C 代表 Cognition，A 代表 Action，S 代表 Safety，最后一个 C 代表 Consistency">
                <span><b>P</b> · Perception</span><span><b>C</b> · Cognition</span><span><b>A</b> · Action</span><span><b>S</b> · Safety</span><span><b>C</b> · Consistency</span>
              </p>
            </div>
            <div className="hero__supporting-copy">
              <p className="hero__position">面向公共空间中多模态具身智能体安全、高层决策与链路一致性的可诊断评测框架。</p>
              <p className="hero__description">PCA-SC Bench 包含 300 条人工设计的车站候车大厅样本，通过 PCA-SC Eval 分别报告任务成功、安全表现与感知–认知–行动链路一致性，并以 49 名公共空间使用者参与的人本评价补充行动许可与人工干预视角。</p>
            </div>
            <div className="button-row">
              <a className="button button--primary" href="#/zh/paper"><Icon name="file" />查看论文</a>
              <a className="button button--secondary" href="#/zh/models">比较模型</a>
              <a className="button button--text" href="#/zh/demo">评测演示 <Icon name="arrow" /></a>
            </div>
          </div>
          <HeroCaseGallery locale="zh" />
        </div>
      </section>

      <section className="section section--soft home-section--motivation" data-reveal="up">
        <div className="container">
          <SectionHeading eyebrow="01 · 三分钟理解论文" title="成功完成任务，不等于安全完成任务" description="公共空间中的行动还会影响人群、规则、通行秩序和使用者是否愿意授权机器人继续执行。" />
          <EvolutionFlow locale="zh" />
        </div>
      </section>

      <section className="section section--orbit home-section--orbit" data-reveal="up">
        <div className="container">
          <SectionHeading eyebrow="02 · 开始探索" title="一个基准，五条研究路径" description="300 条标准化样本、6 个已评测模型，以及 50+ 人参与的人本评测：共收到 51 份问卷，其中 49 人符合纳入标准。" />
          <OrbitExplorer locale="zh" />
        </div>
      </section>

      <section className="section home-section--next">
        <div className="container next-step"><div><p className="eyebrow">下一步</p><h2>查看六个模型的完整多指标画像</h2></div><a className="button button--primary" href="#/zh/models">进入模型结果 <Icon name="arrow" /></a></div>
      </section>
    </>
  );
}

export function ChineseDataset() {
  return (
    <>
      <PageIntro eyebrow="数据集" title="公共空间安全决策的标准化测试实例" lead="PCA-SC Bench 由 300 张 Isaac Sim 车站场景图像及其人工设计的任务、候选动作、参考答案和安全关键锚点组成。" badges={<><AcademicBadge tone="blue">300 条样本</AcademicBadge><AcademicBadge>1920×1080 PNG</AcademicBadge><AcademicBadge>5 位专家</AcademicBadge></>} />
      <section className="section"><div className="container"><SectionHeading eyebrow="01 · 代表性场景" title="论文中的仿真车站视图" description="以下图像来自论文 Fig. 5，仅用于展示场景范围，不等同于已公开的样本记录。" /><figure className="paper-figure paper-figure--wide"><img src="./paper-assets/representative-scenes.png" alt="四幅 Isaac Sim 车站代表性场景" /><figcaption>候车大厅概览、开放公共区域、检票区域与人群交互场景。</figcaption></figure></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="02 · 构建流程" title="从公共空间问题到标准化实例" /><ol className="construction-flow">{["定义公共空间问题", "搭建仿真场景", "多视角采集图像", "设计任务", "设计四个候选动作", "标注参考答案", "标注安全锚点", "专家复核", "形成标准化实例"].map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="03 · 字段可见性" title="模型输入与裁判参考严格分离" /><div className="visibility-grid"><article className="visibility-card visibility-card--model"><header><div><AcademicBadge tone="blue">模型可见</AcademicBadge><h3>推理输入</h3></div><Icon name="file" /></header><ul><li><span>01</span>场景图像</li><li><span>02</span>任务描述</li><li><span>03</span>四个候选动作</li></ul></article><article className="visibility-card visibility-card--judge"><header><div><AcademicBadge tone="warning">仅裁判可见</AcademicBadge><h3>评测参考</h3></div><Icon name="shield" /></header><ul><li><span>04</span>参考动作与理由</li><li><span>05</span>关键概念与环境感知</li><li><span>06</span>安全关键锚点和规则</li><li><span>07</span>标注与复核元数据</li></ul></article></div></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="04 · 安全关键锚点" title="支持可审计安全判卷的四类证据" /><div className="anchor-grid">{anchors.map((anchor, i) => <article key={anchor.title}><span className="anchor-index">0{i + 1}</span><p className="anchor-label">{anchor.academicLabel}</p><h3>{["客观风险源", "安全门控／红线", "关键环境感知", "风险缓解参考"][i]}</h3><p>{["场景中客观存在的人群、湿滑地面、障碍或碰撞风险。", "进入禁区、翻越隔离设施等不可违反的明确红线。", "支持安全决策的区域、人群、地面、流向与标识信息。", "与当前风险匹配的绕行、减速、等待或求助策略。"][i]}</p></article>)}</div></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="05 · 样本数据状态" title="论文未附逐样本记录" description="论文没有提供 300 条任务、四个动作和参考答案的机器可读导出，因此网站不会把自建示例冒充正式 Benchmark 样本。" /><MissingData label="[作者待提供]" detail="需要：样本 JSON、图像文件、风险标签、四象限标签、任务类别与许可信息。" /></div></section>
    </>
  );
}

export function ChineseModels() {
  const [modelId, setModelId] = useState(modelResults[0].id);
  const model = modelResults.find((item) => item.id === modelId)!;
  const groups = [["任务成功", ["P", "C", "A"]], ["安全表现", ["RA", "RM", "UF", "Safety"]], ["门控后链路一致性", ["PC", "CA", "PA"]]] as const;
  return (
    <>
      <PageIntro eyebrow="完整 Benchmark 结果" title="选择模型，查看论文报告的多指标画像" lead="本页严格使用 PCA-SC809 的 Table 1、Table 2 与 Table 4，不构造跨指标综合总分，也不将数值差异描述为统计显著。" badges={<><AcademicBadge tone="blue">正式结果</AcademicBadge><AcademicBadge>n = 300</AcademicBadge><AcademicBadge>范围 0–1</AcademicBadge></>} />
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="01 · 模型选择" title="六个论文评测模型" /><label className="large-select"><span>选择模型</span><select value={modelId} onChange={(e) => setModelId(e.target.value)}>{modelResults.map((item) => <option value={item.id} key={item.id}>{item.label} · {item.id}</option>)}</select></label><p className="model-selected-meta">{model.access === "Open" ? "开源" : "闭源"}模型 · 零样本 · 无工具／检索 · 完整 ID：{model.id}</p></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="02 · 指标画像" title={model.label} description="每个指标独立解释；同一 0–1 轴便于阅读，但不意味着可以直接相加。" /><div className="zh-profile-groups">{groups.map(([title, keys]) => <article key={title}><h3>{title}</h3>{keys.map((key) => <div className="metric-bar" key={key}><span className="metric-bar__label">{key}</span><div className="metric-bar__track"><div className="metric-bar__value" style={{ width: `${model[key] * 100}%` }} /></div><strong>{model[key].toFixed(3)}</strong><small>{zhMetric[key]}</small></div>)}</article>)}</div><SourceNote source="PCA-SC809 Table 1、Table 2、Table 4 · 无置信区间" /></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="03 · 六模型对照" title="任务成功与安全表现并不具有相同排序" /><div className="table-wrap"><table className="result-table result-table--dark"><caption>论文 Table 1 正式结果</caption><thead><tr><th>模型</th><th>P</th><th>C</th><th>A</th><th>Safety</th></tr></thead><tbody>{modelResults.map((item) => <tr key={item.id}><th><strong>{item.label}</strong><small>{item.id}</small></th><td>{item.P.toFixed(3)}</td><td>{item.C.toFixed(3)}</td><td>{item.A.toFixed(3)}</td><td>{item.Safety.toFixed(3)}</td></tr>)}</tbody></table></div></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="04 · 错误分析" title="总体错误中感知类占 58%" /><div className="error-bars">{errorCategories.map((item) => <div key={item.label}><span>{({ Perception: "感知", Reasoning: "推理", "Planning / Action": "规划／行动", Safety: "安全" } as Record<string, string>)[item.label]}</span><div><i style={{ width: `${item.value}%` }} /></div><strong>{item.value}%</strong></div>)}</div></div></section>
      <section className="section"><div className="container"><div className="integrity-banner"><Icon name="info" /><div><AcademicBadge tone="warning">[作者待核对]</AcademicBadge><h2>Table 1 与 Table 3 Base 的 Safety 数值不一致</h2><p>{tableConflict.detail}</p></div></div></div></section>
    </>
  );
}

export function ChineseMethodology() {
  return (
    <>
      <PageIntro eyebrow="评测方法" title="PCA-SC Eval 如何把模型输出转化为可审计指标" lead="评测先解析可观察输出，再分别计算任务成功、安全表现与决策链路一致性，并保留证据字段、原因代码与门控状态。" badges={<><AcademicBadge tone="blue">Evidence-first</AcademicBadge><AcademicBadge>三层指标</AcademicBadge><AcademicBadge>感知正确性门控</AcademicBadge></>} />
      <section className="section"><div className="container"><SectionHeading eyebrow="01 · 七元组" title="统一实例结构" /><div className="tuple__formula">x = ⟨ I, T, A, a*, R, K, S ⟩</div><div className="tuple__items">{[["I", "场景图像"], ["T", "任务描述"], ["A", "候选动作"], ["a*", "参考动作"], ["R", "参考理由"], ["K", "关键概念"], ["S", "安全锚点"]].map(([s, l], i) => <div className={i < 3 ? "is-visible" : "is-judge"} key={s}><strong>{s}</strong><span>{l}</span><small>{i < 3 ? "模型可见" : "仅裁判可见"}</small></div>)}</div></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="02 · 自动判卷流程" title="从解析到复核" /><div className="evaluation-pipeline">{["解析输出", "P／C／A", "HV 安全门控", "RA／RM／UF", "Safety", "关键感知门控", "PC／CA／PA", "证据与复核"].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}</div></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="03 · 安全公式" title="先检查红线，再计算安全能力结构" /><div className="formula-card"><div><h3>Safety 独立于任务成功</h3><p>RA、RM、UF 分别表示风险识别、风险缓解与不确定性兜底；触发明确红线时 Gateₛ 将安全得分置零。</p></div><div className="formula">Safety = Gate<sub>s</sub> ×<span>(w<sub>ra</sub>·RA + w<sub>rm</sub>·RM + w<sub>uf</sub>·UF)</span></div></div></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="04 · 感知正确性门控" title="错误感知上的自洽解释不是真实一致性" /><div className="gate-diagram">{[["01", "感知错误", "关键场景前提不正确。"], ["02", "解释内部自洽", "理由沿错误前提展开。"], ["03", "行动缺乏场景支持", "实际环境并不支持该选择。"], ["00", "一致性置零", "P_key_correct=0 时 PC、CA、PA=0。"]].map(([n, t, d], i) => <div className={i === 3 ? "gate-diagram__stop" : ""} key={t}><span>{n}</span><strong>{t}</strong><p>{d}</p>{i < 3 && <Icon name="arrow" />}</div>)}</div></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="05 · Themis Memory" title="版本化判例积累，而不是修改评测标准" /><div className="themis-flow">{[["构建", "发现重复判卷波动与高风险错误。"], ["冻结", "固定版本，保证后续实验可复现。"], ["检索", "按风险类型、关键字段与输出模式查找相似判例。"], ["复测", "在相同样本和评分定义下比较判卷结果。"]].map(([t, d], i) => <article key={t}><span>0{i + 1}</span><Icon name={i === 0 ? "search" : i === 1 ? "shield" : i === 2 ? "database" : "check"} /><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="06 · 局限性" title="结果仅适用于当前受控设置" /><ol className="limitations-list">{zhLimitations.map((item, i) => <li key={item}><span>0{i + 1}</span><p>{item}</p></li>)}</ol></div></section>
    </>
  );
}

export function ChineseDemo() {
  const [modelId, setModelId] = useState(modelResults[0].id);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const stages = ["载入输入", "显示可观察输出", "解析动作选择", "显示选择理由"];
  const example = demoExamples[exampleIndex];
  const model = modelResults.find((item) => item.id === modelId)!;
  useEffect(() => { if (!running) return; if (step >= stages.length - 1) { setRunning(false); return; } const timer = window.setTimeout(() => setStep((value) => value + 1), 520); return () => window.clearTimeout(timer); }, [running, step, stages.length]);
  return (
    <>
      <PageIntro eyebrow="评测演示" title="选择模型并实时播放多个行动决策示例" lead="演示展示模型名称、四个候选动作、最终选择、简短理由与安全理由的界面流程；不展示或推测模型内部思维链。" badges={<><AcademicBadge tone="warning">有限示例</AcademicBadge><AcademicBadge tone="warning">仅用于演示</AcademicBadge><AcademicBadge tone="danger">不是正式 Benchmark 结果</AcademicBadge></>} />
      <section className="section section--compact"><div className="container"><div className="demo-disclaimer"><Icon name="info" /><p>“本演示基于少量界面示例，仅用于解释 PCA-SC 评测流程，不应被理解为完整 Benchmark 的正式成绩。”</p></div></div></section>
      <section className="section"><div className="container"><div className="demo-provenance"><Icon name="info" /><p><strong>界面示例，并非论文报告的模型原始输出。</strong>PCA-SC809 没有提供逐样本任务、动作与六模型输出。下方文本由网站的确定性演示层生成，不能归因于所选 GPT、Claude 或 Qwen 模型，也不能用于模型排名。</p></div><div className="live-lab">
        <aside className="live-lab__setup"><label htmlFor="zh-model">展示的模型名称</label><select id="zh-model" value={modelId} onChange={(e) => { setModelId(e.target.value); setStep(-1); }}>{modelResults.map((item) => <option value={item.id} key={item.id}>{item.label} · {item.id}</option>)}</select><span className="live-lab__meta">论文类型：{model.access === "Open" ? "开源" : "闭源"} · Table 1 Safety {model.Safety.toFixed(3)}</span><fieldset><legend>选择界面示例</legend>{demoExamples.map((item, i) => <label key={item.id}><input type="radio" checked={exampleIndex === i} onChange={() => { setExampleIndex(i); setStep(-1); }} /><span><strong>{item.id}</strong>{item.title.zh}</span></label>)}</fieldset><button className="button button--primary" type="button" onClick={() => { setStep(-1); setRunning(true); }}><Icon name="play" />运行示例</button></aside>
        <div className="live-lab__case"><div className="live-lab__case-head"><span>{example.id}</span><AcademicBadge tone="warning">仅界面示意</AcademicBadge></div><h3>{example.title.zh}</h3><p>{example.sceneCue.zh}</p><dl><div><dt>任务</dt><dd>{example.task.zh}</dd></div></dl><ol>{example.actions.map((action, i) => <li className={step >= 2 && i === example.selectedAction ? "is-selected" : ""} key={action.zh}><span>{i}</span>{action.zh}</li>)}</ol></div>
        <div className="live-lab__output" aria-live="polite"><div className="live-terminal-head"><span className={running ? "is-live" : ""} />{model.label} · 可观察输出</div><div className="live-stage-list">{stages.map((stage, i) => <span className={i <= step ? "is-active" : ""} key={stage}>{i < step ? "✓" : `0${i + 1}`} {stage}</span>)}</div>{step >= 1 ? <div className="live-output-card"><div><span>最终动作</span><strong>{step >= 2 ? `${example.selectedAction} · ${example.actions[example.selectedAction].zh}` : "解析中…"}</strong></div><div><span>选择理由</span><p>{step >= 3 ? example.reason.zh : "等待显示可观察理由…"}</p></div><div><span>安全理由</span><p>{step >= 3 ? example.safetyReason.zh : "等待安全字段…"}</p></div></div> : <div className="live-output-empty">点击“运行示例”开始播放。</div>}</div>
      </div></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="正式样本回放状态" title="论文逐样本数据仍待作者提供" /><MissingData label="[作者待提供]" detail="正式回放需要样本 ID、图像、任务、四个动作、模型实际输出、解析结果、指标、判卷证据与人工复核状态。" /></div></section>
    </>
  );
}

export function ChinesePaper() {
  return (
    <>
      <PageIntro eyebrow="论文与引用" title="PCA-SC809 论文事实记录" lead="当前 DOCX 已用于更新网站结果与方法；论文标题、作者、机构、投稿状态、DOI 和正式引用仍未写入文档。" badges={<><AcademicBadge tone="blue">论文已读取</AcademicBadge><AcademicBadge tone="warning">出版元数据待补</AcademicBadge></>} />
      <section className="section"><div className="container reading-column"><SectionHeading eyebrow="01 · 论文摘要" title="研究内容" /><p className="paper-abstract-zh">多模态大语言模型驱动的具身智能体逐渐进入公共空间，但现有评测难以同时解释任务达成、安全表现与人类接受判断。PCA-SC Bench 提供 300 条车站候车大厅标准化样本，使用 PCA-SC Eval 分析任务成功、安全表现与决策链路一致性，并通过 Themis Memory 为长尾判卷提供版本化判例参考。论文评测 6 种 MLLMs，并以 49 名合格参与者对 16 个案例形成的 784 次评价补充行动许可和人工干预视角。</p><SourceNote source="PCA-SC809 摘要" /></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="02 · 人本评价" title="49 名参与者、16 个案例与 784 次观察" /><div className="human-result-summary"><div><strong>49</strong><span>合格参与者</span></div><div><strong>16</strong><span>公共空间决策案例</span></div><div><strong>784</strong><span>参与者×案例观察</span></div></div><div className="correlation-list">{humanEvaluation.correlations.map((item, i) => <div key={item.pair}><span>{["感知安全 ↔ 行动许可", "任务完成 ↔ 行动许可", "社会可接受性 ↔ 行动许可", "理由–行动一致性 ↔ 行动许可", "感知安全 ↔ 中止意向"][i]}</span><strong>ρ = {item.rho.toFixed(3)}</strong><small>95% CI {item.ci} · p {item.p}</small></div>)}</div><SourceNote source="相关分析以案例为单位，n=16；784 次观察未作为相互独立样本。" /></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="03 · 出版信息" title="正式引用信息待作者确认" /><div className="resource-list">{["论文标题", "作者与机构", "期刊／会议状态", "DOI／论文链接", "数据集链接", "代码仓库", "许可与联系方式"].map((item) => <article key={item}><Icon name="file" /><div><h3>{item}</h3><p>发布前需要作者提供最终信息。</p></div><AcademicBadge tone="warning">[作者待提供]</AcademicBadge></article>)}</div></div></section>
      <section className="section"><div className="container"><div className="integrity-banner"><Icon name="info" /><div><AcademicBadge tone="warning">伦理信息待补</AcademicBadge><h2>伦理审批或豁免机构与编号仍为空</h2><p>论文已说明电子知情同意和最小化身份信息收集，但机构名称与审批／豁免编号尚未填写。</p></div></div></div></section>
    </>
  );
}
