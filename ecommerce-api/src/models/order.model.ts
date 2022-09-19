import mongoose, { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IOrderModel
 * @extends {Document}
 */
export interface IOrderModel extends Document {
  _id: string;
  userId: string;
  prodcuts: any[];
}

const orderSchema: Schema = new Schema(
  {
    userId: {
      type: Array,
      required: true,
    },
    products: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
  },
  {
    collection: 'ordermodel',
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model<IOrderModel>('orderModel', orderSchema);
