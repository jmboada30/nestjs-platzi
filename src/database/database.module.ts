import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, ...postgres } = configService.postgres;
        return {
          type: 'postgres',
          ...postgres,
          username: user,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client(configService.postgres);
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
