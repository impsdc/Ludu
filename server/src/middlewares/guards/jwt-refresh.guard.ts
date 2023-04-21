import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

interface IPassportInfo {
  name: string;
  message: string;
  expiredAt: string;
}

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err, refreshToken: any, info: IPassportInfo | undefined) {
    if (info !== undefined) {
      throw new ForbiddenException(info.message);
    }
    return refreshToken;
  }
}
