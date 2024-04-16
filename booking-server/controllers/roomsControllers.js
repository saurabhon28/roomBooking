import { roomModel } from "../models/roomModel.js";

export const addRooms = async (req, res) => {
  try {
    const {
      name,
      imageUrls,
      rentPerDay,
      type,
      maxCount,
      phoneNumber,
      currentBookings,
      description,
    } = req.body;

    const newRoom = new roomModel({
      name,
      imageUrls,
      rentPerDay,
      type,
      maxCount,
      phoneNumber,
      currentBookings,
      description,
    });

    // Save the new room to the database
    await newRoom.save();

    // If the save operation is successful, send a success response
    res.status(200).json({ code: 200, message: "Room Added Successfully" });
  } catch (error) {
    // If there's an error during the process, send an error response
    console.error("Error adding room:", error);
    res.status(500).json({ code: 500, message: "Internal Server error" });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.find({});
    return res.send({ code: 201, count: rooms.length, data: rooms });
  } catch (error) {
    // If there's an error during the process, send an error response
    console.error("Error getting room:", error);
    res.status(500).json({ code: 500, message: "Internal Server error" });
  }
};

export const getRoom = async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await roomModel.findOne({ _id: roomid });
    return res.send({ code: 200, data: room });
  } catch (error) {
    // If there's an error during the process, send an error response
    console.error("Error getting room:", error);
    res.status(500).json({ code: 500, message: "Internal Server error" });
  }
};
