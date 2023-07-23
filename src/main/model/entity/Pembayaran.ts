import { Column, Model, Table, DataType ,BelongsTo } from 'sequelize-typescript';
import Product from './Product'; // Import the Product model
import User from './User'; // Import the User model
import Pembelian from './Pembelian';

export interface PembayaranInterface {
    pembelianID: number;
    jenis: string;
    harga: number;
  }

@Table({
  tableName: 'pembayarans',
  timestamps: true,
  underscored: true
})

class Pembayaran extends Model implements PembayaranInterface {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
        type: DataType.BIGINT
    })
    id?: number | null;
    

    @Column({
        allowNull: false,
        field: 'pembelianID',
        type: DataType.INTEGER
    })
    pembelianID!: number;

    @Column({
        allowNull: false,
        field: 'jenis',
        type: DataType.STRING
    })
    jenis!: string;

    @Column({
        allowNull: false,
        field: 'harga',
        type: DataType.INTEGER
    })
    harga!: number;

    // Define the many-to-one association with Product model
    @BelongsTo(() => Pembelian, 'pembelianID')
    pembelians!: Pembelian;

}

export default Pembayaran;