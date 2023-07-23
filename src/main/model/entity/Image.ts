import { Column, Model, Table, DataType ,BelongsTo } from 'sequelize-typescript';
import User from './User'; // Import the User model

export interface ImageInterface {
    id?: number | null;
    productID: number;
    image: Blob;
    path: string;
    type: string;
  }

@Table({
  tableName: 'images',
  timestamps: true,
  underscored: true
})
class Image extends Model implements ImageInterface {
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
        field: 'image',
        type: DataType.BLOB
      })
      image!: Blob;

      @Column({
        allowNull: false,
        field: 'path',
        type: DataType.STRING
      })
      path!: string;

      @Column({
        allowNull: false,
        field: 'type',
        type: DataType.STRING
      })
      type!: string;
}

export default Image;