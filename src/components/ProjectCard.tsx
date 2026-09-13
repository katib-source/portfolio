import Link from "next/link";
import type { CardColor } from "@/lib/types";

type Props = {
  meta: string;
  title: string;
  desc: string;
  stack: string;
  badge: string;
  color: CardColor;
  /** When set, the whole card is a link to the case study. */
  href?: string;
  titleAs?: "h2" | "div";
};

export function ProjectCard({ meta, title, desc, stack, badge, color, href, titleAs: Title = "div" }: Props) {
  const body = (
    <>
      <div>
        <div className="card-meta">{meta}</div>
        <Title className="card-title">{title}</Title>
        <p className="card-desc">{desc}</p>
      </div>
      <div className="card-foot">
        <span className="card-stack">{stack}</span>
        {badge && <span className="card-badge">{badge}</span>}
      </div>
    </>
  );

  const className = `card bg-${color}`;
  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
