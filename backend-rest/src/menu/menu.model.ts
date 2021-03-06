import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CategoryModel } from '../category/category.model';
@Table({
  tableName: 'menu',
})
export class MenuModel extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => CategoryModel)
  categoryId: string;

  @Column
  name: string;

  @Column
  price: number;
}
