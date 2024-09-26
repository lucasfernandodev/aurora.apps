import fs from 'node:fs';
import type { Request, Response } from "express";

export const errorNotFoundMiddleware = async (req: Request, res: Response) => {
  fs.readFile('public/404.html', (error2, data) => {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end(data);
  });
}