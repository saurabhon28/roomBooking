import { bookingModel } from "../models/bookingModel.js";
import { Users } from "../models/userModel.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
