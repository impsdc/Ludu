import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IActiveUser } from '../../modules/auth/stategy/Jwt.strategy';

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IActiveUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
