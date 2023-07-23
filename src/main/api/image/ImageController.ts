import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import { ImageControllerHandler } from './ImageControllerHandler';
import checkBearerToken from '../../common/middleware/BearerToken';
import multer from 'multer';

const app = express.Router();
const upload = multer();

class ImageController extends BaseController {

  private handler: ImageControllerHandler = new ImageControllerHandler();

  public routes = (): express.Router => {

    //api for get data image
    app.get('/data-image',checkBearerToken, async (request: Request, response: Response) => {
        try {
            const data = await this.handler.getData(); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    //api for create new image
    app.post('/post-image',upload.single('image'),checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.image || !request.body.productID) {
                return BaseResponse.error("Data invalid, please check again", response);
            }

            const data = await this.handler.createNewImage(
                request.body.productID,
                request.file!.buffer,
                request.file!.mimetype,
                request.file!.originalname,
            );
    
            return response.status(200).json({
                "data": data,
                "message": "Berhasil"
            });
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    // api for update data image
    app.put('/update-image',upload.single('image'),checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.image ) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            const data = await this.handler.updateImage(
                request.body.id,
                request.file!.buffer,
                request.file!.mimetype,
                request.file!.originalname,
            );         
    
            return response.status(200).json({
                "data": data,
                "message": "Berhasil"
            });
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    // api for delete image delete
    app.delete('/delete-image',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.id) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            const data = await this.handler.deleteImage(
                request.body.id,
            );         
    
            return response.status(200).json({
                "message": "Berhasil Menghapus"
            });
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
      });

    return app;
  }

}

export default new ImageController().routes();
