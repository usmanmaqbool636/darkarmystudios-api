import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'profitrack',
    entities: [__dirname + '/../**/*.entity.{js,ts}', __dirname + '/../**/model/*.entity.{js,ts}'],
    subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
    synchronize: true,
};
