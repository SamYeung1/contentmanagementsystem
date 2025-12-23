import {
  Column,
  Entity,
  JoinColumn, JoinTable, ManyToMany, ManyToOne,
} from 'typeorm';
import { CmsBaseEntity } from './cms-base.entity';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends CmsBaseEntity {
  constructor(params?: Partial<RoleEntity>) {
    super();
    Object.assign(this, params);
  }

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @JoinTable()
  @ManyToMany((type)=>PermissionEntity,{cascade:true})
  permissions: PermissionEntity[];

  @ManyToOne((type) => UserEntity)
  @JoinColumn({  referencedColumnName: 'id' })
  createdBy: UserEntity;
  @ManyToOne((type) => UserEntity)
  @JoinColumn({  referencedColumnName: 'id' })
  updatedBy: UserEntity;

}