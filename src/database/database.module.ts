import { Global, Module } from '@nestjs/common';

const API_KEY = 'DEVKEY1212';
const API_KEY_PROD = 'PRODKEY1212';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
