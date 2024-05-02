import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenEntity } from '../entities/token.entity';
import { UserModule } from './../user';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
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
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy],
})
export class AuthModule { }
