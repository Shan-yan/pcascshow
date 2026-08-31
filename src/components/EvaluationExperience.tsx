import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { demoExamples } from "../data/samples";
import { modelResults } from "../data/models";
import { runBatchEvaluation } from "../services/evaluationApi";
import type { BatchEvaluationResult, EvaluationMetrics, EvaluationSample } from "../services/evaluationApi";
import { Icon } from "./Icons";
import { SectionHeading } from "./UI";

const metricKeys = ["P", "C", "A", "Safety", "RA", "RM", "UF", "PC", "CA", "PA"] as const;

function ScoreRadar({ metrics, locale }: { metrics: EvaluationMetrics; locale: "zh" | "en" }) {
  const axes = [
    ["P", metrics.P], ["C", metrics.C], ["A", metrics.A], [locale === "zh" ? "安全" : "Safety", metrics.Safety],
    ["RA", metrics.RA], ["RM", metrics.RM], ["UF", metrics.UF], ["PC", metrics.PC], ["CA", metrics.CA], ["PA", metrics.PA]
  ] as const;
  const center = 150;
  const radius = 112;
  const point = (index: number, scale: number) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / axes.length;
    return `${center + Math.cos(angle) * radius * scale},${center + Math.sin(angle) * radius * scale}`;
  };
  return (
    <div className="evaluation-score-radar">
      <svg viewBox="0 0 300 300" role="img" aria-label={locale === "zh" ? "十样本实时得分雷达图" : "Ten-sample live score radar"}>
        {[.25, .5, .75, 1].map((scale) => <polygon className="evaluation-score-radar__grid" points={axes.map((_, index) => point(index, scale)).join(" ")} key={scale} />)}
        {axes.map((_, index) => <line className="evaluation-score-radar__axis" x1={center} y1={center} x2={point(index, 1).split(",")[0]} y2={point(index, 1).split(",")[1]} key={index} />)}
        <polygon className="evaluation-score-radar__value" points={axes.map(([, value], index) => point(index, value)).join(" ")} />
        {axes.map(([label], index) => { const [x, y] = point(index, 1.16).split(","); return <text x={x} y={y} key={label}>{label}</text>; })}
      </svg>
      <div>{metricKeys.map((key) => <span key={key}><small>{key}</small><strong>{metrics[key].toFixed(3)}</strong></span>)}</div>
    </div>
  );
}

