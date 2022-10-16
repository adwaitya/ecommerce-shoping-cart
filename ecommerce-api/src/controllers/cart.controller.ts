import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { ICartService } from "../interfaces/ICartService";
import { TypedResponse, PaginationResponse } from "../models/base";
import CartModel, { ICartModel } from "../models/cart.model";
import CartService from "../services/cart.service";

class CartController {
    /**
  * @private
  * @type {ICartService}
  * @memberof CartController
  */
    private service: ICartService;
  
    /**
     * Creates an instance of UserController.
     * @param {ICartService} repository
     * @memberof CartController
     */
    constructor(service: ICartService) {
      this.service = service;
    }
  
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof CartController
     */
    async findAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        const page = 1 //parseInt(req.query);
        const perpage = 10 //parseInt(req.query.perpage);
        const carts: ICartModel[] = await this.service.findAll(page, perpage);
        const totalRecords = await this.service.findTotalCount();
        const response: TypedResponse<ICartModel> = {
          data: carts, isSuccess: true,
          pagination: <PaginationResponse>{
            page: 1, //parseInt(req.query),
            size: perpage,
            total: totalRecords,
          }, httpCode: 200, errorHolder: null
        };
        return res.status(200).json(response);
      } catch (error) {
        next(new HttpException(error.message.status, error.message));
      }
    }
  
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof CartController
     */
    async find(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        const product: ICartModel = await this.service.find(req.params.id);
  
        return res.status(200).json(product);
      } catch (error) {
        next(new HttpException(error.message.status, error.message));
      }
    }
  
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof CartController
     */
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        let cart = new CartModel(req.body);
        cart = await this.service.insert(cart);
        if (cart) {
          return res.status(200).json(cart);
        }
  
        return res.status(500).json({
          model: null, isSuccess: false,
          message: 'Unable to create cart', errorHolder: null, httpCode: 500
        });
      } catch (error) {
        return res.status(500).json({
          model: null, isSuccess: false,
          message: 'Unable to create cart', errorHolder: null, httpCode: 500
        });
      }
    }

      /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof CartController
     */
       async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
          let cart = new CartModel(req.body);
          cart = await this.service.updateById(req.params.id, cart);
          if (cart) {
            return res.status(200).json(cart);
          }
    
          return res.status(500).json({
            model: null, isSuccess: false,
            message: 'Unable to update cart', errorHolder: null, httpCode: 500
          });
        } catch (error) {
          return res.status(500).json({
            model: null, isSuccess: false,
            message: 'Unable to update cart', errorHolder: null, httpCode: 500
          });
        }
      }
  
    /**
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise < Response >}
    * @memberof CartController
    */
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        const response = await this.service.delete(req.params.id);
  
        return res.status(200).json(response);
      } catch (error) {
        next(new HttpException(error.message.status, error.message));
      }
    }
  }
  
  export default new CartController(CartService);