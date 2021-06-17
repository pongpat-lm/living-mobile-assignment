import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModel } from './store.model';

@Module({
    imports: [SequelizeModule.forFeature([StoreModel])],
    exports: [SequelizeModule],
})
export class StoreModule {}
