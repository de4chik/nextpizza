import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @Get('by-id/:id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Post('create')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
}
