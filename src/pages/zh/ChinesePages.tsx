import { lazy, Suspense, useEffect, useState } from "react";
import { AcademicBadge, MissingData, SectionHeading, SourceNote } from "../../components/UI";
import { Icon } from "../../components/Icons";
import { PagePortal } from "../../components/PagePortal";
import { DatasetQuadrantFolders } from "../../components/DatasetQuadrants";
import { DarkVeilBackground, EvolutionFlow, HeroCaseGallery, OrbitExplorer, SplitTitle } from "../../components/LandingExperience";
import { GlassActionLinks } from "../../components/HomeActions";
import { ConstructionChain, VisibilityMasonry } from "../../components/DatasetExperience";
import { EvaluationExperience } from "../../components/EvaluationExperience";
import { EvaluationReasoningChain } from "../../components/ReasoningChain";
import { anchors, limitations, metrics } from "../../data/benchmark";
import { demoExamples } from "../../data/samples";
import { errorCategories, humanEvaluation, modelResults } from "../../data/models";

const ModelRadarGrid = lazy(() => import("../../components/ModelRadar").then((module) => ({ default: module.ModelRadarGrid })));

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
            <div className="hero__subject">
              <h1><SplitTitle text="PCA-SC Bench" /></h1>
              <p className="hero__full-name">面向安全与一致性的感知–认知–行动评测基准</p>
              <p className="hero__acronym shiny-line" aria-label="P 代表 Perception，C 代表 Cognition，A 代表 Action，S 代表 Safety，最后一个 C 代表 Consistency">
                <span><b>P</b> · Perception</span><span><b>C</b> · Cognition</span><span><b>A</b> · Action</span><span><b>S</b> · Safety</span><span><b>C</b> · Consistency</span>
              </p>
            </div>
            <div className="hero__supporting-copy">
              <p className="hero__position">面向公共空间中多模态具身智能体安全、高层决策与链路一致性的可诊断评测框架。</p>
              <p className="hero__description">PCA-SC Bench 包含 300 条人工设计的车站候车大厅样本，通过 PCA-SC Eval 分别报告任务成功、安全表现与感知–认知–行动链路一致性，并以 50+ 名公共空间使用者参与的人本评价补充行动许可与人工干预视角。</p>
            </div>
            <GlassActionLinks locale="zh" />
          </div>
          <HeroCaseGallery locale="zh" />
        </div>
      </section>

      <section className="section section--soft home-section--motivation" data-reveal="up">
        <div className="container">
          <SectionHeading eyebrow="01 · 论文主思路" title="成功完成任务，不等于安全完成任务" description="公共空间中的行动还会影响人群、规则、通行秩序和使用者是否愿意授权机器人继续执行。" />
          <EvolutionFlow locale="zh" />
        </div>
      </section>

      <section className="section section--orbit home-section--orbit" data-reveal="up">
        <DarkVeilBackground />
        <div className="container">
          <SectionHeading eyebrow="02 · 开始探索" title="PCA-SC研究内容" description="300 条标准化样本、6 个已评测模型，以及 50+ 人参与的人本评测" />
          <OrbitExplorer locale="zh" />
        </div>
      </section>

      <section className="section home-section--next">
        <div className="container next-step"><div><p className="eyebrow">下一步</p><h2>查看六个模型的评测结果</h2></div><a className="button button--primary" href="#/zh/models">进入评测结果 <Icon name="arrow" /></a></div>
      </section>
    </>
  );
}

export function ChineseDataset() {
  return (
    <>
      <PagePortal kind="dataset" locale="zh" />
      <DatasetQuadrantFolders locale="zh" />
      <section className="section section--soft construction-chain-section"><div className="container"><SectionHeading eyebrow="02 · 链式构建过程" title="从公共空间问题到标准化实例" description="把鼠标移动到任一步骤，即可查看该阶段具体完成的工作。" /><ConstructionChain locale="zh" /></div></section>
      <section className="section visibility-masonry-section"><div className="container"><SectionHeading eyebrow="03 · 字段可见性" title="模型输入与裁判参考严格分离" description="两类字段独立呈现；悬停后以 Masonry 形式展开具体内容。" /><VisibilityMasonry locale="zh" /></div></section>
    </>
  );
}

