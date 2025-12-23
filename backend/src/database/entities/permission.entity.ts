import {
  Column,
  Entity,
  JoinColumn, ManyToOne
} from 'typeorm';
import { CmsBaseEntity } from './cms-base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends CmsBaseEntity {
  constructor(params?: Partial<PermissionEntity>) {
    super();
    Object.assign(this, params);
  }

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  action: string;

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ referencedColumnName: 'id' })
  createdBy: UserEntity;
  @ManyToOne((type) => UserEntity)
  @JoinColumn({  referencedColumnName: 'id' })
  updatedBy: UserEntity;

}