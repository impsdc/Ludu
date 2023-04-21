import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongoose';

export interface IRefreshToken {
  id: ObjectId;
  refreshToken: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('app.jwtRefreshSecret'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    if (payload.id == undefined) {
      throw new NotFoundException(`Bearer Token no found or corrupted`);
    }
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
