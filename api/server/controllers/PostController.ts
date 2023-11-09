//const prisma = require()
import  prisma  from "../config/prisma.js"

import { Request, Response } from 'express';

class PostController {
    read(req:Request,res:Response){}
    readAll(req:Request,res:Response){}
    create(req:Request,res:Response){}
    update(req:Request,res:Response){}
    delete(req:Request,res:Response){}
}
export default new PostController();