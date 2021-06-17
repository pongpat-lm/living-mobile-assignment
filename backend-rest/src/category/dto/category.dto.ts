import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryDto {
    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    storeId: string;
}