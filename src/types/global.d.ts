// src/types/global.d.ts
import { Request, Response } from 'express';

declare global {
  type Controller = (req: Request, res: Response) => Promise<Response>;
}

export {};