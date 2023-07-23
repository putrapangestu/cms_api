import { Column, Default, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import Cart from './Cart';
import Image from './Image';

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


//   @BelongsToMany(() => categoriesProductCategory, 'categoriesID')
//   categoriesCategories!: categoriesProductCategory[];

}

export default ProductCategory;