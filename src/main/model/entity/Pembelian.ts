import { Column, Model, Table, DataType ,BelongsTo } from 'sequelize-typescript';
import Product from './Product'; // Import the Product model
import User from './User'; // Import the User model

export interface PembelianInterface {
    id?: number | null;
    userID: number;
    productID: number;
    jumlah: number;
    status: string;
  }

@Table({
  tableName: 'pembelians',
  timestamps: true,
  underscored: true
})

class Pembelian extends Model implements PembelianInterface {
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

      @Column({
        allowNull: false,
        field: 'status',
        type: DataType.STRING
      })
      status!: string;

    // Define the many-to-one association with Product model
    @BelongsTo(() => Product, 'productID')
    products!: Product;

    // Define the many-to-one association with User model
    @BelongsTo(() => User, 'userID')
    users!: User;
}

export default Pembelian;