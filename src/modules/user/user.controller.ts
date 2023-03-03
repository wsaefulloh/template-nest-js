import { Controller, Post, Body, Put, Get, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StandartResponse } from 'src/helpers/response';
import { Response } from 'express';

@Controller('user')
export class UserController {
  private standartResponse: StandartResponse = new StandartResponse();
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(
    @Body() request: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.userService.create(request, res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  @Put()
  public async update(
    @Body() request: UpdateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.userService.update(request, res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  @Get('/login')
  public async login(
    @Query('username') username: string,
    @Query('password') password: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.userService.login(username, password, res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }
}
