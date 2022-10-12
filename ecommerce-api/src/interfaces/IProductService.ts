import { IProduct } from "../models/product.model";

/**
 * @export
 * @interface IProductService
 */
 export interface IProductService {

    /**
     * @returns {Promise<IProduct[]>}
     * @memberof IProductService
     */
  findAll(page:number, perpage:number): Promise<IProduct[]>;

    /**
     * @param {string} code
     * @returns {Promise<IProduct>}
     * @memberof IProductService
     */
  find(code: string): Promise<IProduct>;

    /**
     * @param {IProduct} IProduct
     * @returns {Promise<IProduct>}
     * @memberof IProductService
     */
  insert(IProduct: IProduct): Promise<IProduct>;
    /**
     * @param {IProduct} IProduct
     * @returns {Promise<IProduct>}
     * @memberof IProductService
     */
  updateById(id: string, IProduct: IProduct): Promise<IProduct>;

    /**
     * @param {string} id
     * @returns {Promise<IProduct>}
     * @memberof IProductService
     */
  delete(id: string): Promise<Boolean>;

  /**
     * @returns {Promise<Number>}
     * @memberof IProductService
  */

  findTotalCount(): Promise<Number>;
}
