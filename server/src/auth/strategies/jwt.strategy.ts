import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces';

import { UserEntity } from 'src/entities';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
