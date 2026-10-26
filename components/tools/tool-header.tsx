import Link from "next/link";

export function ToolHeader({
  index,
  stage,
  title,
  text,
}: {
  index: string;
  stage: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">
        {index} · {stage}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-[-0.045em] md:text-7xl">{title}</h1>
      <p className="mt-5 max-w-xl text-muted">{text}</p>
      <Link href="/tools" className="mt-4 inline-block text-sm text-muted hover:text-fg">
        All tools
      </Link>
    </div>
  );
}
