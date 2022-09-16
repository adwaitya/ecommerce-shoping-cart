import { IRoom } from "../models/room";

/**
 * @export
 * @interface IRoomService
 */
 export interface IRoomService {

    /**
     * @returns {Promise<IRoom[]>}
     * @memberof IRoomService
     */
  findAll(page:number, perpage:number): Promise<IRoom[]>;

    /**
     * @param {string} code
     * @returns {Promise<IRoom>}
     * @memberof IRoomService
     */
  find(code: string): Promise<IRoom>;

    /**
     * @param {IRoom} IRoom
     * @returns {Promise<IRoom>}
     * @memberof IRoomService
     */
  insert(IRoom: IRoom): Promise<IRoom>;

    /**
     * @param {string} id
     * @returns {Promise<IRoom>}
     * @memberof IRoomService
     */
  delete(id: string): Promise<Boolean>;

  /**
     * @returns {Promise<Number>}
     * @memberof IRoomService
  */

  findTotalCount(): Promise<Number>;
}
