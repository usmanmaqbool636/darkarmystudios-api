import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import mongoose from "mongoose";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  private connectToDatabase() {
    mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
        console.log("Mongo Connected!!!");
    }).catch(e => {
        console.log(e);
    })
}
}
