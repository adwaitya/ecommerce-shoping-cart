import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { IsUserAuthenticated, verifyTokenAndAdmin } from "../middlewares/auth.middleware";

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
  
        this.router.get('/',IsUserAuthenticated , ProductController.findAll.bind(ProductController));
        this.router.get('/:id',IsUserAuthenticated,  ProductController.find.bind(ProductController));
        this.router.post('/',verifyTokenAndAdmin,  ProductController.create.bind(ProductController));
        this.router.put('/:id',verifyTokenAndAdmin,  ProductController.update.bind(ProductController));
        this.router.delete('/:id', verifyTokenAndAdmin, ProductController.delete.bind(ProductController));
    }
  }
  
  export default new ProductRouter();
  