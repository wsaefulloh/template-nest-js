import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Token } from '../../helpers/auth';
import { UpdateUserDto } from './dto/update-user.dto';
import { StandartResponse } from 'src/helpers/response';
import { Response } from 'express';

@Injectable()
export class UserService {
  private token: Token = new Token();
  private standartResponse: StandartResponse = new StandartResponse();
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  public async create(input: CreateUserDto, res: Response): Promise<any> {
    try {
      const check = await this.user.find({
        where: { username: input.username },
      });
      if (check.length != 0) {
        this.standartResponse.response(res, 400, 'Username already use');
      } else {
        const user = new User();
        const dateString = new Date();
        user.name = input.name;
        user.username = input.username;
        user.password = await this.token.HashingPassword(input.password);
        user.createdAt = dateString.toISOString();
        user.updatedAt = dateString.toISOString();
        const data = await this.user.save(user);
        this.standartResponse.response(res, 201, data);
      }
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  public async update(input: UpdateUserDto, res: Response): Promise<any> {
    try {
      const checkAvailableUser = await this.user.find({
        where: { username: input.username },
      });

      let data: any;

      if (checkAvailableUser.length == 0) {
        this.standartResponse.response(res, 500, "Username doesn't exist");
      } else {
        data = checkAvailableUser[0];
      }

      const validation = await this.token.ComparePass(
        input.old_password,
        data.password,
      );

      const id = data.id;
      if (validation == true) {
        const dateString = new Date();

        const result = await this.user.update(
          { id },
          {
            name: input.name,
            username: input.username,
            password: await this.token.HashingPassword(input.new_password),
            createdAt: data.createdAt,
            updatedAt: dateString.toISOString(),
          },
        );
        this.standartResponse.response(res, 200, result);
      } else {
        this.standartResponse.response(res, 401, `Wrong Old Password`);
      }
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  public async login(
    username: string,
    password: string,
    res: Response,
  ): Promise<any> {
    try {
      const check = await this.user.find({
        where: { username: username },
      });
      if (check.length == 0) {
        this.standartResponse.response(res, 400, `User Not Found`);
      }
      const validation = await this.token.ComparePass(
        password,
        check[0].password,
      );
      if (validation == false) {
        this.standartResponse.response(res, 401, `Wrong Old Password`);
      } else {
        const result = await this.token.CreateToken(
          check[0].username,
          check[0].password,
        );
        this.standartResponse.response(res, 200, result);
      }
    } catch (error) {
      this.standartResponse.response(res, 400, error);
    }
  }
}
