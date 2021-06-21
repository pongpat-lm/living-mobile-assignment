import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiConflictResponse
} from '@nestjs/swagger';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { StoreDto } from './dto/store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @ApiCreatedResponse({
    // HTTP 201
    description: 'The store has been successfully created.',
    type: StoreDto,
  })
  @ApiBadRequestResponse({
    description: 'The create-store input is invalid.',
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
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

  @Put(':id')
  @ApiOkResponse({
    // HTTP 200
    description: 'Update Successfully.',
    type: StoreDto,
  })
  @ApiBadRequestResponse({
    description: 'The update-store input is invalid.',
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
    @Body() createStoreDto: CreateStoreDto,
    @Param('id') id: string,
  ) {
    const user = await this.storeService.update(createStoreDto, id);
    return plainToClass(StoreDto, user, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @ApiOkResponse({
    description: `Delete Successfully.`,
    type: StoreDto
  })
  @ApiConflictResponse({
    description: `No resource matched.`
  })
  async delete(@Param('id') id: string) {
    const user = await this.storeService.delete(id);
    return plainToClass(StoreDto, user, { excludeExtraneousValues: true });
  }
}
