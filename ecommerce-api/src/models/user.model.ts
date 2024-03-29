import mongoose, { Document, Schema, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  email: string;
  password: string;
  isAdmin: boolean;
  img: string;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    img: {
      type: String,
      required: false,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    updateAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: 'usermodel',
    versionKey: false,
  },
);
userSchema.pre<IUserModel>('save', function (next) {
  if (!this.isModified('password')) return next();
  const user = this;
  user.updatedAt = new Date();
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});


async function hashPassword(user: IUserModel) {
  const password = user.password;
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash: any) => {
      if (err) {
        reject(err);
      }
      console.log(hash);
      resolve(hash);
    });
  });

  return hashedPassword;
}

export default mongoose.model<IUserModel>('UserModel', userSchema);
