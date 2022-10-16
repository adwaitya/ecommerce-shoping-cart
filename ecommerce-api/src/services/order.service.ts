import { Types } from 'mongoose';
import { IOrderService } from '../interfaces/IOrderService';
import OrderModel, { IOrderModel } from '../models/order.model';

/**
 * @export
 * @class OrderService
 * @implements {IOrderService}
 */
class OrderService implements IOrderService {
  /**
   * @returns {Promise < IOrderModel[] >}
   * @memberof OrderService
   */
  async findAll(pageReq: number, perpage: number): Promise<IOrderModel[]> {
    try {
      const page = pageReq;
      const pageSize = perpage;
      const response = await OrderModel.find({})
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @param {string} id
   * @returns {Promise < IOrderModel >}
   * @memberof OrderService
   */
  async find(id: string): Promise<IOrderModel> {
    try {
      return await OrderModel.findOne({
        _id: id,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @param {ICart} user
   * @returns {Promise < ICart >}
   * @memberof OrderService
   */
  async updateById(id: any, product: IOrderModel): Promise<IOrderModel> {
    try {
      const model = new OrderModel(product);
      const updatedProduct: IOrderModel = await OrderModel.findByIdAndUpdate(
        {_id: model._id},
        {
          $set: model,
        },
        { new: true, upsert: true, },
      );
      return updatedProduct;
    } catch (error) {
      console.log(`Unable to update cart: ${error.message}`);
      // return false;
      throw new Error(error.message);
    }
  }
  /**
   * @param {IOrderModel} user
   * @returns {Promise < IOrderModel >}
   * @memberof OrderService
   */
  async insert(body: IOrderModel): Promise<IOrderModel> {
    try {
      const model = new OrderModel(body);
      const cart: IOrderModel = await OrderModel.create(model);
      return cart;
    } catch (error) {
      // throw new Error(error.message);
      console.log(`Unable to create cart: ${error.message}`);
      // return false;
      throw new Error(error.message);
    }
  }

  /**
   * @param {string} id
   * @returns {Promise < ICart >}
   * @memberof OrderService
   */
  async delete(id: string): Promise<Boolean> {
    try {
      const cart: IOrderModel = await OrderModel.findOneAndRemove({
        _id: id,
      });

      return true;
    } catch (error) {
      // throw new Error(error.message);
      console.log(`Unable to delete the cart ${error.message}`);
      return false;
    }
  }
  /**
   * @returns {Promise < Number >}
   * @memberof OrderService
   */
  async findTotalCount(): Promise<Number> {
    try {
      const response = await OrderModel.find({}).count();

      return await response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new OrderService();
