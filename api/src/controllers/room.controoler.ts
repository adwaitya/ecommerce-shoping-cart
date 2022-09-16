import { NextFunction, Request, Response } from 'express';
import RoomService from "../services/room.service";
import HttpException from '../exceptions/HttpException';
import { PaginationResponse, TypedResponse } from '../models/base';
import { IRoomService } from '../interfaces/IRoomService';
import Room,{ IRoom } from '../models/room';
import HotelModel from '../models/hotel';


class RoomController {
  /**
* @private
* @type {IRoomService}
* @memberof RoomController
*/
  private service: IRoomService;

  /**
   * Creates an instance of UserController.
   * @param {IRoomService} repository
   * @memberof UserController
   */
  constructor(service: IRoomService) {
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
      const rooms: IRoom[] = await this.service.findAll(page, perpage);
      const totalRecords = await this.service.findTotalCount();
      const response: TypedResponse<IRoom> = {
        data: rooms, isSuccess: true,
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
      const room: IRoom = await this.service.find(req.params.id);

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
      const hotelId = req.params.hotelid;
      let savedRoom = new Room(req.body);
      savedRoom = await this.service.insert(savedRoom);
      if (savedRoom) {
        try {
            await HotelModel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id.toHexString() },
              })

            return res.status(200).json({
                model: savedRoom, isSuccess: true,
                message: 'Room created', errorHolder: null, httpCode: 201
              });
        } catch(err) {
            next(err)
        }
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

export default new RoomController(RoomService);