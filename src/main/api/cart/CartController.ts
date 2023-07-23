import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import Cart from '../../model/entity/Cart';
import { CartControllerHandler } from './CartControllerHandler';
import checkBearerToken from '../../common/middleware/BearerToken';

const app = express.Router();

class CartController extends BaseController {

  private handler: CartControllerHandler = new CartControllerHandler();

  public routes = (): express.Router => {

    //api for get data Carrt
    app.get('/data-cart',checkBearerToken, async (request: Request, response: Response) => {
        try {
            const data = await this.handler.getData(); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    //api for get data cart per user
    app.get('/data-cart-user',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if(!request.body.userID)
            {
                return BaseResponse.error("Data invalid please check again", response);
            }
            const data = await this.handler.getDataPerUser(request.body.userID); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    //api for get detail data cart
    app.get('/data-cart/:cartID',checkBearerToken, async (request: Request, response: Response) => {
        try {
            const data = await this.handler.getDataDetail(parseInt(request.params.cartID)); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    //api for create new cart
    app.post('/post-cart',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.productID || !request.body.userID || !request.body.jumlah) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
            console.log(request.body.jumlah)

            const data = await this.handler.createNewCart(
                request.body.productID,
                request.body.userID,
                request.body.jumlah
            );
    
            return BaseResponse.ok(data,"Berhasil",response)
        } catch (error: any) {
            return BaseResponse.error(`${error.message}`, response);
        }
    });

    // api for update data cart
    app.put('/update-cart',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.jumlah ) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            const data = await this.handler.updateCart(
                request.body.id,
                request.body.jumlah,
            );         
    
            return response.status(200).json({
                "data": data,
                "message": "Berhasil"
            });
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    // api for delete cart delete
    app.delete('/delete-cart',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.id) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            const data = await this.handler.deleteCart(
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

export default new CartController().routes();
