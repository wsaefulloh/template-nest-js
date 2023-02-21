import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() request: CreateUserDto): Promise<any> {
    try {
      return await this.userService.create(request);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  public async update(
    @Body() request: CreateUserDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.userService.update(request, Number(id));
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/login')
  public async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<any> {
    try {
      return await this.userService.login(username, password);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
