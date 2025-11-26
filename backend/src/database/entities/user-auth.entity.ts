import {
  Column,
  Entity, Index,
  JoinColumn, ManyToOne,
  PrimaryColumn,
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

  @PrimaryColumn({ generated: 'uuid', name: 'token_id' })
  tokenId: string;
  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
  @Column({ type: 'timestamp', name: 'refresh_token_expired_at', nullable: false })
  refreshTokenExpiredAt: Date;
  @Column({ type: 'enum', enum: AuthType })
  type: AuthType;
  @Column({ type: 'timestamp', name: 'issue_at', nullable: false })
  issueAt: Date;
  @Column({ type: 'varchar', name: 'protected_ticket', nullable: false })
  protectedTicket: string;
}