type QuickActionCardProps = {
  title: string;
  Icon: any; // could improve later
  link?: string;
  onClick?: () => void;
};

export default function QuickActionCard({ title, Icon, link, onClick }: QuickActionCardProps) {
  const isLink = !!link;
  const baseClass = "flex flex-col items-center justify-center p-6 bg-[#e8dfd3] rounded-lg shadow hover:bg-[#5a4636] hover:text-[#f5efe6] transition cursor-pointer";

  if (isLink) {
    return (
      <a href={link} className={baseClass}>
        <Icon size={24} />
        <span className="mt-2 font-semibold text-center">{title}</span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      <Icon size={24} />
      <span className="mt-2 font-semibold text-center">{title}</span>
    </button>
  );
}