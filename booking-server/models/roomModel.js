import mongoose from "mongoose";

const roomsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
      min: 2,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    imageUrls: [],
    currentBookings: [],
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const roomModel = mongoose.model("rooms", roomsSchema);
