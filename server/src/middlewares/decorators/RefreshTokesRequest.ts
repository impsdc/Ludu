import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRefreshToken } from '../../modules/auth/stategy/Jwt-refresh.strategy';

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IRefreshToken => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
