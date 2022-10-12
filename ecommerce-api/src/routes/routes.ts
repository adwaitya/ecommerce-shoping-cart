import express from "express";
import { IServer } from "../interfaces/ServerInterface";
import AuthRouter from "./auth.route";
import UserRouter from "./user.route";
import ProductRouter from "./produc.route";

class Routes {
    /**
     * @static
     * @param {IServer} server
     * @memberof Routes
     */
    static init(server: IServer): void {
        const router: express.Router = express.Router();
        // Auth Router
        server.app.use('/v1/auth', AuthRouter.router);
        // users
        server.app.use('/v1/api/users', UserRouter.router);
        // products
        server.app.use('/v1/api/products', ProductRouter.router);
        // index
        server.app.use('/', (req, res) => {
            res.send('node rest api');
        });
        server.app.use(router);
    }
    
}

export default Routes;