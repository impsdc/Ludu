import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

interface IPassportInfo {
  name: string;
  message: string;
  expiredAt: string;
}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: IPassportInfo | undefined) {
    if (info !== undefined) {
      throw new ForbiddenException(info.message);
    }
    return user;
  }
}
