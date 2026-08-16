import type { ReactNode } from "react";
import { Icon } from "./Icons";

export function AcademicBadge({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "blue";
}) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="section-heading__actions">{actions}</div>}
    </div>
  );
}

export function SourceNote({
  source,
  verify = false
}: {
  source: string;
  verify?: boolean;
}) {
  return (
    <p className={`source-note ${verify ? "source-note--verify" : ""}`}>
      <Icon name={verify ? "info" : "file"} size={14} />
      {verify ? "[AUTHOR TO VERIFY] " : ""}
      {source}
    </p>
  );
}

export function MissingData({
  label = "[AUTHOR TO PROVIDE]",
  detail,
  compact = false
}: {
  label?: string;
  detail?: string;
  compact?: boolean;
}) {
  return (
    <div className={`missing ${compact ? "missing--compact" : ""}`} role="status">
      <span>{label}</span>
      {detail && <p>{detail}</p>}
    </div>
  );
}

export function ArrowLink({
  to,
  children,
  className = ""
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={`arrow-link ${className}`} href={`#${to}`}>
      <span>{children}</span>
      <Icon name="arrow" size={17} />
    </a>
  );
}

export function PageIntro({
  eyebrow,
  title,
  lead,
  badges
}: {
  eyebrow: string;
  title: string;
  lead: string;
  badges?: ReactNode;
}) {
  return (
    <header className="page-intro container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{lead}</p>
      {badges && <div className="badge-row">{badges}</div>}
    </header>
  );
}

export function MetricHelp({
  term,
  children
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <span className="metric-help" tabIndex={0}>
      {term}
      <span role="tooltip">{children}</span>
    </span>
  );
}
