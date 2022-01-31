import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../model/user.repository";
import { Injectable, NotFoundException } from "@nestjs/common"
import { UserDTO } from "../model/user.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    ) {
    }
    createUserService(user: UserDTO) {
        return this.userRepository.createUser(user)
    }
    findOneById(id: any) {
        return this.userRepository.findOne({
            where: { id: id },
        });
    }
    async userLogin(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ email: email });
        if (user) {
            const response = await user.validatePassword(password);
            console.log(response);
            if (response) {
                const accessToken = this.jwtService.sign(JSON.stringify(user));
                return { accessToken };
            } else {
                throw new NotFoundException('Username or password wrong!');
            }
        } else {
            throw new NotFoundException('User not exists!');
        }
    }
    getUser() {
        return this.userRepository.find();
    }
}
