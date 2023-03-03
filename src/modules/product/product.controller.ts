import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { UpdateUserDto } from './dto/update-user.dto';
import { multerOptions } from '../../helpers/multer';
import { StandartResponse } from 'src/helpers/response';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  private standartResponse: StandartResponse = new StandartResponse();
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image_product', multerOptions))
  public async create(
    @Body() request: CreateProductDto,
    @Res() res: Response,
    @UploadedFile() image_product: Express.Multer.File,
  ): Promise<any> {
    try {
      return await this.productService.create(request, image_product.path, res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  @Get()
  public async findAll(@Res() res: Response): Promise<any> {
    try {
      return await this.productService.findAll(res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image_product'))
  public async update(
    @Body() request: CreateProductDto,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.productService.update(request, Number(id), res);
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
      return await this.productService.remove(Number(id), res);
    } catch (error) {
      this.standartResponse.response(res, 500, error);
    }
  }
}
