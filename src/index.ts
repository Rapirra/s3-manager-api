import { App } from './modules/App/App';
import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './common/types';
import { IConfigService } from './config/ConfigServiceInterface';
import { ConfigService } from './config/ConfigService';
import { FileManagerService } from './modules/FileManager/FileManagerService';
import { FileManagerController } from './modules/FileManager/FileManagerController';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
 bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
 bind(TYPES.FileManagerService).to(FileManagerService);
 bind(TYPES.FileManagerController).to(FileManagerController);
 bind<App>(TYPES.Application).to(App);
});

async function main() {
 const appContainer = new Container();
 appContainer.load(appBindings);
 const app = appContainer.get<App>(TYPES.Application);
 await app.init();
 return { appContainer, app };
}

main();
