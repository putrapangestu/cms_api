import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import { CategoryControllerHandler } from './CategoryControllerHandler';
import checkBearerToken from '../../common/middleware/BearerToken';

const app = express.Router();

class CategoryController extends BaseController {

  private handler: CategoryControllerHandler = new CategoryControllerHandler();

  public routes = (): express.Router => {

    //api for get data category
    app.get('/data-category',checkBearerToken, async (request: Request, response: Response) => {
        try {
            const data = await this.handler.getData(); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    //api for create new category
    app.post('/post-category',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.name) {
                return BaseResponse.error("Data invalid, please check again", response);
            }

            const data = await this.handler.createNewCategory(
                request.body.name
            );
    
            return response.status(200).json({
                "data": data,
                "message": "Berhasil"
            });
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    // api for update data category
    app.put('/update-category',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.name ) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            const data = await this.handler.updateCategory(
                request.body.id,
                request.body.name,
            );         
    
            return response.status(200).json({
                "data": data,
                "message": "Berhasil"
            });
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    // api for delete category delete
    app.delete('/delete-category',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.id) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            const data = await this.handler.deleteCategory(
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

export default new CategoryController().routes();
