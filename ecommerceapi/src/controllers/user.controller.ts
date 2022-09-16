import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from "../services/user.service";
import config from '../config/config';
import HttpException from '../exceptions/HttpException';
import { ILoginUserModel } from '../interfaces/ILoginUserModel';
import { IUserService } from "../interfaces/IUserService";
import { PaginationResponse, TypedResponse } from '../models/base';
import UserModel, { IUserModel } from "../models/user.model";
import AuthConfig from '../config/auth.config';
import sendConfirmationEmail from '../services/EmailService';


class UserController {
  /**
* @private
* @type {IUserModelService}
* @memberof UserController
*/
  private service: IUserService;

  /**
   * Creates an instance of UserController.
   * @param {IUserModelService} repository
   * @memberof UserController
   */
  constructor(service: IUserService) {
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
      const users: IUserModel[] = await this.service.findAll(page, perpage);
      const totalRecords = await this.service.findTotalCount();
      const response: TypedResponse<IUserModel> = {
        data: users, isSuccess: true,
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
      const user: IUserModel = await this.service.find(req.params.id);

      return res.status(200).json(user);
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
      let user: IUserModel = await this.service.findByEmail(req.body.email);
      const token = jwt.sign({ email: req.body.email }, AuthConfig.secret);

      if (user !== null) {
        return res.status(500).json({
          model: null, isSuccess: false,
          message: 'Email is already exits', errorHolder: null, httpCode: 500
        });
      }
      user = new UserModel(req.body);
      user = await this.service.insert(user);
      if (user) {
        const tokenKey = await jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        const data: ILoginUserModel = { email: user.email, name: user.name, token: tokenKey };
        return res.status(200).json({
          model: data, isSuccess: true,
          message: 'Registration successful', errorHolder: null, httpCode: 201
        });
      }

      return res.status(500).json({
        model: null, isSuccess: false,
        message: 'Unable to create user', errorHolder: null, httpCode: 500
      });
    } catch (error) {
      return res.status(500).json({
        model: null, isSuccess: false,
        message: 'Unable to create user', errorHolder: null, httpCode: 500
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

export default new UserController(UserService);