import Category from "../../model/entity/Category";
import Product from "../../model/entity/Product";
import Cart from "../../model/entity/Cart";
import Pembelian from "../../model/entity/Pembelian";
import User from "../../model/entity/User";
import Pembayaran from "../../model/entity/Pembayaran";

export class PembelianControllerHandler {
  // Handler for GET data
  public getData = async (): Promise<Pembelian[]> => {
    try {
      const data = await Pembelian.findAll({
        // include: [
        //   {
        //     model: Category,
        //     as: 'Categorys'
        //   },
        //   // Add other associations here if needed
        // ]
      });
      return data;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  public getDataDetail = async (
    pembelianID: number,
  ): Promise<Pembelian|null> => {
    try {
      const data = await Pembelian.findOne({
        where: {
          id: pembelianID
        },
        // include: [
        //   {
        //     model: Image,
        //     as: 'images'
        //   },
        //   // Add other associations here if needed
        // ]
      });
      return data;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  public getDataPerUser = async (userID: number): Promise<Pembelian[]> => {
    try {
      const data = await Pembelian.findAll({
        where:{
            userID: userID
        }
        // include: [
        //   {
        //     model: Category,
        //     as: 'Categorys'
        //   },
        //   // Add other associations here if needed
        // ]
      });
      return data;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }


  // Handler for POST data
  public createNewPembelian = async (
    productID: number,
    userID: number,
    jenis: string,
    harga: number,
    jumlah: number,
  ): Promise<Pembelian> => {
    try {
        let dataProduct = await Product.findOne({
            where: {
                id: productID
            }
        })

        if(dataProduct)
        {
            if(jumlah > dataProduct!.jumlah){
                throw new Error("Pengambilan melebihi batas")
            }
        }

        const newPembelian = await Pembelian.create({
            productID,
            userID,
            jumlah,
            status: "purchase"
        });

        const newPembayaran = await Pembayaran.create({
            pembelianID: newPembelian.id,
            jenis,
            harga
        })

      return newPembelian;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  //handler for delete data
  public deletePembelian = async (pembelianID: number): Promise<void> => {
    try {
      const PembelianToDelete = await Pembelian.findOne({
        where: {
          id: pembelianID
        }
      });

      const PembayaranToDelete = await Pembayaran.findOne({
        where: {
            pembelianID: pembelianID
        }
      })

      if (!PembelianToDelete  || !PembelianToDelete) {
        throw new Error(`Image with ID ${Pembelian} not found`);
      }
      
      await PembayaranToDelete!.destroy();
      await PembelianToDelete.destroy();

    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
