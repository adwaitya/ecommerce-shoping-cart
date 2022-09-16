import { Types } from "mongoose";
import { IHotelService } from "../interfaces/IHotelService";
import HotelModel, {IHotel} from '../models/hotel';


/**
 * @export
 * @class HotelService
 * @implements {IHotelService}
 */
class HotelService implements IHotelService {


    /**
     * @returns {Promise < IHotel[] >}
     * @memberof HotelService
     */
     async findAll(pageReq:number, perpage:number): Promise < IHotel[] > {
        try {
          const page = pageReq;
          const pageSize = perpage;
          const response = await HotelModel.find({})
          .skip((pageSize * page) - pageSize)
          .limit(pageSize);
          return await response;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
        /**
         * @param {string} id
         * @returns {Promise < IHotel >}
         * @memberof HotelService
         */
      async find(id: string): Promise < IHotel > {
        try {
        //   const validate: Joi.ValidationResult < {
        //     id: string
        //   } > = UserValidation.getUser({
        //     id,
        //   });
    
        //   if (validate.error) {
        //     throw new Error(validate.error.message);
        //   }
    
          return await HotelModel.findOne({
            _id: Types.ObjectId(id),
          });
        } catch (error) {
          throw new Error(error.message);
        }
      }

    
        /**
         * @param {IHotel} user
         * @returns {Promise < IHotel >}
         * @memberof HotelService
         */
      async insert(body: IHotel): Promise < IHotel > {
        try {
        //   const validate: Joi.ValidationResult < IHotel > = UserValidation.createUser(body);
        //   console.log('validate', validate);
        //   if (validate.error) {
        //     throw new Error(validate.error.message);
        //   }
          console.log('body', body);
          const model = new HotelModel(body);
          console.log('model', model);
          const user: IHotel = await HotelModel.create(model);
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
         * @returns {Promise < IHotel >}
         * @memberof HotelService
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
    
          const user: IHotel = await HotelModel.findOneAndRemove({
            _id: Types.ObjectId(id),
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
         * @memberof HotelService
         */
      async findTotalCount(): Promise < Number > {
        try {
          const response = await HotelModel.find({}).count();
    
          return await response;
        } catch (error) {
          throw new Error(error.message);
        }
      }

}
export default new HotelService();