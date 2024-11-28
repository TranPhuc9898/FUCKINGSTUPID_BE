import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

// NOTE: MAPPED TYPE
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {
  // Thêm các field khác nếu cần
  @IsNotEmpty({
    message: 'Cái quần què gì dậy',
  })
  _id: string;
}
