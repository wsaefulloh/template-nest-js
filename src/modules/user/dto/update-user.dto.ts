import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  [x: string]: string;
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  new_password: string;
  old_password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
