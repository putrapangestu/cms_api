import { BaseResponse } from "../../model/dto/BaseResponse";
import Category from "../../model/entity/Category";
import Image from "../../model/entity/Image";
import Product from "../../model/entity/Product";
import ProductCategory from "../../model/entity/ProductCategory";

export class ProductControllerHandler {
  // Handler for GET data
  public getData = async (): Promise<Product[]> => {
    try {
      const data = await Product.findAll({
        where: {
          isDelete: 0
        },
        // include: [
        //   { model: Image }   
        // ]
      });
      return data;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  public getDataDetail = async (
    productID: number,
  ): Promise<Product|null> => {
    try {
      const data = await Product.findOne({
        where: {
          isDelete: 0,
          id: productID
        },
        // include: {
        //   model: Image
        // }
      });
      return data;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  public getDataDelete = async (): Promise<Product[]> => {
    try {
      const data = await Product.findAll({
        where: {
          isDelete: 1
        },
        include: {
          model: Image
        }
      });
      return data;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  // Handler for POST data
  public createNewProduct = async (
    name: string,
    desc: string,
    price: number,
    jumlah: number,
    isDelete: number
  ): Promise<Product> => {
    try {
      // Perform any necessary validation or data manipulation before creating the product
      const newProduct = await Product.create({
        name,
        desc,
        price,
        jumlah,
        isDelete
      });

      // You can perform additional logic here if needed

      return newProduct; // Return the created product's name as an example
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  //handle for add category in product
  public addCategory = async (
    productID: number,
    categoryID: number,
  ): Promise<ProductCategory> => {
    try {
        const checkData = await ProductCategory.findOne({
            where: {
                productID: productID,
                categoryID: categoryID
            }
        })

        if(checkData)
        {
            throw new Error("Data sudah ada");
        }
        

        const categoryIn = await ProductCategory.create({
            productID, 
            categoryID
        })

        return categoryIn;
    } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
    }
  }

  // Handler for PUT data
  public updateProduct = async (
    productID: number,
    name: string,
    desc: string,
    price: number,
    jumlah: number
  ): Promise<Product | null> => {
    try {
      const productToUpdate = await Product.findOne({
        where: {
          id: productID
        }
      });

      if (!productToUpdate) {
        throw new Error(`Product with ID ${productID} not found`);
      }

      // Perform any necessary validation or data manipulation before updating the product
      await productToUpdate.update({
        name,
        desc,
        price,
        jumlah
      });

      // You can perform additional logic here if needed

      return productToUpdate;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  // Handler for soft DELETE data
  public sofDeleteProduct = async (productID: number): Promise<void> => {
    try {
      const productToDelete = await Product.findOne({
        where: {
          id: productID
        }
      });

      if (!productToDelete) {
        throw new Error(`Product with ID ${productID} not found`);
      }

      let change = (productToDelete.isDelete === 0) ? 1 : 0;
      
      await productToDelete.update({
        isDelete: change
      });

    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  //handler for delete data
  public deleteProduct = async (productID: number): Promise<void> => {
    try {
      const productToDelete = await Product.findOne({
        where: {
          id: productID
        }
      });

      if (!productToDelete) {
        throw new Error(`Product with ID ${productID} not found`);
      }

      await productToDelete.destroy();

    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
