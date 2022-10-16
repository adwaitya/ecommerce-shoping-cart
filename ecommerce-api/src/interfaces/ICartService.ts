import { ICartModel } from "../models/cart.model";

/**
 * @export
 * @interface ICartService
 */
 export interface ICartService {

    /**
     * @returns {Promise<ICartModel[]>}
     * @memberof ICartService
     */
  findAll(page:number, perpage:number): Promise<ICartModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<ICartModel>}
     * @memberof ICartService
     */
  find(code: string): Promise<ICartModel>;

    /**
     * @param {ICartModel} ICartModel
     * @returns {Promise<ICartModel>}
     * @memberof ICartService
     */
  insert(ICartModel: ICartModel): Promise<ICartModel>;
    /**
     * @param {ICartModel} ICartModel
     * @returns {Promise<ICartModel>}
     * @memberof ICartService
     */
  updateById(id: string, ICartModel: ICartModel): Promise<ICartModel>;

    /**
     * @param {string} id
     * @returns {Promise<ICartModel>}
     * @memberof ICartService
     */
  delete(id: string): Promise<Boolean>;

  /**
     * @returns {Promise<Number>}
     * @memberof ICartService
  */

  findTotalCount(): Promise<Number>;
}
