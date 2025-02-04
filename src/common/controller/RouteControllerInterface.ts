import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from '../middleware/MiddlewareInterface';

export interface IRouteController {
 path: string;
 func: (req: Request, res: Response, next: NextFunction) => void;
 middlewares?: IMiddleware[];
 method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
}
