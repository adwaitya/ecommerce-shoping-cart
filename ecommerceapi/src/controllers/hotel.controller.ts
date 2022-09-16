import { NextFunction, Request, Response } from 'express';
import HotelService from "../services/hotel.service";
import config from '../config/config';
import HttpException from '../exceptions/HttpException';
import { PaginationResponse, TypedResponse } from '../models/base';
import HotelModel, { IHotel } from '../models/hotel';
import { IHotelService } from '../interfaces/IHotelService';


class HotelController {
  /**
* @private
* @type {IHotelService}
* @memberof HotelController
*/
  private service: IHotelService;

  /**
   * Creates an instance of UserController.
   * @param {IHotelService} repository
   * @memberof UserController
   */
  constructor(service: IHotelService) {
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
      const hotels: IHotel[] = await this.service.findAll(page, perpage);
      const totalRecords = await this.service.findTotalCount();
      const response: TypedResponse<IHotel> = {
        data: hotels, isSuccess: true,
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
      const room: IHotel = await this.service.find(req.params.id);

      return res.status(200).json(room);
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
      let hotel = new HotelModel(req.body);
      hotel = await this.service.insert(hotel);
      if (hotel) {
        return res.status(200).json({
          model: hotel, isSuccess: true,
          message: 'Hotel created', errorHolder: null, httpCode: 201
        });
      }

      return res.status(500).json({
        model: null, isSuccess: false,
        message: 'Unable to create hotel', errorHolder: null, httpCode: 500
      });
    } catch (error) {
      return res.status(500).json({
        model: null, isSuccess: false,
        message: 'Unable to create hotel', errorHolder: null, httpCode: 500
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

export default new HotelController(HotelService);