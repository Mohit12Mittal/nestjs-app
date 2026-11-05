import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema.js';
import { Model } from 'mongoose';
import { changeStatusDto, updateUserDto } from '../auth/dto/auth.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async updateUserService(id: string, updateUserDto: updateUserDto) {
    try {
      const user = await this.userModel.findOne({ _id: id, isDelete: false });
      if (!user) {
        throw new NotFoundException('User Not Found..');
      }
      user.name = updateUserDto.name;
      user.address = updateUserDto.address;
      user.age = updateUserDto.age;
      user.phone = updateUserDto.phone;
      await user.save();
      return {
        success: true,
        message: 'User Updated Successfully',
      };
    } catch (error) {
      throw error;
    }
  }
  async userDetailsService(id: string) {
    try {
      const user = await this.userModel
        .findOne({
          _id: id,
          isDelete: false,
        })
        .select({
          name: 1,
          age: 1,
          address: 1,
          email: 1,
          phone: 1,
        });
      if (!user) {
        throw new NotFoundException('User Not Found..');
      }
      return {
        success: true,
        message: 'User Details Fetch Successfully',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async userDeleteService(id: string) {
    try {
      const user = await this.userModel.findOneAndUpdate(
        {
          _id: id,
          isDelete: false,
        },
        {
          isDelete: true,
        },
        {
          returnDocument: 'after',
        },
      );
      if (!user) {
        throw new NotFoundException('User Not Found.');
      }
      return {
        success: true,
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      throw error;
    }
  }
  async userStatusChangeService(id: string, changeStatusDto: changeStatusDto) {
    try {
      const user = await this.userModel.findOneAndUpdate(
        {
          _id: id,
          isDelete: false,
        },
        {
          isActive: changeStatusDto.isActive,
        },
        {
          returnDocument: 'after',
        },
      );
      if (!user) {
        throw new NotFoundException('User Not Found.');
      }
      return {
        success: true,
        message: 'User Status Change Successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
