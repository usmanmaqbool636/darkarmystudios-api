import { IsString, IsEmail, IsPhoneNumber, MinLength } from "class-validator"
export class UserDTO {
   
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    password: string
}