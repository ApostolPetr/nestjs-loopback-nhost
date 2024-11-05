import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './constants';
import { ROLES_KEY } from './roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuardGraphql implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext().req;

    return requiredRoles.some((role) => user?.role === role);
  }
}
