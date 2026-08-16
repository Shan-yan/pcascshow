import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Layout, normalizeHash } from "./components/Layout";
import { Home } from "./pages/Home";
import { Dataset } from "./pages/Dataset";
import { Models } from "./pages/Models";
import { Methodology } from "./pages/Methodology";
import { Demo } from "./pages/Demo";
import { Paper } from "./pages/Paper";
import {
  ChineseDataset,
  ChineseDemo,
  ChineseHome,
  ChineseMethodology,
  ChineseModels,
  ChinesePaper
} from "./pages/zh/ChinesePages";
import "./styles.css";

const pages: Record<string, React.ComponentType> = {
  "/": Home,
  "/dataset": Dataset,
  "/models": Models,
  "/methodology": Methodology,
  "/demo": Demo,
  "/paper": Paper,
  "/zh": ChineseHome,
  "/zh/dataset": ChineseDataset,
  "/zh/models": ChineseModels,
  "/zh/methodology": ChineseMethodology,
  "/zh/demo": ChineseDemo,
  "/zh/paper": ChinesePaper
};

function App() {
  const [route, setRoute] = useState(() => normalizeHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(normalizeHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const Page = pages[route] ?? Home;

  useEffect(() => {
    const isZh = route.startsWith("/zh");
    const name = route === "/" ? "Overview" : route === "/zh" ? "中文概览" : route.split("/").filter(Boolean).at(-1)?.replace("-", " ") ?? "Overview";
    document.documentElement.lang = isZh ? "zh-CN" : "en";
    document.title = `${name[0].toUpperCase()}${name.slice(1)} · PCA-SC Bench`;
  }, [route]);

  return <Layout route={route}><Page /></Layout>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
