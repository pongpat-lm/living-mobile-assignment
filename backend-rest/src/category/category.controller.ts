import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse, ApiConflictResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiCreatedResponse({
    // HTTP 201
    description: 'The category has been successfully created.',
    type: CategoryDto,
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    // this will map User model value to UserDto model value.
    return plainToClass(CategoryDto, category, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Find all categories' })
  @ApiOkResponse({
    // HTTP 200
    description: 'All of categories',
    isArray: true,
    type: CategoryDto,
  })
  async findAll() {
    const categories = await this.categoryService.findAll();
    return categories.map((category) =>
      plainToClass(CategoryDto, category, { excludeExtraneousValues: true }),
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiOkResponse({
    // HTTP 200
    description: 'Update Successfully.',
    type: CategoryDto,
  })
  @ApiBadRequestResponse({
    description: 'The update-category input is invalid.',
  })
  async update(
    @Body() createStoreDto: CreateCategoryDto,
    @Param('id') id: string,
  ) {
    const category = await this.categoryService.update(createStoreDto, id);
    return plainToClass(CategoryDto, category, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiOkResponse({
    description: `Delete Successfully.`,
    type: CategoryDto
  })
  @ApiConflictResponse({
    description: `No resource matched.`
  })
  async delete(@Param('id') id: string) {
    const category = await this.categoryService.delete(id);
    return plainToClass(CategoryDto, category, { excludeExtraneousValues: true });
  }
}
