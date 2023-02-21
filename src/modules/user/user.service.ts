import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Token } from '../../helpers/auth';

@Injectable()
export class UserService {
  private token: Token = new Token();
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  public async create(input: CreateUserDto): Promise<any> {
    try {
      const check = await this.user.find({
        where: { username: input.username },
      });
      if (check.length != 0) {
        return new HttpException(
          'Username already use',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const user = new User();
        const dateString = new Date();
        user.name = input.name;
        user.username = input.username;
        user.password = await this.token.HashingPassword(input.password);
        user.createdAt = dateString.toISOString();
        user.updatedAt = dateString.toISOString();
        const data = await this.user.save(user);
        return new HttpException(data, HttpStatus.CREATED);
      }
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async update(input: CreateUserDto, id: any): Promise<any> {
    try {
      const data = await this.user.findOne(id);
      const validation = await this.token.ComparePass(
        input.password,
        data.password,
      );
      if (validation == true) {
        const dateString = new Date();

        await this.user.update(
          { id },
          {
            name: input.name,
            username: input.username,
            password: await this.token.HashingPassword(input.new_password),
            createdAt: data.createdAt,
            updatedAt: dateString.toISOString(),
          },
        );
        return new HttpException(`OK`, HttpStatus.OK);
      } else {
        return new HttpException(`Wrong Old Password`, HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async login(username: string, password: string): Promise<any> {
    try {
      const check = await this.user.find({
        where: { username: username },
      });
      if (check.length == 0) {
        return new HttpException(`User Not Found`, HttpStatus.BAD_REQUEST);
      }
      const validation = await this.token.ComparePass(
        password,
        check[0].password,
      );
      if (validation == false) {
        return new HttpException(`Wrong Password`, HttpStatus.UNAUTHORIZED);
      } else {
        const result = await this.token.CreateToken(
          check[0].username,
          check[0].password,
        );
        return new HttpException(result, HttpStatus.OK);
      }
    } catch (error) {
      return new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
