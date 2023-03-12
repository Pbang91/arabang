import * as jwt from 'jsonwebtoken'
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import authConfig from 'src/config/authConfig';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ){}

    login(email: string) {
        return jwt.sign({email}, this.config.jwtSecret, {
            expiresIn: '7d',
            audience: 'arabang',
            issuer: 'arabang'
        });
    }

    verify(jwtString: string) {
        try {
            const payload = jwt.verify(jwtString, this.config.jwtSecret) as jwt.JwtPayload;

            return {
                email: payload.email
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
