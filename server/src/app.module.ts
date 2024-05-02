
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog';
import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { PostModule } from './post';
import { CommentModule } from './comment/comment.module';
import { AmortizationScheduleModule } from './amortization/amortization-schedule.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BlogModule,
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    AmortizationScheduleModule,
  ],

})
export class AppModule { }
