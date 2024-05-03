import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity, BlogImageEntity, UserEntity } from './../entities';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SlugProvider } from './slug.provider';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([BlogEntity, UserEntity, BlogImageEntity]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [BlogController],
  providers: [SlugProvider, BlogService],
})
export class BlogModule { }
