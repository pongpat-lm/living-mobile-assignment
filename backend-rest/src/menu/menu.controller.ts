import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service'; 
import { CreateMenuDto } from './dto/createMenu.dto'; 
import { ApiOperation } from '@nestjs/swagger';
import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MenuDto } from './dto/menu.dto'; 


@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post()
    @ApiOperation({ summary: 'Create menu' })
    @ApiCreatedResponse({ // HTTP 201
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
    @ApiOkResponse({ // HTTP 200
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

}
