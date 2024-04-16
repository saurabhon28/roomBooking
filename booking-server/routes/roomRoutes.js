import express from "express";
import {
  addRooms,
  getAllRooms,
  getRoom,
} from "../controllers/roomsControllers.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/usersControllers.js";
import {
  bookRoom,
  bookingsByUserId,
} from "../controllers/bookingController.js";
import { getAllBookings } from "../controllers/adminController.js";

const router = express.Router();

router.post("/addRooms", addRooms);
router.get("/getRooms", getAllRooms);
router.post("/getroombyid", getRoom);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/bookroom", bookRoom);
router.post("/getbookingsbyuserid", bookingsByUserId);
router.post("/cancelbooking", bookingsByUserId);
router.get("/getallbookings", getAllBookings);

export default router;
