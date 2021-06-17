import { Body, Controller, Get, Post, Put, Param, } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MenuDto } from './dto/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create menu' })
  @ApiCreatedResponse({
    // HTTP 201
    description: 'The user has been successfully created.',
    type: MenuDto,
  })
  async create(@Body() createMenuDto: CreateMenuDto) {
    const menu = await this.menuService.create(createMenuDto);
    // this will map User model value to UserDto model value.
    return plainToClass(MenuDto, menu, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Find all menu' })
  @ApiOkResponse({
    // HTTP 200
    description: 'All of users',
    isArray: true,
    type: MenuDto,
  })
  async findAll() {
    const menus = await this.menuService.findAll();
    return menus.map((menu) =>
      plainToClass(MenuDto, menu, { excludeExtraneousValues: true }),
    );
  }

  @Put(':id')
  @ApiOkResponse({
    // HTTP 200
    description: 'Update Successfully.',
    type: MenuDto,
  })
  @ApiBadRequestResponse({
    description: 'The update-store input is invalid.',
  })
  async update(
    @Body() createMenuDto: CreateMenuDto,
    @Param('id') id: string,
  ) {
    const menu = await this.menuService.update(createMenuDto, id);
    return plainToClass(MenuDto, menu, { excludeExtraneousValues: true });
  }
}
