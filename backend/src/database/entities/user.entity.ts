import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CmsBaseEntity } from './cms-base.entity';
import { hash } from 'argon2';

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

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  createdBy: UserEntity;
  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'id' })
  updatedBy: UserEntity;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password);
    }
  }

}