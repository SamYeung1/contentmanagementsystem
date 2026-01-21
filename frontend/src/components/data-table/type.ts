import { ReactNode } from 'react';

export type HeadCellItem = {
  label: string;
  key:string;
  sortable?: boolean;
  render?:(item: any) => ReactNode;
  hidden?:boolean;
}