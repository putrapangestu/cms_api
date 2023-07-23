import express, {NextFunction, Request, Response} from 'express';

import { BaseResponse } from "../../model/dto/BaseResponse";

function checkBearerToken(request: Request, response: Response, next: NextFunction) {
    const bearerHeader = request.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      // Get the token from the cookies
      const cookieToken = request.cookies.jwt_token;
  
      // Check if the tokens match
      if (bearerToken === cookieToken) {
        // Token is valid
        return next();
      } else {
        return BaseResponse.error("Invalid token", response);
      }
    } else {
      return BaseResponse.error("Unauthorized", response);
    }
  }

  export default checkBearerToken;