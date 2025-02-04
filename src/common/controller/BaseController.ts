import { Response, Router } from 'express';
import { IRouteController } from './RouteControllerInterface';

export abstract class BaseController {
 private readonly _router: Router;

 constructor() {
  this._router = Router();
 }

 get router() {
  return this._router;
 }

 public send<T>(res: Response, code: number, message: T) {
  res.type('application/json');
  return res.status(code).json(message);
 }

 public ok<T>(res: Response, message: T) {
  return this.send<T>(res, 200, message);
 }

 public created<T>(res: Response, message: T) {
  return this.send<T>(res, 201, message);
 }

 protected bindRoutes(routes: IRouteController[]) {
  for (const route of routes) {
   const middleware = route.middlewares?.map((m) => m.execute.bind(m));
   const handler = route.func.bind(this);
   const pipeline = middleware ? [...middleware, handler] : handler;
   this.router[route.method](route.path, pipeline);
  }
 }
}
