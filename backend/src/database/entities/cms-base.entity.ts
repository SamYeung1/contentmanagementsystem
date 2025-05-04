import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export abstract class CmsBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'boolean', default: false, name: 'is_deleted'})
    isDeleted: boolean;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;
}