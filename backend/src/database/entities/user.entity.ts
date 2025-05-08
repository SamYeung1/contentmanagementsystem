import {BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {CmsBase} from "./cms-base.entity";
import {hash} from "argon2";

@Entity({name:'users'})
export class User extends CmsBase {
    constructor(params?: Partial<User>) {
        super();
        Object.assign(this, params);
    }
    @Column({type: 'varchar',nullable:false})
    name: string;

    @Column({type: 'varchar',nullable:false})
    email: string;


    @Column({type: 'varchar',nullable:false})
    password: string;

    @OneToOne((type) => User)
    @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
    createdBy: User;
    @OneToOne((type) => User)
    @JoinColumn({ name: 'updated_by', referencedColumnName: 'id' })
    updatedBy: User;

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password);
        }
    }

}