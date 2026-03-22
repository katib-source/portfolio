type SectionHeaderProps = {
  title: string;
  id: string;
};

export function SectionHeader({ title, id }: SectionHeaderProps) {
  return (
    <div id={id} className="border-b border-[--border] pb-2">
      <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-[--primary]">
        <span className="mr-2">✦</span>
        {title}
      </h2>
    </div>
  );
}
