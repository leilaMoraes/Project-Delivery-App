import { NextFunction, Response } from 'express';
import IReq from '../interfaces/req.interface';
import StatusCodes from '../utils/statusCode';

export default class validateRoleMiddleware {
  static validateAdmin = async (req: IReq, _res: Response, next: NextFunction) => {
    if (req.user?.role !== 'administrator') {
      return next({ message: "You don't have authorization for enter this page", status: StatusCodes.UNAUTHORIZED });
    }
    return next();
  };

  static validateSeller = async (req: IReq, _res: Response, next: NextFunction) => {
    if (req.user?.role !== 'seller') {
      return next({ message: "You don't have authorization for enter this page", status: StatusCodes.UNAUTHORIZED });
    }
    return next();
  }

  static validateCustomer = async (req: IReq, _res: Response, next: NextFunction) => {
    if (req.user?.role !== 'customer') {
      return next({ message: "You don't have authorization for enter this page", status: StatusCodes.UNAUTHORIZED });
    }
    return next();
  }
}
