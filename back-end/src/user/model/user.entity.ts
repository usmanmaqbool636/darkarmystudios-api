
import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string

    @Column()
    salt:string;

    async validatePassword(password:string):Promise<boolean>{
        const hash= await bcrypt.hash(password, this.salt)
        return hash===this.password;
    }
}