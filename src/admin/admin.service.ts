import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { loginAdminDto, registerAdminDto } from './dto/admin.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../schema/admin.schema.js';
import { Model } from 'mongoose';
import { hash_Password } from '../common/utils/password.utils.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async registerAdminService(registerAdminDto: registerAdminDto) {
    try {
      const { email, password } = registerAdminDto;
      const hashPass = hash_Password(password);
      const admin = await this.adminModel.create({
        email,
        password: hashPass,
      });
      const payload = {
        sub: admin._id,
        email: admin.email,
        role: 'admin',
      };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

      return {
        success: true,
        message: 'Admin Register Successfully',
        data: {
          access_token,
        },
      };
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ConflictException('A admin with this email already exists.');
      }
      throw new InternalServerErrorException('Unable to register admin');
    }
  }
  async loginAdminService(loginAdminDto: loginAdminDto) {
    try {
      const { email, password } = loginAdminDto;
      const hashPass = hash_Password(password);
      const admin = await this.adminModel.findOne({
        email,
        isDelete: false,
        password: hashPass,
      });
      if (!admin) {
        throw new NotFoundException('Please Enter Valid Email or Password.');
      }
      const payload = {
        sub: admin._id,
        email: admin?.email,
        role: 'admin',
      };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });
      return {
        success: true,
        message: 'Admin Login Successfully',
        data: {
          access_token,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
