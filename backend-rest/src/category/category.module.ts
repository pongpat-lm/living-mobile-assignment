import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
@Module({
    imports: [SequelizeModule.forFeature([CategoryModel])],
    exports: [SequelizeModule],
    providers: [CategoryService],
})
export class CategoryModule {}
