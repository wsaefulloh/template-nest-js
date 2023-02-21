import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}

  public async create(
    input: CreateProductDto,
    image_product: string,
  ): Promise<any> {
    try {
      const product = new Product();
      const dateString = new Date();
      product.name_product = input.name_product;
      product.brand_product = input.brand_product;
      product.id_category = input.id_category;
      product.price_product = input.price_product;
      product.description = input.description;
      product.image_product = image_product;
      product.createdAt = dateString.toISOString();
      product.updatedAt = dateString.toISOString();
      const data = await this.product.save(product);
      return new HttpException(data, HttpStatus.CREATED);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findAll(): Promise<any> {
    try {
      const data = await this.product.find();
      return new HttpException(data, HttpStatus.OK);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async update(input: CreateProductDto, id: any): Promise<any> {
    try {
      const data = await this.product.findOne(id);
      const dateString = new Date();
      await this.product.update(
        { id },
        {
          name_product: input.name_product,
          brand_product: input.brand_product,
          id_category: input.id_category,
          price_product: input.price_product,
          description: input.description,
          image_product: input.image_product,
          createdAt: data.createdAt,
          updatedAt: dateString.toISOString(),
        },
      );
      return new HttpException(`OK`, HttpStatus.OK);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async remove(id: number): Promise<any> {
    try {
      await this.product.delete(id);
      return new HttpException('OK', HttpStatus.OK);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
