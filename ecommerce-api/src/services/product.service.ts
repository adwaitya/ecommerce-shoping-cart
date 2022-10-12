import { Types } from 'mongoose';
import { IProductService } from '../interfaces/IProductService';
import ProductModel, { IProduct } from '../models/product.model';

/**
 * @export
 * @class HotelService
 * @implements {IProductService}
 */
class ProductService implements IProductService {
  /**
   * @returns {Promise < IProduct[] >}
   * @memberof HotelService
   */
  async findAll(pageReq: number, perpage: number): Promise<IProduct[]> {
    try {
      const page = pageReq;
      const pageSize = perpage;
      const response = await ProductModel.find({})
        .skip(pageSize * page - pageSize)
        .limit(pageSize);
      return await response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @param {string} id
   * @returns {Promise < IProduct >}
   * @memberof HotelService
   */
  async find(id: string): Promise<IProduct> {
    try {
      return await ProductModel.findOne({
        _id: id,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @param {IProduct} user
   * @returns {Promise < IProduct >}
   * @memberof HotelService
   */
  async updateById(id: any, product: IProduct): Promise<IProduct> {
    try {
      const model = new ProductModel(product);
      const updatedProduct: IProduct = await ProductModel.findByIdAndUpdate(
        {_id: model._id},
        {
          $set: model,
        },
        { new: true, upsert: true, },
      );
      return updatedProduct;
    } catch (error) {
      console.log(`Unable to update product: ${error.message}`);
      // return false;
      throw new Error(error.message);
    }
  }
  /**
   * @param {IProduct} user
   * @returns {Promise < IProduct >}
   * @memberof HotelService
   */
  async insert(body: IProduct): Promise<IProduct> {
    try {
      const model = new ProductModel(body);
      const product: IProduct = await ProductModel.create(model);
      return product;
    } catch (error) {
      // throw new Error(error.message);
      console.log(`Unable to create product: ${error.message}`);
      // return false;
      throw new Error(error.message);
    }
  }

  /**
   * @param {string} id
   * @returns {Promise < IProduct >}
   * @memberof HotelService
   */
  async delete(id: string): Promise<Boolean> {
    try {
      const product: IProduct = await ProductModel.findOneAndRemove({
        _id: id,
      });

      return true;
    } catch (error) {
      // throw new Error(error.message);
      console.log(`Unable to delete the product ${error.message}`);
      return false;
    }
  }
  /**
   * @returns {Promise < Number >}
   * @memberof HotelService
   */
  async findTotalCount(): Promise<Number> {
    try {
      const response = await ProductModel.find({}).count();

      return await response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new ProductService();
