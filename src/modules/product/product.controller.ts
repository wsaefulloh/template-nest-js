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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { UpdateUserDto } from './dto/update-user.dto';
import { multerOptions } from '../../helpers/multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image_product', multerOptions))
  public async create(
    @Body() request: CreateProductDto,
    @UploadedFile() image_product: Express.Multer.File,
  ): Promise<any> {
    try {
      return await this.productService.create(request, image_product.path);
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async findAll(): Promise<any> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image_product'))
  public async update(
    @Body() request: CreateProductDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.productService.update(request, Number(id));
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<any> {
    try {
      return await this.productService.remove(Number(id));
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
