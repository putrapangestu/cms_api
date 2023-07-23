import { Column, Default, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import Cart from './Cart';
import Image from './Image';

/**
 * ProductInterface
 */
export interface CategoryInterface {
  id?: number | null;
  name: string;
}

@Table({
  tableName: 'categories',
  timestamps: true,
  underscored: true
})
class Category extends Model implements CategoryInterface {

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


//   @BelongsToMany(() => categoriesCategory, 'categoriesID')
//   categoriesCategories!: categoriesCategory[];

}

export default Category;