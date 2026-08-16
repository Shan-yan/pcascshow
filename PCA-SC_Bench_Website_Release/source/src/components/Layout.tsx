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

function normalizeHash(hash: string) {
  return hash.replace(/^#/, "") || "/";
}

export function SiteHeader({ route }: { route: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [route]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#/" aria-label="PCA-SC Bench overview">
          <span className="brand__mark">P/C/A</span>
          <span>
            <strong>PCA-SC Bench</strong>
            <small>Research Atlas</small>
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
          {nav.map((item) => (
            <a
              key={item.path}
              className={route === item.path ? "is-active" : ""}
              href={`#${item.path}`}
              aria-current={route === item.path ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a className="button button--primary site-nav__cta" href="#/demo">
            Explore the Demo
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand brand--footer" href="#/">
            <span className="brand__mark">P/C/A</span>
            <span><strong>PCA-SC Bench</strong><small>Research Atlas</small></span>
          </a>
          <p>
            A traceable presentation of public-space safety evaluation for
            high-level embodied decisions.
          </p>
        </div>
        <div>
          <h2>Research</h2>
          <a href="#/paper">Paper & Citation</a>
          <a href="#/dataset">Dataset</a>
          <a href="#/models">Full Benchmark Results</a>
        </div>
        <div>
          <h2>Resources</h2>
          <span>Dataset · Coming later</span>
          <span>Code · Coming later</span>
          <span>License · [AUTHOR TO PROVIDE]</span>
        </div>
        <div>
          <h2>Scope</h2>
          <span>Static simulated station scenes</span>
          <span>Single-turn high-level decisions</span>
          <span>Contact · [AUTHOR TO PROVIDE]</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Evidence version: manuscript-derived planning document</span>
        <span>No live model API · No official overall score</span>
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
      <SiteFooter />
    </>
  );
}

export { normalizeHash };
