import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '../../../types/category.type';
import { IsString } from 'class-validator';

export class CreateCategoryDto implements Omit<ICategory, 'id'> {
  @ApiProperty({ example: 'description of category' })
  @IsString({ message: 'description must be a string' })
  description: string;

  @ApiProperty({ example: 'name of category' })
  @IsString({ message: 'name must be a string' })
  name: string;
}
