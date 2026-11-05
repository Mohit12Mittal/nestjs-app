// common/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum.js';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
