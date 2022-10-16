import { Types } from 'mongoose';
import { ICartService } from '../interfaces/ICartService';
import CartModel, { ICartModel } from '../models/cart.model';

/**
 * @export
 * @class CartService
 * @implements {ICartService}
 */
class CartService implements ICartService {
  /**
   * @returns {Promise < ICart[] >}
   * @memberof CartService
   */
  async findAll(pageReq: number, perpage: number): Promise<ICartModel[]> {
    try {
      const page = pageReq;
      const pageSize = perpage;
      const response = await CartModel.find({})
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @param {string} id
   * @returns {Promise < ICartModel >}
   * @memberof CartService
   */
  async find(id: string): Promise<ICartModel> {
    try {
      return await CartModel.findOne({
        _id: id,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @param {ICart} user
   * @returns {Promise < ICart >}
   * @memberof CartService
   */
  async updateById(id: any, product: ICartModel): Promise<ICartModel> {
    try {
      const model = new CartModel(product);
      const updatedProduct: ICartModel = await CartModel.findByIdAndUpdate(
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
   * @param {ICartModel} user
   * @returns {Promise < ICartModel >}
   * @memberof CartService
   */
  async insert(body: ICartModel): Promise<ICartModel> {
    try {
      const model = new CartModel(body);
      const cart: ICartModel = await CartModel.create(model);
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
   * @memberof CartService
   */
  async delete(id: string): Promise<Boolean> {
    try {
      const cart: ICartModel = await CartModel.findOneAndRemove({
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
   * @memberof CartService
   */
  async findTotalCount(): Promise<Number> {
    try {
      const response = await CartModel.find({}).count();

      return await response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new CartService();
