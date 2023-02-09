import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name_category: string;

  createdAt: string;
  updatedAt: string;
}
