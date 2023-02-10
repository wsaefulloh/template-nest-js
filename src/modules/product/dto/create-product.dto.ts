import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name_product: string;

  price_product: string;
  brand_product: string;
  image_product: string;
  id_category: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
