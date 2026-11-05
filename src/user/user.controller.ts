import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard.js';
import { UserService } from './user.service.js';
import { changeStatusDto, updateUserDto } from '../auth/dto/auth.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Patch('update')
  updateUser(@Req() req: any, @Body() updateUserDto: updateUserDto) {
    const { sub: id } = req.user;
    return this.userService.updateUserService(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Get('details')
  userDetails(@Req() req: any) {
    const { sub: id } = req.user;
    return this.userService.userDetailsService(id);
  }
  @UseGuards(AuthGuard)
  @Patch('delete')
  deleteUser(@Req() req: any) {
    const { sub: id } = req?.user;
    return this.userService.userDeleteService(id);
  }
  @UseGuards(AuthGuard)
  @Patch('change_status')
  changeUserStatus(@Req() req: any, @Body() changeStatusDto: changeStatusDto) {
    const { sub: id } = req.user;
    return this.userService.userStatusChangeService(id, changeStatusDto);
  }
}
