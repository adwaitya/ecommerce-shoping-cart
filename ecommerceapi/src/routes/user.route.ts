import { Router } from "express";
import UserController from "../controllers/user.controller";
import { IsUserAuthenticated } from "../middlewares/auth.middleware";
import Route from "../models/routes";

/**
 * @export
 * @class UserRouter
 */
 class UserRouter {
    public router: Router;
  
      /**
       * Creates an instance of UserRouter.
       * @memberof UserRouter
       */
    constructor() {
      this.router = Router();
      this.routes();
    }
  
      /**
       * @memberof UserRouter
       */
    public routes(): void {
  
      this.router.get('/', IsUserAuthenticated, UserController.findAll.bind(UserController));
      this.router.get('/:id', IsUserAuthenticated, UserController.find.bind(UserController));
      this.router.post('/', UserController.create.bind(UserController));
      this.router.delete('/:id', IsUserAuthenticated, UserController.delete.bind(UserController));
    }
  }
  
  export default new UserRouter();