export function ChineseModels() {
  const [modelId, setModelId] = useState(modelResults[0].id);
  const model = modelResults.find((item) => item.id === modelId)!;
  const groups = [["任务成功", ["P", "C", "A"]], ["安全表现", ["RA", "RM", "UF", "Safety"]], ["门控后链路一致性", ["PC", "CA", "PA"]]] as const;
  return (
    <div className="results-page">
      <PagePortal kind="models" locale="zh" />
      <section className="section model-radar-section"><div className="container"><SectionHeading eyebrow="01 · 六模型雷达画像" title="先查看六个模型的完整能力轮廓" description="雷达图展示感知、认知、行动、安全、不确定性兜底与链路一致性；链路一致性仅以 PC、CA、PA 均值用于可视化，不构造综合总分。" /><Suspense fallback={<div className="radar-loading">正在载入六个模型的雷达画像…</div>}><ModelRadarGrid locale="zh" /></Suspense><SourceNote source="PCA-SC809 Table 1、Table 2、Table 4 · 所有坐标范围 0–1" /></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="02 · 模型选择" title="选择具体模型查看数据" /><label className="large-select"><span>选择模型</span><select value={modelId} onChange={(e) => setModelId(e.target.value)}>{modelResults.map((item) => <option value={item.id} key={item.id}>{item.label} · {item.id}</option>)}</select></label><p className="model-selected-meta">{model.access === "Open" ? "开源" : "闭源"}模型 · 零样本 · 无工具／检索 · 完整 ID：{model.id}</p></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="03 · 指标画像" title={model.label} description="每个指标独立解释；同一 0–1 轴便于阅读，但不意味着可以直接相加。" /><div className="zh-profile-groups">{groups.map(([title, keys]) => <article key={title}><h3>{title}</h3>{keys.map((key) => <div className="metric-bar" key={key}><span className="metric-bar__label">{key}</span><div className="metric-bar__track"><div className="metric-bar__value" style={{ width: `${model[key] * 100}%` }} /></div><strong>{model[key].toFixed(3)}</strong><small>{zhMetric[key]}</small></div>)}</article>)}</div><SourceNote source="PCA-SC809 Table 1、Table 2、Table 4 · 无置信区间" /></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="04 · 六模型对照" title="任务成功与安全表现并不具有相同排序" /><div className="table-wrap"><table className="result-table result-table--dark"><caption>论文 Table 1 正式结果</caption><thead><tr><th>模型</th><th>P</th><th>C</th><th>A</th><th>Safety</th></tr></thead><tbody>{modelResults.map((item) => <tr key={item.id}><th><strong>{item.label}</strong><small>{item.id}</small></th><td>{item.P.toFixed(3)}</td><td>{item.C.toFixed(3)}</td><td>{item.A.toFixed(3)}</td><td>{item.Safety.toFixed(3)}</td></tr>)}</tbody></table></div></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="05 · 错误分析" title="总体错误中感知类占 58%" /><div className="error-bars">{errorCategories.map((item) => <div key={item.label}><span>{({ Perception: "感知", Reasoning: "推理", "Planning / Action": "规划／行动", Safety: "安全" } as Record<string, string>)[item.label]}</span><div><i style={{ width: `${item.value}%` }} /></div><strong>{item.value}%</strong></div>)}</div></div></section>
    </div>
  );
}

