import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { loginUserDto, regisetrUserDTO } from './dto/auth.dto.js';
import { hash_Password } from '../common/utils/password.utils.js';
import { User, UserDocument } from '../schema/user.schema.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUserService(dto: regisetrUserDTO) {
    try {
      // 1. Generate document ID
      const docId = new Types.ObjectId();
      const hashPassword = hash_Password(dto?.password);

      // 2. Create user in database
      const user = await this.userModel.create({
        ...dto,
        _id: docId,
        password: hashPassword,
      });

      // 3. Generate JWT payload
      const payload = {
        sub: user._id.toString(),
        email: user.email,
        role: 'user',
      };

      // 4. Generate access token
      const accessToken = await this.jwtService.signAsync(payload);

      // 5. Return response
      return {
        success: true,
        message: 'User registered successfully',
        data: {
          access_token: accessToken,
        },
      };
    } catch (error) {
      // Handle duplicate key error
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ConflictException('A user with this email already exists');
      }

      // Log unexpected errors
      this.logger.error(
        'User registration failed',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Unable to register user');
    }
  }

  async loginUser(loginDto: loginUserDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({
        email: email,
        password: hash_Password(password),
      });
      if (!user) {
        throw new NotFoundException('InCorrect Email Id or Password');
      }
      const access_token = await this.jwtService.signAsync({
        sub: user?._id.toString(),
        email: user.email,
        role: 'user',
      });
      return {
        success: true,
        message: 'Login Successfully',
        data: {
          access_token,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
