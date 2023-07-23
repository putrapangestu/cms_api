import {BaseController} from '../BaseController';
import express, {NextFunction, Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import {ProductControllerHandler} from "./ProductControllerHandler";
import {CreateCustomerResponseDTO} from '../../model/dto/response/customer/CreateCustomerResponseDTO';
import checkBearerToken from '../../common/middleware/BearerToken';

const app = express.Router();

class ProductController extends BaseController {

  private handler: ProductControllerHandler = new ProductControllerHandler();

  
  public routes = (): express.Router => {
    //api for get data product
    app.get('/data-product', checkBearerToken, async (request: Request, response: Response) => {
        try {
            const data = await this.handler.getData(); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`${error.message}`, response);
        }
    });

    //api for get data detail from product
    app.get('/data-product/:productID',checkBearerToken, async (request: Request, response: Response) => {
        try {
            response.setHeader('Content-Type', 'application/json');
            const data = await this.handler.getDataDetail(parseInt(request.params.productID)); 
            response.json(data);    
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });
    
    //api for get data product delete
    app.get('/data-product-delete',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if(request.cookies.user.role == "admin")
            {
                const data = await this.handler.getDataDelete(); 
                response.json(data);    
            } else {
                return BaseResponse.error("unauthorized", response);
            }
        } catch (error : any) {
          return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });


    //api for create new product
    app.post('/post-product',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.name || !request.body.desc || !request.body.price || !request.body.jumlah) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            if(request.cookies.user.role == "admin")
            {
                const data = await this.handler.createNewProduct(
                    request.body.name,
                    request.body.desc,
                    request.body.price,
                    request.body.jumlah,
                    0
                );
        
                return response.status(200).json({
                    "data": data,
                    "message": "Berhasil"
                });
            } else {
                return BaseResponse.error("unauthorized", response);
            }
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    app.post('/add-product-category',checkBearerToken,async (request:Request, response: Response) => {
        try {
            if (!request.body.productID || !request.body.categoryID) {
                return BaseResponse.error("Data invalid, please check again", response);
            }

            if(request.cookies.user.role == "admin")
            {
                const data = await this.handler.addCategory(
                    request.body.productID,
                    request.body.categoryID
                )
    
                return response.status(200).json({
                    message: "Berhasil menambahkan category",
                    data: data
                })
            } else {
                return BaseResponse.error("unauthorized", response);
            }
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
    })

    // api for update data product
    app.put('/update-product',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.name || !request.body.desc || !request.body.price || !request.body.jumlah) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            if(request.cookies.user.role == "admin")
            {
                const data = await this.handler.updateProduct(
                    request.body.id,
                    request.body.name,
                    request.body.desc,
                    request.body.price,
                    request.body.jumlah
                );         
        
                return response.status(200).json({
                    "data": data,
                    "message": "Berhasil"
                });
            } else {
                return BaseResponse.error("unauthorized", response);
            }
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
    });

    //api for delete soft product
    app.put('/delete-soft-product', checkBearerToken,async (request: Request, response: Response) => {
        try {
            if (!request.body.id) {
                return BaseResponse.error("Data invalid, please check again", response);
            }

            if(request.cookies.user.role == "admin")
            {
                const data = await this.handler.sofDeleteProduct(
                    request.body.id,
                );         
        
                return response.status(200).json({
                    "message": "Berhasil Menghapus"
                });
            } else {
                return BaseResponse.error("unauthorized", response);
            }
    
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
      });

    // api for delete product delete
    app.delete('/delete-product',checkBearerToken, async (request: Request, response: Response) => {
        try {
            if (!request.body.id) {
                return BaseResponse.error("Data invalid, please check again", response);
            }
    
            if(request.cookies.user.role == "admin")
            {
                const data = await this.handler.deleteProduct(
                    request.body.id,
                );         
        
                return response.status(200).json({
                    "message": "Berhasil Menghapus"
                });
            } else {
                return BaseResponse.error("unauthorized", response);
            }
        } catch (error: any) {
            return BaseResponse.error(`Error: ${error.message}`, response);
        }
      });

    return app;
  }

}

export default new ProductController().routes();