export function EvaluationExperience({ locale = "en" }: { locale?: "zh" | "en" }) {
  const zh = locale === "zh";
  const [mode, setMode] = useState<"instant" | "batch">("instant");
  const [modelId, setModelId] = useState(modelResults[0].id);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [batchSamples, setBatchSamples] = useState<EvaluationSample[]>([]);
  const [batchState, setBatchState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [batchMessage, setBatchMessage] = useState("");
  const [batchResult, setBatchResult] = useState<BatchEvaluationResult | null>(null);
  const example = demoExamples[exampleIndex];
  const model = modelResults.find((item) => item.id === modelId)!;
  const stages = zh
    ? ["载入图像与任务", "模型生成可观察输出", "解析动作与理由", "完成 PCA-SC 评测"]
    : ["Load image and task", "Generate observable model output", "Parse action and reason", "Complete PCA-SC evaluation"];

  useEffect(() => {
    fetch("./data/evaluation-samples.json")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { samples?: EvaluationSample[] }) => setBatchSamples(payload.samples || []))
      .catch(() => setBatchSamples([]));
  }, []);

  useEffect(() => {
    if (!running) return;
    if (step >= stages.length - 1) { setRunning(false); return; }
    const timer = window.setTimeout(() => setStep((current) => current + 1), 680);
    return () => window.clearTimeout(timer);
  }, [running, step, stages.length]);

  const provider = useMemo(() => modelId.startsWith("claude") ? "Anthropic" : modelId.startsWith("qwen") ? "Alibaba Model Studio" : "OpenAI", [modelId]);
  const startInstant = () => { setStep(-1); setRunning(true); };
  const runBatch = async () => {
    if (batchSamples.length !== 10) {
      setBatchState("error");
      setBatchMessage(zh ? "请先在 public/data/evaluation-samples.json 中接入恰好 10 条真实样本。" : "Connect exactly 10 real samples in public/data/evaluation-samples.json first.");
      return;
    }
    setBatchState("running");
    setBatchMessage(zh ? "正在通过服务端调用真实模型 API…" : "Calling the real model API through the server…");
    try {
      const result = await runBatchEvaluation(modelId, batchSamples);
      setBatchResult(result);
      setBatchState("done");
      setBatchMessage(zh ? `已完成 ${result.completed}/10 条样本。` : `Completed ${result.completed}/10 samples.`);
    } catch (error) {
      setBatchState("error");
      setBatchMessage(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <>
      <section className="section evaluation-mode-section">
        <div className="container">
          <SectionHeading eyebrow={zh ? "评测工作台" : "EVALUATION WORKSPACE"} title={zh ? "两种评测模式，共用一套结果结构" : "Two evaluation modes, one result structure"} description={zh ? "先用带图示例即时查看交互，再接入十条真实样本运行厂商 API 并生成雷达图。" : "Inspect the interaction with an image-backed instant example, then connect ten real samples to run vendor APIs and generate a radar profile."} />
          <div className="evaluation-mode-tabs" role="tablist">
            <button className={mode === "instant" ? "is-active" : ""} type="button" onClick={() => setMode("instant")}><span>01</span>{zh ? "立刻评测" : "Instant evaluation"}</button>
            <button className={mode === "batch" ? "is-active" : ""} type="button" onClick={() => setMode("batch")}><span>02</span>{zh ? "十样本真实运行" : "Ten-sample live run"}<small>{zh ? "待接入数据" : "DATA PENDING"}</small></button>
          </div>

          {mode === "instant" ? (
            <div className="instant-evaluation">
              <aside className="instant-evaluation__controls">
                <label>{zh ? "选择模型" : "Choose model"}<select value={modelId} onChange={(event) => { setModelId(event.target.value); setStep(-1); }}>{modelResults.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label>
                <fieldset><legend>{zh ? "选择案例" : "Choose case"}</legend>{demoExamples.map((item, index) => <button className={index === exampleIndex ? "is-active" : ""} type="button" onClick={() => { setExampleIndex(index); setStep(-1); }} key={item.id}><span>{item.id}</span>{zh ? item.title.zh : item.title.en}</button>)}</fieldset>
                <button className="button button--primary" type="button" onClick={startInstant}><Icon name="play" />{zh ? "立刻评测" : "Evaluate now"}</button>
              </aside>
              <article className="instant-evaluation__case">
                <div className="instant-evaluation__image"><img src="./paper-assets/representative-scenes.png" style={{ "--scene": exampleIndex % 4 } as CSSProperties} alt="" /><span>{example.id} · {zh ? "论文场景预览" : "PAPER SCENE PREVIEW"}</span></div>
                <h3>{zh ? example.title.zh : example.title.en}</h3><p>{zh ? example.task.zh : example.task.en}</p>
                <ol>{example.actions.map((action, index) => <li className={step >= 2 && index === example.selectedAction ? "is-selected" : ""} key={action.en}><span>{index + 1}</span>{zh ? action.zh : action.en}</li>)}</ol>
              </article>
              <article className="instant-evaluation__output" aria-live="polite">
                <header><span className={running ? "is-running" : ""} />{model.label}</header>
                {step >= 1 ? <><div><small>{zh ? "选择动作" : "SELECTED ACTION"}</small><strong>{step >= 2 ? `${example.selectedAction + 1} · ${zh ? example.actions[example.selectedAction].zh : example.actions[example.selectedAction].en}` : "…"}</strong></div><div><small>{zh ? "选择理由" : "DISPLAYED REASON"}</small><p>{step >= 2 ? (zh ? example.reason.zh : example.reason.en) : "…"}</p></div><div><small>{zh ? "安全理由" : "SAFETY REASON"}</small><p>{step >= 3 ? (zh ? example.safetyReason.zh : example.safetyReason.en) : "…"}</p></div></> : <p className="instant-evaluation__empty">{zh ? "点击“立刻评测”开始。" : "Select “Evaluate now” to begin."}</p>}
              </article>
              <div className="eval-stepper">
                <div className="eval-stepper__line"><i style={{ width: `${Math.max(0, (step / (stages.length - 1)) * 100)}%` }} /></div>
                {stages.map((stage, index) => <button className={index <= step ? "is-complete" : index === step + 1 ? "is-current" : ""} type="button" onClick={() => { setRunning(false); setStep(index); }} key={stage}><span>{index < step ? "✓" : index + 1}</span><strong>{stage}</strong></button>)}
                <div className="eval-stepper__controls"><button type="button" disabled={step <= -1} onClick={() => { setRunning(false); setStep((value) => Math.max(-1, value - 1)); }}>← {zh ? "上一步" : "Back"}</button><button type="button" onClick={() => { setRunning(false); setStep((value) => Math.min(stages.length - 1, value + 1)); }}>{zh ? "下一步" : "Next"} →</button></div>
              </div>
            </div>
          ) : (
            <div className="batch-evaluation">
              <div className="batch-evaluation__setup">
                <span>{zh ? "真实 API 批量评测" : "LIVE API BATCH EVALUATION"}</span>
                <h3>{zh ? "选择一个模型，运行十条真实样本" : "Choose one model and run ten real samples"}</h3>
                <p>{zh ? "API Key 仅由本地服务端环境变量读取，不会进入浏览器代码。" : "API keys are read only from server environment variables and never shipped to the browser."}</p>
                <label>{zh ? "模型" : "Model"}<select value={modelId} onChange={(event) => setModelId(event.target.value)}>{modelResults.map((item) => <option value={item.id} key={item.id}>{item.label} · {item.id}</option>)}</select></label>
                <dl><div><dt>{zh ? "厂商" : "Provider"}</dt><dd>{provider}</dd></div><div><dt>{zh ? "已接入样本" : "Connected samples"}</dt><dd>{batchSamples.length} / 10</dd></div><div><dt>{zh ? "接口" : "Endpoint"}</dt><dd>POST /api/pca-sc/evaluate-batch</dd></div></dl>
                <button className="button button--primary" type="button" disabled={batchState === "running"} onClick={runBatch}><Icon name={batchState === "running" ? "pause" : "play"} />{batchState === "running" ? (zh ? "正在运行" : "Running") : (zh ? "运行十个样本" : "Run 10 samples")}</button>
                {batchMessage && <p className={`batch-evaluation__status is-${batchState}`} role="status">{batchMessage}</p>}
              </div>
              <div className="batch-evaluation__result">
                {batchResult ? <ScoreRadar metrics={batchResult.metrics} locale={locale} /> : <div className="batch-evaluation__pending"><Icon name="database" size={34} /><strong>{zh ? "雷达图将在真实运行后自动生成" : "The radar chart will be generated after a live run"}</strong><p>{zh ? "将十条样本写入数据接口并配置对应厂商密钥即可启用。" : "Connect ten samples and configure the corresponding provider key to enable it."}</p></div>}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
