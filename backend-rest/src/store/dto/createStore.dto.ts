import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating: number;
}