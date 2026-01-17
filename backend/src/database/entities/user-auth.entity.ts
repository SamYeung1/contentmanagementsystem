import {
  Column, CreateDateColumn,
  Entity, Index,
  JoinColumn, ManyToOne,
  PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum AuthType {
  CMS = 'CMS'
}

@Index(['user', 'type'])
@Entity({ name: 'user_auths' })
export class UserAuthEntity {
  constructor(params?: Partial<UserAuthEntity>) {
    Object.assign(this, params);
  }

  @PrimaryColumn({ generated: 'uuid'})
  tokenId: string;
  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
  @Column({ type: 'timestamp', nullable: false })
  refreshTokenExpiredAt: Date;
  @Column({ type: 'enum', enum: AuthType })
  type: AuthType;
  @Column({ type: 'timestamp', nullable: false })
  issueAt: Date;
  @Column({ type: 'varchar', nullable: false })
  protectedTicket: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
  @UpdateDateColumn({ type: 'timestamp'})
  updatedAt?: Date;
}