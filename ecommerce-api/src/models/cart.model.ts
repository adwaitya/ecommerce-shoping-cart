import mongoose, { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface ICartModel
 * @extends {Document}
 */
export interface ICartModel extends Document {
  _id: string;
  userId: string;
  prodcuts: any[];
}

const cartSchema: Schema = new Schema(
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
    }],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
  },
  {
    collection: 'cartmodel',
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model<ICartModel>('CartModel', cartSchema);
