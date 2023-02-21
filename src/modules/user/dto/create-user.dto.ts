import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  new_password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
