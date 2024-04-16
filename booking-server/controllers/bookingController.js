import { bookingModel } from "../models/bookingModel.js";
import moment from "moment";
import { roomModel } from "../models/roomModel.js";

export const bookRoom = async (req, res) => {
  try {
    const { room, userId, fromDate, toDate, totalAmount, totalDays } = req.body;

    // // Input validation
    // if (
    //   !room ||
    //   !userId ||
    //   !fromDate ||
    //   !toDate ||
    //   !totalAmount ||
    //   !totalDays
    // ) {
    //   return res.status(400).json({ error: "Missing required fields." });
    // }

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

    roomTemp.currentBookings.push({
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
  const userId = req.body.userId;

  try {
    // Fetch bookings for the provided userId
    const bookings = await bookingModel.find({ userId });

    // If no bookings are found, return appropriate response
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for the provided user ID." });
    }

    // If bookings are found, send them in the response
    res.status(200).json({ bookings });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching bookings by user ID:", error);
    // Send a error message to the client
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

//Cancel Booking logic
export const cancelBooking = async (req, res) => {
  const { bookingId, roomId } = req.body;

  try {
    const bookingItem = await bookingModel.findOne({ _id: bookingId });
    console.log(bookingItem);

    /* if (!bookingItem) {
      return res.status(404).json({ message: "Booking not found" });
    }*/

    bookingItem.status = "cancelled";
    await bookingItem.save();

    const room = await roomModel.findOne({ _id: roomId });

    console.log(room);

    /* if (!room) {
      return res.status(404).json({ message: "Room not found" });
    } */

    room.currentBookings.filter(
      (booking) => booking.bookingId.toString() !== bookingId
    );

    await room.save();

    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
