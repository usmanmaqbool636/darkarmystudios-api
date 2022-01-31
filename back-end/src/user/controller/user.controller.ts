import { Body, Controller, Res, Post, Get, UseGuards } from '@nestjs/common';
import { LoginDTO } from '../model/login.dto';
import { UserDTO } from '../model/user.dto';
import { User } from '../model/user.entity';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @UseGuards(AuthGuard('jwt'))
    @Get('/alluser')
    async getUser(@Res() res): Promise<User[]> {
        const data = await this.userService.getUser();
        return res.status(200).json({
            error: false,
            data,
            message: '',
        });
    }
    @Post("/login")
    async createUser(@Body() user: UserDTO, @Res() res): Promise<void> {
        // console.log("User", user)
        await this.userService.createUserService(user)
        return res.status(200).json
            ({
                error: false,
                message: 'User Created Successfully!',
                data: user.email,
            })
    }
    @Post('/login')
    async loginUser(@Body() loginDTO: LoginDTO, @Res() res): Promise<void> {
        const { email, password } = loginDTO;
        const data = await this.userService.userLogin(email, password);
        return res.status(200).json({
            error: false,
            data,
            message: '',
        });
    }
}
