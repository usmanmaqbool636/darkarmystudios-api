import { TypeOrmConfig } from './config/typeORM.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig)
    ,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
