type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-white/80 text-sm mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-2">›</span>}
          <a href={item.href} className="hover:text-white">
            {item.label}
          </a>
        </span>
      ))}
    </nav>
  );
}