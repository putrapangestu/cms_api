import Category from "../../model/entity/Category";
import Product from "../../model/entity/Product";
import ProductCategory from "../../model/entity/ProductCategory";

export class CategoryControllerHandler {
  // Handler for GET data
  public getData = async (): Promise<Category[]> => {
    try {
      const data = await Category.findAll({
        // include: {
        //   model: Product
        // }
      });
      return data;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  // Handler for POST data
  public createNewCategory = async (
    name: string
  ): Promise<Category> => {
    try {
      // Perform any necessary validation or data manipulation before creating the Image
      const newCategory = await Category.create({
        name
      });

      // You can perform additional logic here if needed

      return newCategory; // Return the created Image's name as an example
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  // Handler for PUT data
  public updateCategory = async (
    categoryID: number,
    name: string,
  ): Promise<Category | null> => {
    try {
      const CategoryToUpdate = await Category.findOne({
        where: {
          id: categoryID
        }
      });

      if (!CategoryToUpdate) {
        throw new Error(`Image with ID ${categoryID} not found`);
      }

      // Perform any necessary validation or data manipulation before updating the Image
      await CategoryToUpdate.update({
       name,
      });

      // You can perform additional logic here if needed

      return CategoryToUpdate;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  //handler for delete data
  public deleteCategory = async (categoryID: number): Promise<void> => {
    try {
      const CategoryToDelete = await Category.findOne({
        where: {
          id: categoryID
        }
      });

      if (!CategoryToDelete) {
        throw new Error(`Image with ID ${categoryID} not found`);
      }

      await CategoryToDelete.destroy();

    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
