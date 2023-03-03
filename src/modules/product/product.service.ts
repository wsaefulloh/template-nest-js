import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { StandartResponse } from 'src/helpers/response';
import { Response } from 'express';

@Injectable()
export class ProductService {
  private standartResponse: StandartResponse = new StandartResponse();
  constructor(
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}

  public async create(
    input: CreateProductDto,
    image_product: string,
    res: Response,
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
      this.standartResponse.response(res, 201, data);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  public async findAll(res: Response): Promise<any> {
    try {
      const data = await this.product.find();
      this.standartResponse.response(res, 200, data);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  public async update(
    input: CreateProductDto,
    id: any,
    res: Response,
  ): Promise<any> {
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
      this.standartResponse.response(res, 201, data);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  public async remove(id: number, res: Response): Promise<any> {
    try {
      const data = await this.product.delete(id);
      this.standartResponse.response(res, 200, data);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }
}
