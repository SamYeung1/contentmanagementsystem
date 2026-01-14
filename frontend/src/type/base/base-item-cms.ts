import By from '@/type/base/by';

export default interface BaseItemCms {
  createdAt:   string;
  updatedAt:   string;
  createdBy?: By | null;
  updatedBy?: By | null;
}