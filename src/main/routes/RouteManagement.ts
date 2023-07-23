import {BaseResponse} from '../model/dto/BaseResponse';
import express from 'express';
import cookieParser from 'cookie-parser';
/*
|--------------------------------------------------------------------------
| Import Controllers
|--------------------------------------------------------------------------
|
| Here is where you can register controller that you've already exported
| in ./api/controller/ControllerFile
| Do as you like, but for me it's easier to format the imported variable
| with PascalCase.
|
*/
import ExampleController from "../api/example/ExampleController";
import UserController from "../api/user/UserController";
import CustomerController from '../api/customer/CustomerController';
import CartController from '../api/cart/CartController';
import CategoryController from '../api/category/CategoryController';
import ImageController from '../api/image/ImageController';
import PembelianController from '../api/pembelian/PembelianController';
import ProductController from '../api/product/ProductController';
/**
 * API root point. Just to make sure the API is okay.
 */
import config from '../config/Config';
import Auth from '../common/middleware/Authenticate';
import Guest from '../common/middleware/Guest';

const route = express.Router();

// Register your BaseController in here
route.use(cookieParser());

route.use(ExampleController);
route.use(UserController);

route.use(CustomerController);
route.use(CartController);
route.use(CategoryController);
route.use(ImageController);
route.use(PembelianController);
route.use(ProductController);

route.get('/', (req, res) => {
   const date = new Date();  
   
   const data = {
     "app": config.server.app,
     "app_time_zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
     "time": date.toLocaleString()
   };
 
   return BaseResponse.ok(
     data,
     "This service is running",
     res
   );
 });
 

/**
 * Always put this on the bottom of routes file
 */
export default route;