export function ChineseMethodology() {
  return (
    <>
      <PagePortal kind="methodology" locale="zh" />
      <section className="section"><div className="container"><SectionHeading eyebrow="01 · 七元组" title="统一实例结构" /><div className="tuple__formula">x = ⟨ I, T, A, a*, R, K, S ⟩</div><div className="tuple__items">{[["I", "场景图像"], ["T", "任务描述"], ["A", "候选动作"], ["a*", "参考动作"], ["R", "参考理由"], ["K", "关键概念"], ["S", "安全锚点"]].map(([s, l], i) => <div className={i < 3 ? "is-visible" : "is-judge"} key={s}><strong>{s}</strong><span>{l}</span><small>{i < 3 ? "模型可见" : "仅裁判可见"}</small></div>)}</div></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="02 · 可观察评测思维链" title="PCA-SC Eval 如何形成可审计判断" description="沿连接线从场景观察推进到审计记录；悬停或点击节点可查看当前链路工作。" /><EvaluationReasoningChain locale="zh" /></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="03 · 安全公式" title="先检查红线，再计算安全能力结构" /><div className="formula-card"><div><h3>Safety 独立于任务成功</h3><p>RA、RM、UF 分别表示风险识别、风险缓解与不确定性兜底；触发明确红线时 Gateₛ 将安全得分置零。</p></div><div className="formula">Safety = Gate<sub>s</sub> ×<span>(w<sub>ra</sub>·RA + w<sub>rm</sub>·RM + w<sub>uf</sub>·UF)</span></div></div></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="04 · 感知正确性门控" title="错误感知上的自洽解释不是真实一致性" /><div className="gate-diagram">{[["01", "感知错误", "关键场景前提不正确。"], ["02", "解释内部自洽", "理由沿错误前提展开。"], ["03", "行动缺乏场景支持", "实际环境并不支持该选择。"], ["00", "一致性置零", "P_key_correct=0 时 PC、CA、PA=0。"]].map(([n, t, d], i) => <div className={i === 3 ? "gate-diagram__stop" : ""} key={t}><span>{n}</span><strong>{t}</strong><p>{d}</p>{i < 3 && <Icon name="arrow" />}</div>)}</div></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="05 · Themis Memory" title="版本化判例积累，而不是修改评测标准" /><div className="themis-flow">{[["构建", "发现重复判卷波动与高风险错误。"], ["冻结", "固定版本，保证后续实验可复现。"], ["检索", "按风险类型、关键字段与输出模式查找相似判例。"], ["复测", "在相同样本和评分定义下比较判卷结果。"]].map(([t, d], i) => <article key={t}><span>0{i + 1}</span><Icon name={i === 0 ? "search" : i === 1 ? "shield" : i === 2 ? "database" : "check"} /><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
      <section className="section"><div className="container"><SectionHeading eyebrow="06 · 局限性" title="结果仅适用于当前受控设置" /><ol className="limitations-list">{zhLimitations.map((item, i) => <li key={item}><span>0{i + 1}</span><p>{item}</p></li>)}</ol></div></section>
    </>
  );
}

export function ChineseDemo() {
  return (
    <>
      <PagePortal kind="demo" locale="zh" />
      <EvaluationExperience locale="zh" />
    </>
  );
}

export function ChinesePaper() {
  return (
    <>
      <PagePortal kind="paper" locale="zh" />
      <section className="section"><div className="container reading-column"><SectionHeading eyebrow="01 · 论文摘要" title="研究内容" /><p className="paper-abstract-zh">多模态大语言模型驱动的具身智能体逐渐进入公共空间，但现有评测难以同时解释任务达成、安全表现与人类接受判断。PCA-SC Bench 提供 300 条车站候车大厅标准化样本，使用 PCA-SC Eval 分析任务成功、安全表现与决策链路一致性，并通过 Themis Memory 为长尾判卷提供版本化判例参考。论文评测 6 种 MLLMs，并以 49 名合格参与者对 16 个案例形成的 784 次评价补充行动许可和人工干预视角。</p><SourceNote source="PCA-SC809 摘要" /></div></section>
      <section className="section section--soft"><div className="container"><SectionHeading eyebrow="02 · 人本评价" title="49 名参与者、16 个案例与 784 次观察" /><div className="human-result-summary"><div><strong>49</strong><span>合格参与者</span></div><div><strong>16</strong><span>公共空间决策案例</span></div><div><strong>784</strong><span>参与者×案例观察</span></div></div><div className="correlation-list">{humanEvaluation.correlations.map((item, i) => <div key={item.pair}><span>{["感知安全 ↔ 行动许可", "任务完成 ↔ 行动许可", "社会可接受性 ↔ 行动许可", "理由–行动一致性 ↔ 行动许可", "感知安全 ↔ 中止意向"][i]}</span><strong>ρ = {item.rho.toFixed(3)}</strong><small>95% CI {item.ci} · p {item.p}</small></div>)}</div><SourceNote source="相关分析以案例为单位，n=16；784 次观察未作为相互独立样本。" /></div></section>
      <section className="section section--ink"><div className="container"><SectionHeading eyebrow="03 · 出版信息" title="正式引用信息待作者确认" /><div className="resource-list">{["论文标题", "作者与机构", "期刊／会议状态", "DOI／论文链接", "数据集链接", "代码仓库", "许可与联系方式"].map((item) => <article key={item}><Icon name="file" /><div><h3>{item}</h3><p>发布前需要作者提供最终信息。</p></div><AcademicBadge tone="warning">[作者待提供]</AcademicBadge></article>)}</div></div></section>
      <section className="section"><div className="container"><div className="integrity-banner"><Icon name="info" /><div><AcademicBadge tone="warning">伦理信息待补</AcademicBadge><h2>伦理审批或豁免机构与编号仍为空</h2><p>论文已说明电子知情同意和最小化身份信息收集，但机构名称与审批／豁免编号尚未填写。</p></div></div></div></section>
    </>
  );
}
