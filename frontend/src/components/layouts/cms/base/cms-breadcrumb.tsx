import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';


export interface BreadcrumbItem {
  text: string;
  href?: string;
}

interface CmsBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function CmsBreadcrumb({ items }: CmsBreadcrumbProps) {
  return (
    <Breadcrumb>
      {items.map((item, index) => (
        <BreadcrumbItem key={`cms_breadcrumb_${index}`} href={item.href}>
          {item.text}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}