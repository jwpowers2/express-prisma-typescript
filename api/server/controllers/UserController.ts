//const prisma = require("../config/prisma")
import { builtinModules } from "module";
import  prisma  from "../config/prisma.js"
import schema from "./UserSchema.js";
import { Request, Response } from 'express';

type User = {
    id: Number;
    email: String;
    name: String;
    posts: Post[];
    profile: Profile;
    role: Role;
}

type Post = {
    id: Number;
    title: String;
    content: String;
    published: Boolean;
    author: User;
    authorId: Number;
    categories: Category[];
}

type Profile = {
    id: Number;
    bio: String;
    user: User;
    userId: Number;
}

type Category = {
    id: Number;
    name: String;
    posts: Post[];
}

enum Role {
    USER,
    ADMIN
}

class UserController {
    async read(req:Request,res:Response):Promise<any>{
        const userId = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        })
        res.json({user})
 
    }
    async readAll(req:Request,res:Response):Promise<any>{
        const allUsers = await prisma.user.findMany({
            include: {
              posts: true,
              profile: true,
            },
          })
          res.json(allUsers)
    }
    async create(req:Request,res:Response):Promise<any> {
      const validation = schema.safeParse(req.body);
      if (!validation.success) res.json(validation.error.errors);
        const user = await prisma.user.create({
            data: {
              name: 'Bob',
              email: 'bob@prisma.io',
              posts: {
                create: { title: 'Hello World' },
              },
              profile: {
                create: { bio: 'I like turtles' },
              },
            },
          })
          res.json({user})
    }
    update(req:Request,res:Response){}
    async delete(req:Request,res:Response){
        const userId = req.params.id;
        const deleteResult = await prisma.user.delete({
          where: {
            id: parseInt(userId)
          }
        })
        res.json(deleteResult)
    }
}
export default new UserController();