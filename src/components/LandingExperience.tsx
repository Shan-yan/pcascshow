import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent as ReactPointerEvent, WheelEvent } from "react";
import { Icon } from "./Icons";

function moveSpotlight(event: MouseEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  event.currentTarget.style.setProperty("--spot-x", `${x}px`);
  event.currentTarget.style.setProperty("--spot-y", `${y}px`);
  event.currentTarget.style.setProperty("--tilt-x", `${((x / bounds.width) - .5) * 5}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${((y / bounds.height) - .5) * -5}deg`);
}

export function SplitTitle({ text }: { text: string }) {
  let characterOffset = 0;
  return (
    <span className="split-title" aria-label={text.replace(/\n/g, " ")}>
      <span aria-hidden="true" className="split-title__lines">
        {text.split("\n").map((line, lineIndex) => {
          const start = characterOffset;
          const accentStart = line.toLowerCase().indexOf("bench");
          characterOffset += line.length;
          return (
            <span className="split-title__line" key={`${line}-${lineIndex}`}>
              {Array.from(line).map((character, index) => (
                <i
                  className={accentStart >= 0 && index >= accentStart ? "split-title__accent" : undefined}
                  style={{ "--char": start + index } as CSSProperties}
                  key={`${character}-${index}`}
                >
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
  const lanes = [[0, 1, 2, 3, 0, 1, 2, 3], [2, 3, 0, 1, 2, 3, 0, 1]];

  return (
    <aside className="diagonal-gallery" data-reveal="right" aria-label={isZh ? "斜向轮换的论文场景案例" : "Rotating diagonal manuscript scene gallery"}>
      <div className="diagonal-gallery__glow" aria-hidden="true" />
      <div className="diagonal-gallery__stage">
        {lanes.map((lane, laneIndex) => (
          <div className={`diagonal-gallery__lane diagonal-gallery__lane--${laneIndex + 1}`} key={laneIndex}>
            {lane.map((sceneIndex, cardIndex) => (
              <figure
                className="diagonal-card"
                aria-label={cardIndex < 4 ? sceneLabels[sceneIndex] : undefined}
                aria-hidden={cardIndex >= 4 ? "true" : undefined}
                key={`${laneIndex}-${cardIndex}`}
              >
                <img
                  src="./paper-assets/representative-scenes.png"
                  alt=""
                  style={{ "--scene": sceneIndex } as CSSProperties}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

export function DatasetCircularGallery({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const isZh = locale === "zh";
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const lastX = useRef(0);
  const labels = isZh
    ? ["候车大厅", "开放区域", "检票区域", "人群交互"]
    : ["Waiting hall", "Open area", "Ticket check", "Crowd interaction"];
  const scenes = [0, 1, 2, 3, 1, 3, 0, 2];

  useEffect(() => {
    if (dragging || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setRotation((current) => current - .18), 40);
    return () => window.clearInterval(timer);
  }, [dragging]);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    lastX.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const delta = event.clientX - lastX.current;
    lastX.current = event.clientX;
    setRotation((current) => current + delta * .22);
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const turnWheel = (event: WheelEvent<HTMLDivElement>) => setRotation((current) => current - event.deltaY * .045);

  return (
    <section className="dataset-gallery-cover" aria-label={isZh ? "可交互的环形数据集场景画廊" : "Interactive circular dataset scene gallery"}>
      <div className="dataset-gallery-cover__copy">
        <span>{isZh ? "数据集场景封面" : "DATASET SCENE COVER"}</span>
        <h2>{isZh ? "公共空间决策，环形展开" : "Public-space decisions, unfolded in a circle"}</h2>
        <p>{isZh ? "拖动或滚动，查看候车大厅、开放区域、检票区域与人群交互场景。" : "Drag or scroll through the waiting hall, open area, ticket check and crowd-interaction views."}</p>
      </div>
      <div
        className={`circular-gallery ${dragging ? "is-dragging" : ""}`}
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={turnWheel}
      >
        <div className="circular-gallery__scene">
          <div className="circular-gallery__track" style={{ "--gallery-rotation": `${rotation}deg` } as CSSProperties}>
            {scenes.map((scene, index) => (
              <figure className="circular-gallery__card" style={{ "--gallery-item": index } as CSSProperties} key={`${scene}-${index}`}>
                <img src="./paper-assets/representative-scenes.png" alt="" style={{ "--scene": scene } as CSSProperties} draggable="false" />
                <figcaption><span>0{(index % 4) + 1}</span>{labels[scene]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <div className="circular-gallery__controls">
        <button type="button" onClick={() => setRotation((current) => current + 45)} aria-label={isZh ? "上一场景" : "Previous scene"}>←</button>
        <span>{isZh ? "拖动 · 滚动 · 探索" : "DRAG · SCROLL · EXPLORE"}</span>
        <button type="button" onClick={() => setRotation((current) => current - 45)} aria-label={isZh ? "下一场景" : "Next scene"}>→</button>
      </div>
    </section>
  );
}

function ResearchPreview({ type }: { type: "dataset" | "models" | "method" | "demo" | "paper" }) {
  if (type === "dataset") {
    return <div className="research-preview research-preview--dataset"><strong>300</strong><span /><span /><span /><i>4 × ACTION</i></div>;
  }
  if (type === "models") {
    return (
      <div className="research-preview research-preview--models">
        <svg viewBox="0 0 180 130" aria-hidden="true"><polygon points="90,8 158,42 150,105 90,124 28,101 22,42" /><polygon points="90,27 137,50 130,91 90,106 48,88 44,51" /><polyline points="90,19 144,56 124,96 90,79 42,88 57,50 90,19" /></svg>
        <strong>6 MLLMs</strong>
      </div>
    );
  }
  if (type === "method") {
    return <div className="research-preview research-preview--method"><span>P</span><i /><span>C</span><i /><span>A</span><b>SAFETY GATE</b></div>;
  }
  if (type === "demo") {
    return <div className="research-preview research-preview--demo"><i /><i /><i /><p><span>SELECT</span> ACTION_02</p><p><span>WHY</span> observable evidence</p></div>;
  }
  return <div className="research-preview research-preview--paper"><span>PDF</span><i /><i /><i /><strong>PCA-SC</strong></div>;
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

export function DarkVeilBackground() {
  const target = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = target.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      premultipliedAlpha: true
    });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;
    const fragmentSource = `
      precision mediump float;
      uniform vec2 resolution;
      uniform vec2 pointer;
      uniform float time;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p = mat2(1.62, 1.18, -1.18, 1.62) * p;
          amplitude *= 0.48;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = uv - 0.5;
        p.x *= resolution.x / max(resolution.y, 1.0);

        float t = time * 0.115;
        vec2 drift = (pointer - 0.5) * 0.09;
        float broad = fbm(p * 1.08 + vec2(t * 0.24, -t * 0.17) + drift);
        p.x += sin(p.y * 2.25 + broad * 4.2 + t) * 0.16;
        p.y += cos(p.x * 1.85 - broad * 3.4 - t * 0.72) * 0.095;

        float veilA = fbm(p * 1.72 + vec2(-t * 0.31, t * 0.18));
        float veilB = fbm(p * 2.36 + vec2(t * 0.17, t * 0.27) + veilA * 0.38);
        float fold = smoothstep(0.30, 0.92, veilA * 0.68 + veilB * 0.55);
        float thread = pow(max(0.0, sin((p.x + p.y * 0.38 + veilB * 0.44) * 6.5 - t)), 5.0);

        vec3 deep = vec3(0.018, 0.052, 0.078);
        vec3 blue = vec3(0.055, 0.180, 0.238);
        vec3 teal = vec3(0.055, 0.255, 0.250);
        vec3 color = mix(deep, blue, fold * 0.68);
        color = mix(color, teal, thread * 0.16 + veilB * 0.08);

        float vignette = smoothstep(0.88, 0.18, length((uv - 0.5) * vec2(0.78, 1.0)));
        float grain = hash(gl_FragCoord.xy + floor(time * 8.0)) - 0.5;
        color += grain * 0.012;
        color *= 0.48 + vignette * 0.52;
        gl_FragColor = vec4(color, 0.82);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragment = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    const resolution = gl.getUniformLocation(program, "resolution");
    const pointer = gl.getUniformLocation(program, "pointer");
    const time = gl.getUniformLocation(program, "time");
    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    let frame = 0;
    let pointerX = .5;
    let pointerY = .5;
    let visible = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 1.35);
      const width = Math.max(1, Math.round(bounds.width * density));
      const height = Math.max(1, Math.round(bounds.height * density));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    const move = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointerX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      pointerY = Math.max(0, Math.min(1, 1 - (event.clientY - bounds.top) / bounds.height));
    };
    const render = (now: number) => {
      resize();
      if (visible) {
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform2f(pointer, pointerX, pointerY);
        gl.uniform1f(time, reduceMotion ? 0 : (now - startedAt) / 1000);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      frame = window.requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(container);
    window.addEventListener("pointermove", move, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.cancelAnimationFrame(frame);
      if (buffer) gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <div className="dark-veil-background" ref={target} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}

export function OrbitExplorer({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const [open, setOpen] = useState(false);
  const [spark, setSpark] = useState(0);
  const isZh = locale === "zh";
  const links = [
    { type: "dataset" as const, label: isZh ? "数据集" : "Dataset", kicker: isZh ? "300 条公共空间样本" : "300 public-space instances", summary: isZh ? "查看场景、任务、候选动作与安全关键字段。" : "Inspect scenes, tasks, candidate actions and safety-critical fields.", path: isZh ? "/zh/dataset" : "/dataset", icon: "database" as const },
    { type: "models" as const, label: isZh ? "模型结果" : "Model Results", kicker: isZh ? "六模型多指标画像" : "Six multi-metric profiles", summary: isZh ? "比较感知、认知、行动、安全与链路一致性。" : "Compare perception, cognition, action, safety and chain consistency.", path: isZh ? "/zh/models" : "/models", icon: "filter" as const },
    { type: "method" as const, label: isZh ? "评测方法" : "Methodology", kicker: isZh ? "PCA-SC Eval" : "PCA-SC Eval", summary: isZh ? "追踪安全门控、证据字段与自动判卷流程。" : "Trace safety gates, evidence fields and the evaluation pipeline.", path: isZh ? "/zh/methodology" : "/methodology", icon: "shield" as const },
    { type: "demo" as const, label: isZh ? "评测演示" : "Evaluation Demo", kicker: isZh ? "实时选择与理由" : "Live choice and reason", summary: isZh ? "选择模型和案例，播放可观察输出。" : "Choose a model and case, then replay observable outputs.", path: isZh ? "/zh/demo" : "/demo", icon: "play" as const },
    { type: "paper" as const, label: isZh ? "论文" : "Paper", kicker: isZh ? "论文证据与引用" : "Evidence and citation", summary: isZh ? "阅读研究范围、人本评价与待补出版信息。" : "Read the scope, human study and publication record.", path: isZh ? "/zh/paper" : "/paper", icon: "file" as const }
  ];
  const metricSegments = isZh
    ? ["300 条样本 ✦ ", "测试了 6 个模型 ✦ ", "50+ 人参与 ✦ "]
    : ["300 SAMPLES ✦ ", "6 MODELS ✦ ", "50+ PEOPLE ✦ "];
  const totalRingCharacters = metricSegments.reduce((total, segment) => total + Array.from(segment).length, 0);
  let ringCharacterIndex = 0;
  const triggerLabel = isZh ? "开始探索" : "Start exploring";

  return (
    <div className={`orbit-explorer ${open ? "is-open" : ""}`}>
      <div className="orbit-metrics" aria-label={isZh ? "基准规模：300 条样本、测试了六个模型、50+ 人参与" : "Benchmark scale: 300 samples, six evaluated models and more than 50 participants"}>
        <div className="orbit-metric">
          <span aria-hidden="true">
            {metricSegments.flatMap((segment, segmentIndex) => Array.from(segment).map((character) => {
              const currentIndex = ringCharacterIndex++;
              return (
                <i
                  className={`orbit-metric__char orbit-metric__char--${segmentIndex}`}
                  style={{ "--angle": `${(360 / totalRingCharacters) * currentIndex}deg` } as CSSProperties}
                  key={`${segmentIndex}-${currentIndex}`}
                >
                  {character === " " ? "\u00a0" : character}
                </i>
              );
            }))}
          </span>
        </div>
      </div>

      <button
        className="orbit-trigger"
        type="button"
        aria-expanded={open}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
        aria-controls="orbit-destinations"
        onMouseMove={moveSpotlight}
        onClick={() => { setOpen(true); setSpark((value) => value + 1); }}
      >
        <span className="orbit-trigger__label" aria-label={triggerLabel}>
          <span aria-hidden="true">
            {Array.from(triggerLabel).map((character, index) => (
              <i style={{ "--label-char": index } as CSSProperties} key={`${character}-${index}`}>{character === " " ? "\u00a0" : character}</i>
            ))}
          </span>
        </span>
        <Icon name="arrow" size={20} />
        <span className="orbit-sparks" key={spark} aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i style={{ "--ray": index } as CSSProperties} key={index} />)}</span>
      </button>

      <nav className="research-bento" id="orbit-destinations" aria-label={isZh ? "研究入口概览" : "Research destination overview"}>
        {links.map((link, index) => (
          <a href={`#${link.path}`} className={`research-card research-card--${link.type}`} tabIndex={open ? 0 : -1} key={link.path}>
            <header><small>0{index + 1}</small><Icon name={link.icon} size={20} /></header>
            <ResearchPreview type={link.type} />
            <footer>
              <span>{link.kicker}</span>
              <h3>{link.label}</h3>
              <p>{link.summary}</p>
              <Icon name="arrow" size={20} />
            </footer>
          </a>
        ))}
      </nav>

      {!open && <p className="orbit-explorer__hint">
        {isZh ? "点击中心按钮，展开研究路径。" : "Select the center button to reveal the research paths."}
      </p>}
    </div>
  );
}
