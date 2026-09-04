import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findById(id: string) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({ data: createCategoryDto });
  }
}
