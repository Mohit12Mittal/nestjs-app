import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { loginAdminDto, registerAdminDto } from './dto/admin.dto.js';
import { AdminService } from './admin.service.js';
import { Roles } from '../common/decorator/roles.decorator.js';
import { Role } from '../common/enum.js';
import { RolesGuard } from '../guard/roles.guard.js';
import { AuthGuard } from '../guard/auth.guard.js';
import { UserService } from '../user/user.service.js';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  registerAdmin(@Body() registerAdminDto: registerAdminDto) {
    return this.adminService.registerAdminService(registerAdminDto);
  }
  @Post('login')
  loginAdmin(@Body() loginAdminDto: loginAdminDto) {
    return this.adminService.loginAdminService(loginAdminDto);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('user/delete/:id')
  deleteUserByAdmin(@Param('id') id: string) {
    return this.userService.userDeleteService(id);
  }
}
