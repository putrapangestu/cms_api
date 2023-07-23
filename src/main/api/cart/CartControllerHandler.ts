import Category from "../../model/entity/Category";
import Product from "../../model/entity/Product";
import Cart from "../../model/entity/Cart";

export class CartControllerHandler {
  // Handler for GET data
  public getData = async (): Promise<Cart[]> => {
    try {
      const data = await Cart.findAll({
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
    cartID: number,
  ): Promise<Cart|null> => {
    try {
      const data = await Cart.findOne({
        where: {
          id: cartID
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

  public getDataPerUser = async (userID: number): Promise<Cart[]> => {
    try {
      const data = await Cart.findAll({
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
  public createNewCart = async (
    productID: number,
    userID: number,
    jumlah: number
  ): Promise<Cart> => {
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

        const newCart = await Cart.create({
            productID,
            userID,
            jumlah
        });

      return newCart;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  // Handler for PUT data
  public updateCart = async (
    cartID: number,
    jumlah: number,
  ): Promise<Cart | null> => {
    try {
      const CartToUpdate = await Cart.findOne({
        where: {
          id: cartID
        }
      });

      if (!CartToUpdate) {
        throw new Error(`Image with ID ${cartID} not found`);
      }

        let dataProduct = await Product.findOne({
            where: {
                id: CartToUpdate.productID
            }
        })

        if(jumlah > dataProduct!.jumlah){
            throw new Error("Pengambilan melebihi batas")
        }


      // Perform any necessary validation or data manipulation before updating the Image
      await CartToUpdate.update({
        jumlah,
      });

      // You can perform additional logic here if needed

      return CartToUpdate;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  //handler for delete data
  public deleteCart = async (cartID: number): Promise<void> => {
    try {
      const CartToDelete = await Cart.findOne({
        where: {
          id: cartID
        }
      });

      if (!CartToDelete) {
        throw new Error(`Image with ID ${cartID} not found`);
      }

      await CartToDelete.destroy();

    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
