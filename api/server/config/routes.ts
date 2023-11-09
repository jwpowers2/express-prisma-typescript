import  UserController  from '../controllers/UserController.js';
import PostController  from '../controllers/PostController.js';
import {Router} from 'express';


function routes(app:Router):Router {

    app.get("/api/users", UserController.readAll);
    app.get("/api/users/:id", UserController.read);
    app.post("/api/users", UserController.create);
    app.put("/api/users/:id", UserController.update);
    app.delete("/api/users/:id", UserController.delete);

    app.get("/api/post", PostController.readAll);
    app.get("/api/post/:id", PostController.read);
    app.post("/api/post", PostController.create);
    app.put("/api/post/:id", PostController.update);
    app.delete("/api/post/:id", PostController.delete);
    return app
}

export default routes;