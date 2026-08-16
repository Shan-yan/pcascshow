import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { init, use as useECharts } from "echarts/core";
import type { EChartsCoreOption } from "echarts/core";
import { RadarChart } from "echarts/charts";
import { RadarComponent, TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { modelResults } from "../data/models";
import type { ModelResult } from "../data/types";

useECharts([RadarChart, RadarComponent, TooltipComponent, SVGRenderer]);

const colors = ["#2b7a78", "#4169a1", "#b27a27", "#835a93", "#38745d", "#426f8d"];

function CounterValue({ value, decimals = 3 }: { value: number; decimals?: number }) {
  const target = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = target.current;
    if (!node) return;
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const play = () => {
      if (reducedMotion) { setDisplay(value); return; }
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 950, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(value * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { play(); return () => cancelAnimationFrame(frame); }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { play(); observer.disconnect(); }
    }, { threshold: .35 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <span className="counter-value" ref={target}>{display.toFixed(decimals)}</span>;
}

function MetricFocus({ locale }: { locale: "zh" | "en" }) {
  const [active, setActive] = useState(0);
  const labels = locale === "zh"
    ? ["感知", "认知", "行动", "安全", "一致性"]
    : ["Perception", "Cognition", "Action", "Safety", "Consistency"];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % labels.length), 1450);
    return () => window.clearInterval(timer);
  }, [labels.length]);

  return (
    <div className="metric-focus" aria-label={locale === "zh" ? "依次聚焦五类评测维度" : "Five evaluation dimensions in focus"}>
      <small>{locale === "zh" ? "诊断视角" : "DIAGNOSTIC LENS"}</small>
      <div>
        {labels.map((label, index) => (
          <button type="button" className={active === index ? "is-focused" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} key={label}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function RadarChartView({ model, color, locale }: { model: ModelResult; color: string; locale: "zh" | "en" }) {
  const target = useRef<HTMLDivElement>(null);
  const consistency = (model.PC + model.CA + model.PA) / 3;

  useEffect(() => {
    if (!target.current) return;
    const chart = init(target.current, undefined, { renderer: "svg" });
    const labels = locale === "zh"
      ? ["感知 P", "认知 C", "行动 A", "安全", "链路一致性", "不确定性兜底"]
      : ["Perception", "Cognition", "Action", "Safety", "Consistency", "Uncertainty fallback"];
    const values = [model.P, model.C, model.A, model.Safety, consistency, model.UF];
    const option: EChartsCoreOption = {
      animationDuration: 900,
      animationEasing: "cubicOut",
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(18, 27, 33, .96)",
        borderColor: color,
        textStyle: { color: "#eef4f5", fontSize: 11 },
        formatter: () => labels.map((label, index) => `${label}: ${values[index].toFixed(3)}`).join("<br/>")
      },
      radar: {
        center: ["50%", "49%"],
        radius: "66%",
        splitNumber: 4,
        shape: "polygon",
        indicator: labels.map((name) => ({ name, max: 1 })),
        axisName: { color: "#526570", fontSize: 9 },
        axisLine: { lineStyle: { color: "rgba(82, 101, 112, .28)" } },
        splitLine: { lineStyle: { color: "rgba(82, 101, 112, .22)" } },
        splitArea: { areaStyle: { color: ["rgba(235,241,242,.18)", "rgba(255,255,255,.66)"] } }
      },
      series: [{
        type: "radar",
        symbol: "circle",
        symbolSize: 4,
        lineStyle: { color, width: 2 },
        itemStyle: { color },
        areaStyle: { color, opacity: .22 },
        data: [{ value: values, name: model.label }]
      }]
    };
    chart.setOption(option);
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(target.current);
    return () => { observer.disconnect(); chart.dispose(); };
  }, [model, color, locale, consistency]);

  return <div className="model-radar__canvas" ref={target} role="img" aria-label={`${model.label} radar profile`} />;
}

export function ModelRadarGrid({ locale = "en" }: { locale?: "zh" | "en" }) {
  const isZh = locale === "zh";
  return (
    <>
      <MetricFocus locale={locale} />
      <div className="model-radar-grid">
        {modelResults.map((model, index) => (
          <article className="model-radar-card" style={{ "--radar-accent": colors[index], "--card-order": index } as CSSProperties} key={model.id}>
            <header>
              <div><span>0{index + 1}</span><h3>{model.label}</h3><small>{model.access === "Open" ? (isZh ? "开源" : "Open") : (isZh ? "闭源" : "Closed")}</small></div>
              <strong style={{ color: colors[index] }}>Safety <CounterValue value={model.Safety} /></strong>
            </header>
            <RadarChartView model={model} color={colors[index]} locale={locale} />
            <footer>
              <span>P <CounterValue value={model.P} /></span>
              <span>C <CounterValue value={model.C} /></span>
              <span>A <CounterValue value={model.A} /></span>
              <span>UF <CounterValue value={model.UF} /></span>
            </footer>
          </article>
        ))}
      </div>
    </>
  );
}
