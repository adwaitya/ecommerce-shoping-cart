import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { IProductService } from "../interfaces/IProductService";
import { TypedResponse, PaginationResponse } from "../models/base";
import ProductModel, { IProduct } from "../models/product.model";
import ProductService from "../services/product.service";

class ProductController {
    /**
  * @private
  * @type {IProductService}
  * @memberof ProductController
  */
    private service: IProductService;
  
    /**
     * Creates an instance of UserController.
     * @param {IProductService} repository
     * @memberof UserController
     */
    constructor(service: IProductService) {
      this.service = service;
    }
  
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof UserController
     */
    async findAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        const page = 1 //parseInt(req.query);
        const perpage = 10 //parseInt(req.query.perpage);
        const products: IProduct[] = await this.service.findAll(page, perpage);
        const totalRecords = await this.service.findTotalCount();
        const response: TypedResponse<IProduct> = {
          data: products, isSuccess: true,
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
     * @memberof UserController
     */
    async find(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        const product: IProduct = await this.service.find(req.params.id);
  
        return res.status(200).json(product);
      } catch (error) {
        next(new HttpException(error.message.status, error.message));
      }
    }
  
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof UserController
     */
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
        let product = new ProductModel(req.body);
        product = await this.service.insert(product);
        if (product) {
          return res.status(200).json(product);
        }
  
        return res.status(500).json({
          model: null, isSuccess: false,
          message: 'Unable to create product', errorHolder: null, httpCode: 500
        });
      } catch (error) {
        return res.status(500).json({
          model: null, isSuccess: false,
          message: 'Unable to create product', errorHolder: null, httpCode: 500
        });
      }
    }

      /**
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise < Response >}
     * @memberof UserController
     */
       async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
          let product = new ProductModel(req.body);
          product = await this.service.updateById(req.params.id, product);
          if (product) {
            return res.status(200).json(product);
          }
    
          return res.status(500).json({
            model: null, isSuccess: false,
            message: 'Unable to update product', errorHolder: null, httpCode: 500
          });
        } catch (error) {
          return res.status(500).json({
            model: null, isSuccess: false,
            message: 'Unable to update product', errorHolder: null, httpCode: 500
          });
        }
      }
  
    /**
    * @param {Request} req
    * @param {Response} res
    * @returns {Promise < Response >}
    * @memberof UserController
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
  
  export default new ProductController(ProductService);