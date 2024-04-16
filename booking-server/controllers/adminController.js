import { bookingModel } from "../models/bookingModel.js";
import { roomModel } from "../models/roomModel.js";
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

export const addNewRoom = async (req, res) => {
  try {
    const newRoom = new roomModel(req.body);
    await newRoom.save();
    res.send("New room Added Successfully");
  } catch (error) {
    res.status(400).json({ error });
  }
};
