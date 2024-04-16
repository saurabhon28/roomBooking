import { bookingModel } from "../models/bookingModel.js";
import moment from "moment";
import { roomModel } from "../models/roomModel.js";

export const bookRoom = async (req, res) => {
  try {
    const { room, userId, fromDate, toDate, totalAmount, totalDays } = req.body;

    // Input validation
    if (
      !room ||
      !userId ||
      !fromDate ||
      !toDate ||
      !totalAmount ||
      !totalDays
    ) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Create new booking
    const newBooking = new bookingModel({
      room: room.name,
      roomId: room._id,
      userId,
      fromDate: moment(fromDate).format("MMMM Do YYYY"),
      toDate: moment(toDate).format("MMMM Do YYYY"),
      totalAmount,
      totalDays,
      transactionId: "1234",
    });

    // Save booking to the database
    const booking = await newBooking.save();

    // Update room's current bookings
    const roomTemp = await roomModel.findOne({ _id: room._id });

    roomTemp.currentBooking.push({
      bookingId: booking._id,
      fromDate: moment(fromDate).format("MMMM Do YYYY"),
      toDate: moment(toDate).format("MMMM Do YYYY"),
      userId: userId,
      status: booking.status,
    });

    await roomTemp.save();

    // Send success response
    return res
      .status(200)
      .json({ message: "Room booked successfully", bookingId: booking._id });
  } catch (error) {
    // Error handling
    console.error("Error occurred while booking room:", error);
    return res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
};

//Booking By User id
export const bookingsByUserId = async (req, res) => {
  const userId = req.body.userid;

  try {
    const bookings = await bookingModel.find({ userid: userId });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

//Cancel Booking logic
export const cancelBooking = async (req, res) => {
  const { bookingId, roomId } = req.body;

  try {
    const booking = await bookingModel.findOne({ _id: bookingId });

    booking.status = "cancelled";
    await booking.save();
    const room = await roomModel.findOne({ _id: roomId });

    const bookings = room.currentBookings;

    const temp = bookings.filter(
      (booking) => booking.bookingId.toString() !== bookingId
    );
    room.currentBookings = temp;

    res.send("Your booking cancelled successfully");

    await room.save();
  } catch (error) {
    return res.status(400).json({ error });
  }
};
