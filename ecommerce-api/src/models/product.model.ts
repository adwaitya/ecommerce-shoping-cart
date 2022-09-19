import mongoose, { Document, Schema } from "mongoose";

/**
 * @export
 * @interface IProductModel
 * @extends {Document}
 */
 export interface IProductModel extends Document {
    _id: string;
    title: string;
    desc: string;
    img: string;
    categories: string[];
    size: string;
    color: string;
    price: Number;
  }
  
  const producuctSchema: Schema = new Schema(
    {
        title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: false,
        default: null,
      },
      categories: {
        type: Array,
        required: false,
        default: [],
      },
      size: {
        type: String,
        required: false,
        default: null,
      },
      color: {
        type: String,
        required: false,
        default: null,
      },
      price: {
        type: Number,
        required: false,
        default: 0,
      },
      
    },
    {
      collection: 'productmodel',
      versionKey: false,
      timestamps: true
    }
  );


  export default mongoose.model<IProductModel>('ProductModel', producuctSchema);