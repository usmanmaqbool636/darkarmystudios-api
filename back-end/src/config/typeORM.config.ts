import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1212',
    database: 'kma',
    entities: [__dirname + '/../**/*.entity.{js,ts}', __dirname + '/../**/model/*.entity.{js,ts}'],
    subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
    synchronize: true,
};
