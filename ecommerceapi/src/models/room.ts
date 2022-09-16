import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRoom extends Document {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  roomNumbers: [];
}

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true },
);

export default mongoose.model<IRoom>('Room', RoomSchema);
