import { Column, Default, Model, Table, DataType, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import Cart from './Cart';
import Image from './Image';
import Product from './Product';
import Category from './Category';

/**
 * ProductInterface
 */
export interface ProductCategoryInterface {
  id?: number | null;
  productID: number;
  categoryID: number;
}

@Table({
  tableName: 'product-categories',
  timestamps: true,
  underscored: true
})
class ProductCategory extends Model implements ProductCategoryInterface {

  @Column({
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataType.BIGINT
  })
  id?: number | null;

  @Column({
    allowNull: false,
    field: 'productID',
    type: DataType.INTEGER
  })
  productID!: number;
  
  @Column({
    allowNull: false,
    field: 'categoryID',
    type: DataType.INTEGER
  })
  categoryID!: number;

  // Define the many-to-one association with Product model
  @BelongsTo(() => Product, 'productID')
  products!: Product;

  // Define the many-to-one association with User model
  @BelongsTo(() => Category, 'categoryID')
  categories!: Category;

}

export default ProductCategory;