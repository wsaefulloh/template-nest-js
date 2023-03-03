import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  [x: string]: string;
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  name: string;
  createdAt: string;
  updatedAt: string;
}
