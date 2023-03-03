import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Response } from 'express';
import { StandartResponse } from 'src/helpers/response';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('category')
export class CategoryController {
  private standartResponse: StandartResponse = new StandartResponse();
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public async create(
    @Body() request: CreateCategoryDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.categoryService.create(request, res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  @Get()
  public async findAll(@Res() res: Response): Promise<any> {
    try {
      return await this.categoryService.findAll(res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  @Put(':id')
  public async update(
    @Body() request: CreateCategoryDto,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.categoryService.update(request, Number(id), res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  @Delete(':id')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.categoryService.remove(Number(id), res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }
}
