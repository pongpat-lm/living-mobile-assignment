import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    categoryId: string;

    @ApiProperty()
    price: number;
}