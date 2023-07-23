import {BaseController} from '../BaseController';
import express, {Request, Response} from 'express';
import {BaseResponse} from '../../model/dto/BaseResponse';
import User from '../../model/entity/User';
import {UserHandler} from "./UserControllerHandler";
import Guest from '../../common/middleware/Guest';
import Auth from '../../common/middleware/Authenticate';
import checkBearerToken from '../../common/middleware/BearerToken';

const app = express.Router();

class UserController extends BaseController {

  private handler: UserHandler = new UserHandler();

  public routes = (): express.Router => {

    /**
     * @method POST
     * createUser
     *
     * This API will create a User data.
     */

    // app.post('/user', async (request: Request, response: Response) => {
    //   const newUser: User = await this.handler.createUserHandler(
    //     request.body.email,
    //     request.body.phone
    //   );

    //   return BaseResponse.ok(newUser, "User is successfully created!", response);
    // });

    /**
     * @method get
     * getUserById
     *
     * This API will return user data with destinated source of ID.
     */

    app.get('/user/:id', async (request: Request, response: Response) => {
      const id: number = parseInt((request.params.id).toString());

      const user: User = await this.handler.getUserByIdHandler(id);

      return BaseResponse.ok(user, "Succesfully returned user data", response);
    });

    app.post('/post-login', async (request: Request, response: Response) => {
      try {
        response.setHeader('Content-Type', 'application/json');

        if (!request.body.email || !request.body.password) {
          return BaseResponse.error("Data invalid, please check again", response);
        }
        const user = await this.handler.loginUser(
          request.body.email,
          request.body.password
        );
    
        // Set the JWT token as a cookie in the response
        response.cookie('jwt_token', user.token, {
          httpOnly: true,
          maxAge: 3600000, // 1 hour
        });
    
        return BaseResponse.ok(user, "Sukses login", response);
      } catch (error: any) {
        return BaseResponse.error(`${error.message}`, response);
      }
    });

    app.post('/post-register',async (request:Request, response:Response) => {
      try {
        response.setHeader('Content-Type', 'application/json');

        if (!request.body.email || !request.body.password || !request.body.phone || !request.body.name  ) {
          return BaseResponse.error("Data invalid, please check again", response);
        }

        const user = await this.handler.registerUser(
          request.body.name,
          request.body.email,
          request.body.phone,
          request.body.password,
        );
    
        response.status(200).json({
          message: "Akun berhasil dibuat",
          data: user,
        });
      } catch (error: any) {
        return BaseResponse.error(`${error.message}`,response)
      }
    })

    // app.use(Auth)

    app.post('/logout',checkBearerToken, async (request:Request, response:Response) => {
       try {
        response.clearCookie('jwt_token');
    
        response.status(200).json({
          message: 'Logout success',
        });
      } catch (error: any) {
        response.status(500).json({
          message: `Error: ${error.message}`,
        });
      }
    })

    return app;
  }

}

export default new UserController().routes();
