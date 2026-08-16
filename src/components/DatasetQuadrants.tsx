import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icons";

type QuadrantKey = "successful_safe" | "unsuccessful_safe" | "successful_unsafe" | "unsuccessful_unsafe";

export interface QuadrantSampleRecord {
  id: string;
  image?: string;
  sceneIndex?: number;
  task?: string;
  safetyAnchor?: string;
  annotationStatus?: string;
}

export interface QuadrantDatasetPayload {
  version: string;
  quadrants: Partial<Record<QuadrantKey, QuadrantSampleRecord[]>>;
}

const quadrantKeys: QuadrantKey[] = ["successful_safe", "unsuccessful_safe", "successful_unsafe", "unsuccessful_unsafe"];
const quadrantDisplayOrder: QuadrantKey[] = ["unsuccessful_safe", "successful_safe", "unsuccessful_unsafe", "successful_unsafe"];

const previewRecords: Record<QuadrantKey, QuadrantSampleRecord[]> = Object.fromEntries(
  quadrantKeys.map((key, quadrantIndex) => [key, Array.from({ length: 4 }, (_, index) => ({
    id: `PREVIEW-${quadrantIndex + 1}-${index + 1}`,
    sceneIndex: (quadrantIndex + index) % 4,
    task: "[待接入正式样本任务]",
    safetyAnchor: "[待接入安全关键锚点]",
    annotationStatus: "论文代表场景 · 界面预览"
  }))])
) as Record<QuadrantKey, QuadrantSampleRecord[]>;

const copy = {
  zh: {
    eyebrow: "成功 × 安全四分类",
    title: "从色块到文件夹，再展开样本与标注",
    description: "四分类只用于数据组织、分层分析和失败归因，不作为模型输入，也不参与单个样本的显式提示。",
    hint: "悬停形成文件夹 · 点击展开照片 · 悬停照片查看标注",
    interfaceLabel: "数据接口",
    preview: "当前为论文场景预览；正式逐样本照片与标注待接口接入。",
    close: "收起样本",
    task: "任务",
    anchor: "安全锚点",
    status: "数据状态",
    axisX: "任务结果 →",
    axisY: "安全状态 →",
    safe: "安全",
    unsafe: "不安全",
    successful: "任务成功",
    unsuccessful: "任务未成功",
    quadrants: {
      successful_safe: ["任务成功且安全", "任务成功，且无明显安全问题。"],
      unsuccessful_safe: ["任务未成功但安全", "任务未成功，但未引发明显安全问题。"],
      successful_unsafe: ["任务成功但不安全", "任务成功，但采取了不可安全部署的策略。"],
      unsuccessful_unsafe: ["任务未成功且不安全", "任务未成功，且伴随明确安全风险。"]
    }
  },
  en: {
    eyebrow: "SUCCESS × SAFETY QUADRANTS",
    title: "From color block to folder, then samples and annotations",
    description: "The four buckets support organization, stratified analysis and failure attribution only. They are not shown to the model or used as an explicit sample prompt.",
    hint: "Hover for folder · click to scatter photos · hover a photo for annotation",
    interfaceLabel: "Data endpoint",
    preview: "Manuscript-scene previews are shown until formal per-sample images and annotations are connected.",
    close: "Collapse samples",
    task: "Task",
    anchor: "Safety anchor",
    status: "Data status",
    axisX: "Task outcome →",
    axisY: "Safety status →",
    safe: "Safe",
    unsafe: "Unsafe",
    successful: "Successful",
    unsuccessful: "Unsuccessful",
    quadrants: {
      successful_safe: ["Successful + safe", "The task succeeds with no evident safety issue."],
      unsuccessful_safe: ["Unsuccessful + safe", "The task does not succeed, but introduces no evident safety issue."],
      successful_unsafe: ["Successful + unsafe", "The task succeeds through a strategy unsuitable for safe deployment."],
      unsuccessful_unsafe: ["Unsuccessful + unsafe", "The task fails and is accompanied by an explicit safety risk."]
    }
  }
} as const;

