import { inject } from 'inversify';
import { TYPES } from '../../common/types';
import { IConfigService } from '../../config/ConfigServiceInterface';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { UploadImageDTO } from './dto/UploadImageDto';

export class FileManagerService {
 private s3Client;
 private secretKey: string;
 private bucketName: string;
 private bucketRegion: string;
 private accessKey: string;

 constructor(
  @inject(TYPES.ConfigService) private readonly configService: IConfigService
 ) {
  this.secretKey = this.configService.get('SECRET_KEY');
  this.bucketName = this.configService.get('BUCKET_NAME');
  this.bucketRegion = this.configService.get('BUCKET_REGION');
  this.accessKey = this.configService.get('ACCESS_KEY');

  this.s3Client = new S3Client({
   credentials: {
    accessKeyId: this.accessKey,
    secretAccessKey: this.secretKey,
   },
   region: this.bucketRegion,
  });
 }

 async getImages() {
  console.log('Getting images');
 }

 async uploadImage(body: UploadImageDTO): Promise<any> {
  const param = {
   Bucket: this.bucketName,
   Key: body.originalName,
   Body: body.buffer,
   ContentType: body.mimeType,
  };
  const command = new PutObjectCommand(param);
  await this.s3Client.send(command);
  return 'ok';
 }
}
