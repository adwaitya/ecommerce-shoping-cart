import { Types } from "mongoose";
import { IUserService } from "../interfaces/IUserService";
import UserModel, { IUserModel } from "../models/user.model";

/**
 * @export
 * @class UserService
 * @implements {IUserModelService}
 */
class UserService implements IUserService {


    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */
     async findAll(pageReq:number, perpage:number): Promise < IUserModel[] > {
        try {
          const page = pageReq;
          const pageSize = perpage;
          const response = await UserModel.find({})
          .skip((pageSize * page) - pageSize)
          .limit(pageSize);
          return await response;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
        /**
         * @param {string} id
         * @returns {Promise < IUserModel >}
         * @memberof UserService
         */
      async find(id: string): Promise < IUserModel > {
        try {
        //   const validate: Joi.ValidationResult < {
        //     id: string
        //   } > = UserValidation.getUser({
        //     id,
        //   });
    
        //   if (validate.error) {
        //     throw new Error(validate.error.message);
        //   }
    
          return await UserModel.findOne({
            _id: id,
          });
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
       /**
         * @param {string} email
         * @returns {Promise < IUserModel >}
         * @memberof UserService
         */
      async findByEmail(emailId: string): Promise < IUserModel > {
        try {
          return await UserModel.findOne({
            email: emailId,
          }).select("+password");
        } catch (error) {
          console.log('err');
          throw new Error(error.message);
        }
      }
    
        /**
         * @param {IUserModel} user
         * @returns {Promise < IUserModel >}
         * @memberof UserService
         */
      async insert(body: IUserModel): Promise < IUserModel > {
        try {
        //   const validate: Joi.ValidationResult < IUserModel > = UserValidation.createUser(body);
        //   console.log('validate', validate);
        //   if (validate.error) {
        //     throw new Error(validate.error.message);
        //   }
          console.log('body', body);
          const model = new UserModel(body);
          console.log('model', model);
          const user: IUserModel = await UserModel.create(model);
          return user;
        } catch (error) {
          // throw new Error(error.message);
          console.log(`Unable to create user: ${error.message}`);
          // return false;
          throw new Error(error.message);
        }
      }
    
        /**
         * @param {string} id
         * @returns {Promise < IUserModel >}
         * @memberof UserService
         */
      async delete(id: string): Promise < Boolean > {
        try {
        //   const validate: Joi.ValidationResult < {
        //     id: string
        //   } > = UserValidation.deleteUser({
        //     id,
        //   });
    
        //   if (validate.error) {
        //     throw new Error(validate.error.message);
        //   }
    
          const user: IUserModel = await UserModel.findOneAndRemove({
            _id: id,
          });
    
          return true;
        } catch (error) {
          // throw new Error(error.message);
          console.log(`Unable to delete the user ${error.message}`);
          return false;
        }
      }
        /**
         * @returns {Promise < Number >}
         * @memberof UserService
         */
      async findTotalCount(): Promise < Number > {
        try {
          const response = await UserModel.find({}).count();
    
          return await response;
        } catch (error) {
          throw new Error(error.message);
        }
      }

}
export default new UserService();