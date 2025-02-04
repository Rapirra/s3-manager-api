export interface IFileManagerService {
 uploadImage(body: UploadImageDTO): Promise<string>;
}

export interface UploadImageDTO {
 originalName: string;
 buffer: Buffer;
 mimeType: string;
}
