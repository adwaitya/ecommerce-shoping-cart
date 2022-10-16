import { Router } from "express";
import OrderController from "../controllers/order.controller";
import { IsUserAuthenticated, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth.middleware";

/**
 * @export
 * @class OrderRouter
 */
 class OrderRouter {
    public router: Router;
  
      /**
       * Creates an instance of AuthRouter.
       * @memberof OrderRouter
       */
    constructor() {
      this.router = Router();
      this.routes();
    }
  
      /**
       * @memberof OrderRouter
       */
    public routes(): void {
  
        this.router.get('/',verifyTokenAndAdmin , OrderController.findAll.bind(OrderController));
        this.router.get('/:id',verifyTokenAndAuthorization,  OrderController.find.bind(OrderController));
        this.router.post('/',IsUserAuthenticated,  OrderController.create.bind(OrderController));
        this.router.put('/:id',verifyTokenAndAuthorization,  OrderController.update.bind(OrderController));
        this.router.delete('/:id', verifyTokenAndAuthorization, OrderController.delete.bind(OrderController));
    }
  }
  
  export default new OrderRouter();
  