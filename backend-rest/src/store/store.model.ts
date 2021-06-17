import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'store',
})
export class StoreModel extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  rating: number;
}
