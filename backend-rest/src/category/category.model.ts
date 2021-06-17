import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { StoreModel } from 'src/store/store.model';
@Table({
  tableName: 'category',
})
export class CategoryModel extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column
  name: string;

  @ForeignKey(
    () => StoreModel
  )
  @Column
  storeId: string;
}
