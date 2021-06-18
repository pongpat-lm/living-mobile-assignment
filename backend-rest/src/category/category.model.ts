import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { StoreModel } from 'src/store/store.model';
import { MenuModel } from 'src/menu/menu.model';
@Table({
  tableName: 'category',
})
export class CategoryModel extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column
  name: string;

  @ForeignKey(() => StoreModel)
  storeId: string;

  @HasMany(() => MenuModel)
  category: CategoryModel[];
}
