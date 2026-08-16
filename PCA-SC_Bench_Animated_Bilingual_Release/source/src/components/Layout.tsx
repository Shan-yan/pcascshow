import { useEffect, useState } from "react";
import { Icon } from "./Icons";

const nav = [
  { path: "/", label: "Overview" },
  { path: "/dataset", label: "Dataset" },
  { path: "/models", label: "Models" },
  { path: "/methodology", label: "Methodology" },
  { path: "/demo", label: "Evaluation Demo" },
  { path: "/paper", label: "Paper" }
];

const navZh = [
  { path: "/zh", label: "概览" },
  { path: "/zh/dataset", label: "数据集" },
  { path: "/zh/models", label: "模型结果" },
  { path: "/zh/methodology", label: "评测方法" },
  { path: "/zh/demo", label: "评测演示" },
  { path: "/zh/paper", label: "论文" }
];

function normalizeHash(hash: string) {
  return hash.replace(/^#/, "") || "/";
}

export function SiteHeader({ route }: { route: string }) {
  const [open, setOpen] = useState(false);
  const isZh = route.startsWith("/zh");
  const activeNav = isZh ? navZh : nav;
  const languageTarget = isZh ? route.replace(/^\/zh/, "") || "/" : `/zh${route === "/" ? "" : route}`;

  useEffect(() => setOpen(false), [route]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href={isZh ? "#/zh" : "#/"} aria-label={isZh ? "PCA-SC Bench 中文概览" : "PCA-SC Bench overview"}>
          <span className="brand__mark">P/C/A</span>
          <span>
            <strong>PCA-SC Bench</strong>
            <small>{isZh ? "学术成果图谱" : "Research Atlas"}</small>
          </span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
        <nav className={`site-nav ${open ? "site-nav--open" : ""}`} aria-label="Primary">
          {activeNav.map((item) => (
            <a
              key={item.path}
              className={route === item.path ? "is-active" : ""}
              href={`#${item.path}`}
              aria-current={route === item.path ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a className="language-switch" href={`#${languageTarget}`} lang={isZh ? "en" : "zh-CN"}>
            {isZh ? "EN" : "中文"}
          </a>
          <a className="button button--primary site-nav__cta" href={isZh ? "#/zh/demo" : "#/demo"}>
            {isZh ? "进入演示" : "Explore the Demo"}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ isZh = false }: { isZh?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand brand--footer" href={isZh ? "#/zh" : "#/"}>
            <span className="brand__mark">P/C/A</span>
            <span><strong>PCA-SC Bench</strong><small>{isZh ? "学术成果图谱" : "Research Atlas"}</small></span>
          </a>
          <p>{isZh ? "面向公共空间高层具身决策安全评测的可追溯学术展示。" : "A traceable presentation of public-space safety evaluation for high-level embodied decisions."}</p>
        </div>
        <div>
          <h2>{isZh ? "研究" : "Research"}</h2>
          <a href={isZh ? "#/zh/paper" : "#/paper"}>{isZh ? "论文与引用" : "Paper & Citation"}</a>
          <a href={isZh ? "#/zh/dataset" : "#/dataset"}>{isZh ? "数据集" : "Dataset"}</a>
          <a href={isZh ? "#/zh/models" : "#/models"}>{isZh ? "完整评测结果" : "Full Benchmark Results"}</a>
        </div>
        <div>
          <h2>{isZh ? "资源" : "Resources"}</h2>
          <span>{isZh ? "数据集 · 待发布" : "Dataset · Coming later"}</span>
          <span>{isZh ? "代码 · 待发布" : "Code · Coming later"}</span>
          <span>{isZh ? "许可 · [作者待提供]" : "License · [AUTHOR TO PROVIDE]"}</span>
        </div>
        <div>
          <h2>{isZh ? "适用范围" : "Scope"}</h2>
          <span>{isZh ? "静态仿真车站场景" : "Static simulated station scenes"}</span>
          <span>{isZh ? "单轮高层行动决策" : "Single-turn high-level decisions"}</span>
          <span>{isZh ? "联系 · [作者待提供]" : "Contact · [AUTHOR TO PROVIDE]"}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{isZh ? "事实版本：PCA-SC809 论文" : "Evidence version: PCA-SC809 manuscript"}</span>
        <span>{isZh ? "无在线模型 API · 无官方综合总分" : "No live model API · No official overall score"}</span>
      </div>
    </footer>
  );
}

export function Layout({
  route,
  children
}: {
  route: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <SiteHeader route={route} />
      <main id="main">{children}</main>
      <SiteFooter isZh={route.startsWith("/zh")} />
    </>
  );
}

export { normalizeHash };
