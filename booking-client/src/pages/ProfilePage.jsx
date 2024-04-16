import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

import Swal from "sweetalert2";

const { TabPane } = Tabs;

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfilePage;

export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/getbookingsbyuserid",
          {
            userId: user._id,
          }
        );
        console.log(response.data);
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        setError(error);
      }
    };

    fetchBookings();
  }, [user._id]);

  const cancelBooking = async (bookingId, roomId) => {
    try {
      setLoading(true);
      const result = await axios.post("/api/cancelbooking", {
        bookingId,
        roomId,
      });
      console.log(result);

      // Handle success
      setLoading(false);
      Swal.fire(
        "Success",
        "Your booking has been successfully canceled",
        "success"
      );

      // Optionally update UI to reflect the canceled booking without reloading the page
      // Example: Remove the canceled booking from the bookings list
    } catch (error) {
      // Handle error
      console.log(error);
      setLoading(false);
      Swal.fire(
        "Error",
        "Something went wrong while canceling your booking",
        "error"
      );
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        {loading && <Loader />}
        {bookings.map((booking) => (
          <div key={booking._id} className="bs">
            <h1>{booking.room}</h1>
            <p>BookingId: {booking._id}</p>
            <p>
              <b>CheckIn:</b> {booking.fromDate}
            </p>
            <p>
              <b>CheckOut:</b> {booking.toDate}
            </p>
            <p>
              <b>Amount:</b> {booking.totalAmount}
            </p>
            <p>
              <b>Status:</b>{" "}
              {booking.status === "booked" ? "CONFIRMED" : "CANCELLED"}
            </p>
            <div className="text-right">
              {booking.status !== "cancelled" && (
                <button
                  className="btn btn-primary"
                  onClick={() => cancelBooking(booking._id, booking.roomid)}>
                  CANCEL BOOKING
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