export function DatasetQuadrantFolders({ locale = "en", endpoint = "./data/pca-sc-quadrants.json" }: { locale?: "zh" | "en"; endpoint?: string }) {
  const [openKey, setOpenKey] = useState<QuadrantKey | null>(null);
  const [payload, setPayload] = useState<QuadrantDatasetPayload | null>(null);
  const text = copy[locale];

  useEffect(() => {
    let active = true;
    fetch(endpoint)
      .then((response) => response.ok ? response.json() as Promise<QuadrantDatasetPayload> : Promise.reject())
      .then((result) => { if (active && result?.quadrants) setPayload(result); })
      .catch(() => { /* Interface stays on explicit preview records until author data is supplied. */ });
    return () => { active = false; };
  }, [endpoint]);

  const records = useMemo(() => {
    if (!openKey) return [];
    const supplied = payload?.quadrants?.[openKey];
    return supplied?.length ? supplied.slice(0, 4) : previewRecords[openKey];
  }, [openKey, payload]);

  return (
    <section className="section dataset-quadrants-section">
      <div className="container">
        <header className="quadrant-folder-heading">
          <div><span>{text.eyebrow}</span><h2>{text.title}</h2><p>{text.description}</p></div>
          <aside><Icon name="database" /><strong>{text.interfaceLabel}</strong><code>{endpoint}</code><small>{text.preview}</small></aside>
        </header>
        <p className="quadrant-folder-hint">{text.hint}</p>
        <div className="quadrant-folder-layout">
          <span className="quadrant-folder-axis quadrant-folder-axis--y">{text.axisY}</span>
          <span className="quadrant-folder-axis quadrant-folder-axis--x">{text.axisX}</span>
          <span className="quadrant-folder-pole quadrant-folder-pole--safe">{text.safe}</span>
          <span className="quadrant-folder-pole quadrant-folder-pole--unsafe">{text.unsafe}</span>
          <span className="quadrant-folder-pole quadrant-folder-pole--successful">{text.successful}</span>
          <span className="quadrant-folder-pole quadrant-folder-pole--unsuccessful">{text.unsuccessful}</span>
          <div className="quadrant-folder-grid">
            {quadrantDisplayOrder.map((key, index) => {
              const [title, description] = text.quadrants[key];
              return (
                <button type="button" className={`quadrant-folder quadrant-folder--${key.replace(/_/g, "-")} ${openKey === key ? "is-open" : ""}`} onClick={() => setOpenKey((current) => current === key ? null : key)} aria-expanded={openKey === key} key={key}>
                  <span className="quadrant-folder__index">0{index + 1}</span>
                  <span className="quadrant-folder__shape" aria-hidden="true"><i /><b /><b /><b /><em /></span>
                  <span className="quadrant-folder__copy"><strong>{title}</strong><small>{key}</small><p>{description}</p></span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`quadrant-sample-stage ${openKey ? "is-open" : ""}`} aria-live="polite">
          {openKey && <>
            <header><div><span>{openKey}</span><h3>{text.quadrants[openKey][0]}</h3></div><button type="button" onClick={() => setOpenKey(null)}><Icon name="x" />{text.close}</button></header>
            <div className="quadrant-photo-scatter">
              {records.map((record, index) => (
                <figure style={{ "--photo-index": index, "--photo-x": `${[5, 28, 52, 73][index]}%`, "--photo-y": `${[12, 31, 9, 34][index]}%`, "--photo-rotate": `${[-7, 5, -3, 7][index]}deg`, "--photo-delay": `${index * 90}ms` } as CSSProperties} key={record.id}>
                  <div className="quadrant-photo">
                    {record.image
                      ? <img className="is-supplied" src={record.image} alt="" />
                      : <img src="./paper-assets/representative-scenes.png" alt="" style={{ "--scene": record.sceneIndex ?? index } as CSSProperties} />}
                    <figcaption><span>{record.id}</span><strong>{text.quadrants[openKey][0]}</strong></figcaption>
                  </div>
                  <aside>
                    <span>ANNOTATION</span>
                    <dl><div><dt>{text.task}</dt><dd>{record.task || "[AUTHOR TO PROVIDE]"}</dd></div><div><dt>{text.anchor}</dt><dd>{record.safetyAnchor || "[AUTHOR TO PROVIDE]"}</dd></div><div><dt>{text.status}</dt><dd>{record.annotationStatus || payload?.version || "[AUTHOR TO PROVIDE]"}</dd></div></dl>
                  </aside>
                </figure>
              ))}
            </div>
          </>}
        </div>
      </div>
    </section>
  );
}
