
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogModule } from './blog';
import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { PostModule } from './post';
import { CommentModule } from './comment/comment.module';
import { AmortizationScheduleModule } from './amortization/amortization-schedule.module';
import { typeOrmConfig } from './config/typeorm';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (): Promise<TypeOrmModuleOptions> => { return typeOrmConfig }
    }),
    BlogModule,
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    AmortizationScheduleModule,
  ],

})
export class AppModule { }
