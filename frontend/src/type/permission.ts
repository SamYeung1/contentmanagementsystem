import BaseItemCms from '@/type/base/base-item-cms';

export interface Permission  extends BaseItemCms{
  id:        number;
  action:    string;
  name:      string;
}