import { Request, Response } from "express";

export function logger(req: Request, res: Response, next: any){
    console.log('request...');
    next();
}
