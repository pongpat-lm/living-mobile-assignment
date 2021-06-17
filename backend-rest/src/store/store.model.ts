import { Column, Model, Table, DataType, Sequelize } from 'sequelize-typescript';

@Table({
  tableName: 'store',
})
export class StoreModel extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUIDV4,
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
