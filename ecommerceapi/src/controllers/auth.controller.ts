import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import config from "../config/config";
import { ILoginUserModel } from "../interfaces/ILoginUserModel";
import { IUserService } from "../interfaces/IUserService";
import { IUserModel } from "../models/user.model";
import UserService from "../services/user.service";

/**
 * @export
 * @class AuthController
 */
class AuthController {

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
    async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user: IUserModel = await this.service.findByEmail(req.body.email);
            // console.log('user', user);
            let data: ILoginUserModel = { email: user.email, name: user.name, token: null };
            if (user == null) {
                console.log('user --');
                return res.status(500).json({
                    model: data, isSuccess: false,
                    message: 'User does not exits', errorHolder: null, httpCode: 500
                });
            }
            const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(500).json({
                    model: data, isSuccess: false,
                    message: 'Password is not correct', errorHolder: new Error('Password is not correct'), httpCode: 401
                });
            }
            const tokenKey = await jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400, // expires in 24 hours
            });
            data = { email: user.email, name: user.name, token: tokenKey };
            return res.status(200).json({
                model: data, isSuccess: true,
                message: 'Sign in successful', errorHolder: null, httpCode: 200
            });
        } catch (error) {
            // next(new HttpError(error.message.status, error.message));
            return res.status(500).json({
                model: null, isSuccess: false,
                message: 'Username or password is not correct', errorHolder: new Error('User does not exits'), httpCode: 500
            });

        }
    }
}
export default new AuthController(UserService);