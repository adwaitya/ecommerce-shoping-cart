import { Router } from "express";
import { IsUserAuthenticated } from "../middlewares/auth.middleware";
import RoomController from '../controllers/room.controoler';

/**
 * @export
 * @class RoomRouter
 */
 class RoomRouter {
    public router: Router;
  
      /**
       * Creates an instance of AuthRouter.
       * @memberof RoomRouter
       */
    constructor() {
      this.router = Router();
      this.routes();
    }
  
      /**
       * @memberof RoomRouter
       */
    public routes(): void {
  
        this.router.get('/',  RoomController.findAll.bind(RoomController));
        this.router.get('/:id', RoomController.find.bind(RoomController));
        this.router.post('/:hotelid',IsUserAuthenticated,  RoomController.create.bind(RoomController));
        this.router.delete('/:id', IsUserAuthenticated, RoomController.delete.bind(RoomController));
    }
  }
  
  export default new RoomRouter();
  