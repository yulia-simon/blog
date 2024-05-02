import { Module } from '@nestjs/common';
import { UserEntity } from './../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RolesGuard } from './roles/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { TokenEntity } from '../entities';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
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
  controllers: [UserController],

  providers: [UserService, RolesGuard],
  exports: [UserService],
})
export class UserModule { }
