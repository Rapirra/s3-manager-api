import { Request, Response } from 'express';
import { IFileManager } from './FileManagerInterface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../common/types';
import { FileManagerService } from './FileManagerService';
import { UploadImageDTO } from './dto/UploadImageDto';
import { MulterMiddleware } from '../../common/middleware/MulterMiddleware';
import { BaseController } from '../../common/controller/BaseController';

@injectable()
export class FileManagerController
 extends BaseController
 implements IFileManager
{
 constructor(
  @inject(TYPES.FileManagerService)
  private readonly fileManagerService: FileManagerService
 ) {
  super();
  this.bindRoutes([
   {
    path: '/upload',
    method: 'post',
    middlewares: [new MulterMiddleware()],
    func: this.uploadFile,
   },
   {
    path: '/list',
    method: 'get',
    func: this.getFiles,
   },
  ]);
 }

 async uploadFile(req: Request, res: Response) {
  if (!req.file) {
   return this.send(res, 400, { msg: 'Error uploading file' });
  }

  const body: UploadImageDTO = {
   originalName: req.file.originalname,
   buffer: req.file.buffer,
   mimeType: req.file.mimetype,
  };

  const response = await this.fileManagerService.uploadImage(body);
  return this.ok(res, { key: response });
 }

 getFiles(req: Request) {
  return this.fileManagerService.getImages();
 }
}
