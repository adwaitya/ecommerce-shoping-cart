import { IOrderModel } from "../models/order.model";

/**
 * @export
 * @interface IOrderService
 */
 export interface IOrderService {

    /**
     * @returns {Promise<IOrderModel[]>}
     * @memberof IOrderService
     */
  findAll(page:number, perpage:number): Promise<IOrderModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IOrderModel>}
     * @memberof IOrderService
     */
  find(code: string): Promise<IOrderModel>;

    /**
     * @param {IOrderModel} IOrderModel
     * @returns {Promise<IOrderModel>}
     * @memberof IOrderService
     */
  insert(IOrderModel: IOrderModel): Promise<IOrderModel>;
    /**
     * @param {IOrderModel} IOrderModel
     * @returns {Promise<IOrderModel>}
     * @memberof IOrderService
     */
  updateById(id: string, IOrderModel: IOrderModel): Promise<IOrderModel>;

    /**
     * @param {string} id
     * @returns {Promise<IOrderModel>}
     * @memberof IOrderService
     */
  delete(id: string): Promise<Boolean>;

  /**
     * @returns {Promise<Number>}
     * @memberof IOrderService
  */

  findTotalCount(): Promise<Number>;
}
