import { SetMetadata } from '@nestjs/common';
import { UserRole } from './constants';

export const ROLES_KEY = 'roles';
export const UserRoles = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
