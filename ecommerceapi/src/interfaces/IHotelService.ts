import { IHotel } from "../models/hotel";

/**
 * @export
 * @interface IHotelService
 */
 export interface IHotelService {

    /**
     * @returns {Promise<IHotel[]>}
     * @memberof IHotelService
     */
  findAll(page:number, perpage:number): Promise<IHotel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IHotel>}
     * @memberof IHotelService
     */
  find(code: string): Promise<IHotel>;

    /**
     * @param {IHotel} IHotel
     * @returns {Promise<IHotel>}
     * @memberof IHotelService
     */
  insert(IHotel: IHotel): Promise<IHotel>;
    /**
     * @param {IHotel} IHotel
     * @returns {Promise<IHotel>}
     * @memberof IHotelService
     */
//   updateById(IHotel: IHotel): Promise<IHotel>;

//     /**
//      * @param {string} id
//      * @returns {Promise<IHotel>}
//      * @memberof IHotelService
//      */
  delete(id: string): Promise<Boolean>;

  /**
     * @returns {Promise<Number>}
     * @memberof IHotelService
  */

  findTotalCount(): Promise<Number>;
}
