import { IConfigService } from './ConfigServiceInterface';
import { config, DotenvConfigOutput } from 'dotenv';

export class ConfigService implements IConfigService {
 private config: DotenvConfigOutput;
 constructor() {
  const result:DotenvConfigOutput = config()
  if (result.error){
   console.error(result.error)
  } else {
   this.config = result.parsed;
  }
 }

 get<T extends string>(key: string) {
   return this.config[key] as T
 }
}
