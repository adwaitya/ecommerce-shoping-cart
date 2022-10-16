import { Router } from "express";
import CartController from "../controllers/cart.controller";
import { IsUserAuthenticated, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/auth.middleware";

/**
 * @export
 * @class ProductRouter
 */
 class ProductRouter {
    public router: Router;
  
      /**
       * Creates an instance of AuthRouter.
       * @memberof ProductRouter
       */
    constructor() {
      this.router = Router();
      this.routes();
    }
  
      /**
       * @memberof ProductRouter
       */
    public routes(): void {
  
        this.router.get('/',verifyTokenAndAdmin , CartController.findAll.bind(CartController));
        this.router.get('/:id',verifyTokenAndAuthorization,  CartController.find.bind(CartController));
        this.router.post('/',IsUserAuthenticated,  CartController.create.bind(CartController));
        this.router.put('/:id',verifyTokenAndAuthorization,  CartController.update.bind(CartController));
        this.router.delete('/:id', verifyTokenAndAuthorization, CartController.delete.bind(CartController));
    }
  }
  
  export default new ProductRouter();
  