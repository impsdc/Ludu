import { ObjectId } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ROLES } from '../../../schemas/user.schema';

export interface IActiveUser {
  id: ObjectId;
  username: string;
  role: ROLES;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('app.jwtSecret'),
    });
  }

  // Return user Data from token
  async validate(payload: any): Promise<IActiveUser> {
    if (!payload) {
      throw new NotFoundException(`Bearer Token no found or corrupted`);
    }
    const userValide = await this.authService.validateUser(payload);

    if (!userValide) {
      throw new NotFoundException(`Token has been corrupted`);
    }
    return payload;
  }
}
