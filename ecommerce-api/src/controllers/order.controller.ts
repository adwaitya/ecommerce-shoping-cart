import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { IOrderService } from "../interfaces/IOrderService";
import { TypedResponse, PaginationResponse } from "../models/base";
import OrderModel, { IOrderModel } from "../models/order.model";
import CartService from "../services/cart.service";

class OrderController {
    /**
  * @private
  * @type {IOrderService}
  * @memberof OrderController
  */
    private service: IOrderService;
  
    /**
     * Creates an instance of UserController.
     * @param {IOrderService} repository
     * @memberof OrderController
     */
    constructor(service: IOrderService) {
      this.service = service;
    }
  
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof OrderController
     */
    async findAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        const page = 1 //parseInt(req.query);
        const perpage = 10 //parseInt(req.query.perpage);
        const orders: IOrderModel[] = await this.service.findAll(page, perpage);
        const totalRecords = await this.service.findTotalCount();
        const response: TypedResponse<IOrderModel> = {
          data: orders, isSuccess: true,
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
     * @memberof OrderController
     */
    async find(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        const product: IOrderModel = await this.service.find(req.params.id);
  
        return res.status(200).json(product);
      } catch (error) {
        next(new HttpException(error.message.status, error.message));
      }
    }
  
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof OrderController
     */
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        let order = new OrderModel(req.body);
        order = await this.service.insert(order);
        if (order) {
          return res.status(200).json(order);
        }
  
        return res.status(500).json({
          model: null, isSuccess: false,
          message: 'Unable to create order', errorHolder: null, httpCode: 500
        });
      } catch (error) {
        return res.status(500).json({
          model: null, isSuccess: false,
          message: 'Unable to create order', errorHolder: null, httpCode: 500
        });
      }
    }

      /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof OrderController
     */
       async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
          let order = new OrderModel(req.body);
          order = await this.service.updateById(req.params.id, order);
          if (order) {
            return res.status(200).json(order);
          }
    
          return res.status(500).json({
            model: null, isSuccess: false,
            message: 'Unable to update order', errorHolder: null, httpCode: 500
          });
        } catch (error) {
          return res.status(500).json({
            model: null, isSuccess: false,
            message: 'Unable to update order', errorHolder: null, httpCode: 500
          });
        }
      }
  
    /**
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise < Response >}
    * @memberof OrderController
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
  
  export default new OrderController(CartService);