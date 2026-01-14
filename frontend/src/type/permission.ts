import BaseItemCms from '@/type/base/base-item-cms';

export default interface Permission  extends BaseItemCms{
  id:        number;
  action:    string;
  name:      string;
}