import { IMiddleware } from './MiddlewareInterface';
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export class MulterMiddleware implements IMiddleware {
 execute(req: Request, res: Response, next: NextFunction): void {
  upload.single('file')(req, res, (err: any) => {
   if (err) {
    return res.status(400).json({ error: err.message });
   }
   next();
  });
 }
}
