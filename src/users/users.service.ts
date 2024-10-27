import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

//
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  // NOTE: ĐỐNG SHIT NÀY
  // userModel: để sử dụng được create
  // @InjectModel(User.name): Decorator ( tiêm 1 cái model )
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  // async create(email: string, password: string, name: string) {
  //   const hashPassword = this.getHashPassword(password);

  //   return user;
  // }
  // NOTE: Nhờ việc gán type nên khi . ra sẽ gợi ý tất cả dto mình đã khai báo
  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
