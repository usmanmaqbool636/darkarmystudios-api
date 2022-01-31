import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './model/user.repository';
import { JwtStrategy } from "src/strategy/jwt.strategy"
import { JwtModule } from '@nestjs/jwt';
import { SecretDTO } from 'src/config/secret.dto';
@Module({
  providers: [UserService,
    JwtStrategy,
  ],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secretOrPrivateKey: new SecretDTO().getSecretKey(),
    }),
  ]
})
export class UserModule { }
