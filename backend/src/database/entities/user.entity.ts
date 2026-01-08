import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn, JoinTable, ManyToMany, ManyToOne,
} from 'typeorm';
import { CmsBaseEntity } from './cms-base.entity';
import { hash } from 'argon2';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity extends CmsBaseEntity {
  constructor(params?: Partial<UserEntity>) {
    super();
    Object.assign(this, params);
  }

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;


  @Column({ type: 'varchar', nullable: false })
  password: string;
  @Column({type:'boolean', nullable:false,default:false})
  isRootUser:boolean;
  @JoinTable()
  @ManyToMany((type)=>RoleEntity)
  roles: RoleEntity[];
  @ManyToOne((type) => UserEntity)
  @JoinColumn({ referencedColumnName: 'id' })
  createdBy: UserEntity;
  @ManyToOne((type) => UserEntity)
  @JoinColumn({ referencedColumnName: 'id' })
  updatedBy: UserEntity;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password);
    }
  }

}