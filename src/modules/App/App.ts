import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../common/types';
import { IConfigService } from '../../config/ConfigServiceInterface';
import { FileManagerController } from '../FileManager/FileManagerController';


@injectable()
export class App {
 server: Server;
 private app: Express;
 private port: number;

 constructor(
  @inject(TYPES.FileManagerController) private fileManagerController: FileManagerController,
  @inject(TYPES.ConfigService) private configService: IConfigService,
 ) {
  this.app = express();
  this.port = 8000;

 }


 useRoutes(): void {
  this.app.use('/file', this.fileManagerController.router);
 }

 public async init() {
  this.useRoutes();
  this.app.use(express.json());
  this.app.use(express.urlencoded({ extended: true }));
  this.server = this.app.listen(this.port);
  console.log(`Server listening on port ${this.port}`);
 }
}
