import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
@Module({
    imports: [SequelizeModule.forFeature([CategoryModel])],
    exports: [SequelizeModule],
})
export class CategoryModule {}
