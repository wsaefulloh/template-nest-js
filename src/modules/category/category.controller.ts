import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public async create(@Body() request: CreateCategoryDto): Promise<any> {
    try {
      return await this.categoryService.create(request);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async findAll(): Promise<any> {
    try {
      return await this.categoryService.findAll();
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  public async update(
    @Body() request: CreateCategoryDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.categoryService.update(request, Number(id));
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<any> {
    try {
      return await this.categoryService.remove(Number(id));
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
