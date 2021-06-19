import { Body, Controller, Get, Post, Put, Param, Delete} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse, ApiConflictResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MenuDto } from './dto/menu.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';


@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create menu' })
  @ApiCreatedResponse({
    // HTTP 201
    description: 'The menu has been successfully created.',
    type: MenuDto,
  })
  @ApiBadRequestResponse({
    description: 'The create-menu input is invalid.',
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  async create(@Body() createMenuDto: CreateMenuDto) {
    const menu = await this.menuService.create(createMenuDto);
    // this will map User model value to UserDto model value.
    return plainToClass(MenuDto, menu, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Find all menu' })
  @ApiOkResponse({
    // HTTP 200
    description: 'All of menus',
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
  @ApiOperation({ summary: 'Update menu' })
  @ApiOkResponse({
    // HTTP 200
    description: 'Update Successfully.',
    type: MenuDto,
  })
  @ApiBadRequestResponse({
    description: 'The update-menu input is invalid.',
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  async update(
    @Body() createMenuDto: CreateMenuDto,
    @Param('id') id: string,
  ) {
    const menu = await this.menuService.update(createMenuDto, id);
    return plainToClass(MenuDto, menu, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu' })
  @ApiOkResponse({
    description: `Delete Successfully.`,
    type: MenuDto
  })
  @ApiConflictResponse({
    description: `No resource matched.`
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  async delete(@Param('id') id: string) {
    const user = await this.menuService.delete(id);
    return plainToClass(MenuDto, user, { excludeExtraneousValues: true });
  }
}
