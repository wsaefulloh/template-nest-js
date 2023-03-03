import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { StandartResponse } from 'src/helpers/response';
import { Response } from 'express';

@Injectable()
export class CategoryService {
  private standartResponse: StandartResponse = new StandartResponse();
  constructor(
    @InjectRepository(Category) private category: Repository<Category>,
  ) {}

  public async create(input: CreateCategoryDto, res: Response): Promise<any> {
    try {
      const category = new Category();
      const dateString = new Date();
      category.name_category = input.name_category;
      category.createdAt = dateString.toISOString();
      category.updatedAt = dateString.toISOString();
      const data = await this.category.save(category);
      this.standartResponse.response(res, 201, data);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  public async findAll(res: Response): Promise<any> {
    try {
      const data = await this.category.find();
      this.standartResponse.response(res, 200, data);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  public async update(
    input: CreateCategoryDto,
    id: any,
    res: Response,
  ): Promise<any> {
    try {
      const data = await this.category.findOne(id);
      const dateString = new Date();
      await this.category.update(
        { id },
        {
          name_category: input.name_category,
          createdAt: data.createdAt,
          updatedAt: dateString.toISOString(),
        },
      );
      this.standartResponse.response(res, 200, data);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  public async remove(id: number, res: Response): Promise<any> {
    try {
      const data = await this.category.delete(id);
      this.standartResponse.response(res, 200, data);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }
}
