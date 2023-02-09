import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private category: Repository<Category>,
  ) {}

  public async create(input: CreateCategoryDto): Promise<any> {
    try {
      const category = new Category();
      const dateString = new Date();
      category.name_category = input.name_category;
      category.createdAt = dateString.toString();
      category.updatedAt = dateString.toString();
      const data = await this.category.save(category);
      return new HttpException(data, HttpStatus.CREATED);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findAll(): Promise<any> {
    try {
      const data = await this.category.find();
      return new HttpException(data, HttpStatus.OK);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async update(input: CreateCategoryDto, id: any): Promise<any> {
    try {
      const data = await this.category.findOne(id);
      const dateString = new Date();
      await this.category.update(
        { id },
        {
          name_category: input.name_category,
          createdAt: data.createdAt,
          updatedAt: dateString.toString(),
        },
      );
      return new HttpException(`OK`, HttpStatus.OK);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async remove(id: number): Promise<any> {
    try {
      await this.category.delete(id);
      return new HttpException('OK', HttpStatus.OK);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
