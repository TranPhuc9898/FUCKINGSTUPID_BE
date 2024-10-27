import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Cái quần què email để trống sao biết là ai 😎',
  })
  @IsEmail(
    {},
    {
      message: 'Email nhập kiểu gì thế, sai định dạng rồi 😎',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Chỉ có thằng viết ra app này mới có quyền để trống ô tô kê 😛',
  })
  password: string;

  name?: string;
}
