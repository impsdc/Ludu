import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../../schemas/user.schema';
import { ROLES_KEY } from '../decorators/RoleAuth';

/**
 * Check if the given roles match the role extract from JWT token
 *
 * @param {ROLES[]} roles[] given role to check
 * @return {boolean} x true if role match the given one
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get Role required from decorator
    const requiredRoles = this._reflector.get<ROLES[]>(ROLES_KEY, context.getHandler());

    // if requiredRoles is empty, route is not under roles restrictions
    if (!requiredRoles) {
      return true;
    }

    // Get role from user token
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const currentRole = ROLES[user.role];
    return requiredRoles.includes(currentRole as never);
  }
}
