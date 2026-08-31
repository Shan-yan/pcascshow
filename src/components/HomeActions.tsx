import { Icon } from "./Icons";

export function GlassActionLinks({ locale = "en" }: { locale?: "zh" | "en" }) {
  const links = locale === "zh"
    ? [
        { href: "#/zh/paper", title: "查看论文", caption: "研究证据与完整论述", icon: "file" as const },
        { href: "#/zh/demo", title: "评测演示", caption: "选择模型并查看行动理由", icon: "play" as const }
      ]
    : [
        { href: "#/paper", title: "View paper", caption: "Research evidence and full argument", icon: "file" as const },
        { href: "#/demo", title: "Evaluation demo", caption: "Choose a model and inspect its decision", icon: "play" as const }
      ];

  return (
    <nav className="glass-action-links" aria-label={locale === "zh" ? "主要入口" : "Primary destinations"}>
      {links.map((link, index) => (
        <a className={`glass-action glass-action--${index + 1}`} href={link.href} key={link.href}>
          <span className="glass-action__icon"><i /><Icon name={link.icon} size={24} /></span>
          <span><strong>{link.title}</strong><small>{link.caption}</small></span>
          <Icon name="arrow" size={19} />
        </a>
      ))}
    </nav>
  );
}
