import { Types } from "mongoose";
import { IRoomService } from "../interfaces/IRoomService";
import Room, {IRoom} from '../models/room';


/**
 * @export
 * @class HotelService
 * @implements {IRoomService}
 */
class RoomService implements IRoomService {


    /**
     * @returns {Promise < IRoom[] >}
     * @memberof HotelService
     */
     async findAll(pageReq:number, perpage:number): Promise < IRoom[] > {
        try {
          const page = pageReq;
          const pageSize = perpage;
          const response = await Room.find({})
          .skip((pageSize * page) - pageSize)
          .limit(pageSize);
          return await response;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
        /**
         * @param {string} id
         * @returns {Promise < IRoom >}
         * @memberof HotelService
         */
      async find(id: string): Promise < IRoom > {
        try {
        //   const validate: Joi.ValidationResult < {
        //     id: string
        //   } > = UserValidation.getUser({
        //     id,
        //   });
    
        //   if (validate.error) {
        //     throw new Error(validate.error.message);
        //   }
    
          return await Room.findOne({
            _id: Types.ObjectId(id),
          });
        } catch (error) {
          throw new Error(error.message);
        }
      }

    
        /**
         * @param {IRoom} user
         * @returns {Promise < IRoom >}
         * @memberof HotelService
         */
      async insert(body: IRoom): Promise < IRoom > {
        try {
        //   const validate: Joi.ValidationResult < IRoom > = UserValidation.createUser(body);
        //   console.log('validate', validate);
        //   if (validate.error) {
        //     throw new Error(validate.error.message);
        //   }
          console.log('body', body);
          const model = new Room(body);
          console.log('model', model);
          const user: IRoom = await Room.create(model);
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
         * @returns {Promise < IRoom >}
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
    
          const user: IRoom = await Room.findOneAndRemove({
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
          const response = await Room.find({}).count();
    
          return await response;
        } catch (error) {
          throw new Error(error.message);
        }
      }

}
export default new RoomService();