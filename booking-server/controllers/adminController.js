import { bookingModel } from "../models/bookingModel.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllBookedRooms = async (req, res) => {
  try {
  } catch (error) {}
};
