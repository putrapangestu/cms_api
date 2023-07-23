import Image from "../../model/entity/Image";

export class ImageControllerHandler {
  // Handler for GET data
  public getData = async (): Promise<Image[]> => {
    try {
      const data = await Image.findAll({
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

  // Handler for POST data
  public createNewImage = async (
    productID: number,
    image: Blob,
    path: string,
    type: string
  ): Promise<Image> => {
    try {
      // Perform any necessary validation or data manipulation before creating the Image
      const newImage = await Image.create({
        productID,
        image,
        path,
        type
      });

      // You can perform additional logic here if needed

      return newImage; // Return the created Image's name as an example
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  // Handler for PUT data
  public updateImage = async (
    imageID: number,
    image: string,
  ): Promise<Image | null> => {
    try {
      const ImageToUpdate = await Image.findOne({
        where: {
          id: imageID
        }
      });

      if (!ImageToUpdate) {
        throw new Error(`Image with ID ${imageID} not found`);
      }

      // Perform any necessary validation or data manipulation before updating the Image
      await ImageToUpdate.update({
       image,
      });

      // You can perform additional logic here if needed

      return ImageToUpdate;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  //handler for delete data
  public deleteImage = async (imageID: number): Promise<void> => {
    try {
      const ImageToDelete = await Image.findOne({
        where: {
          id: imageID
        }
      });

      if (!ImageToDelete) {
        throw new Error(`Image with ID ${imageID} not found`);
      }

      await ImageToDelete.destroy();

    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
  }
}
