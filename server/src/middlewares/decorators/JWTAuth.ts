import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function JWTAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('JWT'),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
  );
}
