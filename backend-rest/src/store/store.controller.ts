import { Body, Controller, Get, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { StoreDto } from './dto/store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @ApiCreatedResponse({
    // HTTP 201
    description: 'The user has been successfully created.',
    type: StoreDto,
  })
  async create(@Body() createStoreDto: CreateStoreDto) {
    const user = await this.storeService.create(createStoreDto);
    // this will map User model value to UserDto model value.
    return plainToClass(StoreDto, user, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOkResponse({
    // HTTP 200
    description: 'All of stores',
    isArray: true,
    type: StoreDto,
  })
  async findAll() {
    const users = await this.storeService.findAll();
    return users.map((user) =>
      plainToClass(StoreDto, user, { excludeExtraneousValues: true }),
    );
  }
}
