import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {CmsBase} from "./cms-base.entity";
import {hash} from "argon2";

@Entity({name:'users'})
export class User extends CmsBase {

    @Column({type: 'varchar', length: 30,nullable:false})
    name: string;

    @Column({type: 'varchar',nullable:false})
    email: string;


    @Column({type: 'varchar',nullable:false})
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password);
        }
    }

}