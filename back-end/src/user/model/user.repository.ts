import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserDTO } from "./user.dto";
import * as bcrypt from 'bcrypt';   
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(userDTO: UserDTO): Promise<void> {
        const {  email,  password } = userDTO;
        const user = new User();
        
       
        user.email = email;
        user.salt=await bcrypt.genSalt();
        user.password = await this.hashPasswod(password,user.salt);
        await user.save()
    }
private async hashPasswod(password:string, salt:string): Promise<string> {
    return bcrypt.hash(password,salt);
}
    
}