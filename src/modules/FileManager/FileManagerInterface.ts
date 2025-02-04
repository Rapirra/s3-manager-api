import { Request, Response } from 'express';

export interface IFileManager {
 getFiles: (req: Request, res: Response) => void;
 uploadFile: (req: Request, res: Response) => void;
}
