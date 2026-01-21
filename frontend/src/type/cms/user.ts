import Role from '@/type/cms/role';
import BaseItemCms from '@/type/base/base-item-cms';

export interface UserResponse  extends BaseItemCms{
  id:        number;
  email:     string;
  name:      string;
  roles:     Role[];
}