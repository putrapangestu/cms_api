import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import Cart from '../../model/entity/Cart';
import { PembelianControllerHandler } from './PembelianControllerHandle';
import checkBearerToken from '../../common/middleware/BearerToken';

const app = express.Router();

class PembelianController extends BaseController {

  private handler: PembelianControllerHandler = new PembelianControllerHandler();

  public routes = (): express.Router => {

    //api for get data pembelian
    app.get('/data-pembelian',checkBearerToken, async (request: Request, response: Response) => {
        try {
            const data = await this.handler.getData(); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    //api for get data pembelian per user
    app.get('/data-pembelian-user',checkBearerToken, async (request: Request, response: Response) => {
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

    //api for get detail data pembelian
    app.get('/data-pembelian/:pembelianID',checkBearerToken, async (request: Request, response: Response) => {
        try {
            const data = await this.handler.getDataDetail(parseInt(request.params.pembelianID)); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    //api for create new pembelian
    app.post('/post-pembelian',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.productID || !request.body.userID || !request.body.jumlah || !request.body.jenis || !request.body.harga) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
            console.log(request.body.jumlah)

            const data = await this.handler.createNewPembelian(
                request.body.productID,
                request.body.userID,
                request.body.jenis,
                request.body.harga,
                request.body.jumlah,
            );
    
            return BaseResponse.ok(data,"Berhasil",response)
        } catch (error: any) {
            return BaseResponse.error(`${error.message}`, response);
        }
    });

    // api for delete pembelian delete
    app.delete('/delete-pembelian',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.id) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            const data = await this.handler.deletePembelian(
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

export default new PembelianController().routes();
