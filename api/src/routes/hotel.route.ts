import { Router } from "express";
import { IsUserAuthenticated } from "../middlewares/auth.middleware";
import HotelController from '../controllers/hotel.controller';

/**
 * @export
 * @class HotelRouter
 */
 class HotelRouter {
    public router: Router;
  
      /**
       * Creates an instance of AuthRouter.
       * @memberof HotelRouter
       */
    constructor() {
      this.router = Router();
      this.routes();
    }
  
      /**
       * @memberof HotelRouter
       */
    public routes(): void {
  
        this.router.get('/',  HotelController.findAll.bind(HotelController));
        this.router.get('/:id', HotelController.find.bind(HotelController));
        this.router.post('/',IsUserAuthenticated,  HotelController.create.bind(HotelController));
        this.router.delete('/:id', IsUserAuthenticated, HotelController.delete.bind(HotelController));
    }
  }
  
  export default new HotelRouter();
  