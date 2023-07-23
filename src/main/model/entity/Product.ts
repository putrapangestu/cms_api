import { Column, Default, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import Cart from './Cart';
import Image from './Image';
import Category from './Category';

/**
 * ProductInterface
 */
export interface ProductInterface {
  id?: number | null;
  name: string;
  desc: string;
  price: number;
  jumlah: number;
  isDelete: number;
}

@Table({
  tableName: 'products',
  timestamps: true,
  underscored: true
})
class Product extends Model implements ProductInterface {

  @Column({
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataType.BIGINT
  })
  id?: number | null;

  @Column({
    allowNull: false,
    field: 'name',
    type: DataType.STRING
  })
  name!: string;

  @Column({
    allowNull: false,
    field: 'desc',
    type: DataType.STRING
  })
  desc!: string;

  @Column({
    allowNull: false,
    field: 'price',
    type: DataType.INTEGER
  })
  price!: number;

  @Column({
    allowNull: false,
    field: 'jumlah',
    type: DataType.INTEGER
  })
  jumlah!: number;

  @Column({
    allowNull: false,
    field: 'isDelete',
    comment: '0 = not delete | 1 = soft delete',
    type: DataType.INTEGER
  })
  isDelete!: number;

  @HasMany(() => Cart, 'productID')
  carts!: Cart[];

  @HasMany(() => Image, 'productID')
  images!: Image[];

  @BelongsToMany(() => Category, { through: 'product-categories' })
  categories!: Category[];
}

export default Product;