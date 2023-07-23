import { Column, Model, Table, DataType ,BelongsTo } from 'sequelize-typescript';
import Product from './Product'; // Import the Product model
import User from './User'; // Import the User model

export interface CartInterface {
    id?: number | null;
    userID: number;
    productID: number;
    jumlah: number;
  }

@Table({
  tableName: 'carts',
  timestamps: true,
  underscored: true
})

class Cart extends Model implements CartInterface {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
        type: DataType.BIGINT
    })
    id?: number | null;
    

    @Column({
        allowNull: false,
        field: 'userID',
        type: DataType.INTEGER
    })
    userID!: number;

    @Column({
        allowNull: false,
        field: 'productID',
        type: DataType.INTEGER
    })
    productID!: number;

      @Column({
        allowNull: false,
        field: 'jumlah',
        type: DataType.INTEGER
      })
      jumlah!: number;

    // Define the many-to-one association with Product model
    @BelongsTo(() => Product, 'productID')
    products!: Product;

    // Define the many-to-one association with User model
    @BelongsTo(() => User, 'userID')
    users!: User;
}

export default Cart;