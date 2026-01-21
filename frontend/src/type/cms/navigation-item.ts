import { Detail } from '@/type/base/detail';

export interface NavigationItem {
  id: number;
  url: string;
  name: Detail[];
  icon: string;
  children?: NavigationItem[];
  sequence: number;
}