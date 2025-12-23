import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class CmsBaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'boolean', default: false })
  isDeleted?: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp'})
  updatedAt?: Date;
}