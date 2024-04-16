import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

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
  const [booking, setBookings] = useState([]);
  const [loading, setLoading] = useState(false); // Initialized as true
  const [error, setError] = useState(); // Initialized as false

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await axios.post(
          "http://localhost:5000/api/getbookingsbyuserid",
          {
            userid: user._id,
          }
        );
        console.log(data);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
        setError(error);
      }
    };

    fetchRooms(); // Call the async function immediately
  }, [user._id]);

  const cancelBooking = async (bookingId, roomId) => {
    try {
      setLoading(true);
      const result = await axios.post("/api/cancelbooking", {
        bookingId,
        roomId,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        {loading && <Loader />}
        {booking &&
          ((booking) => {
            <div className="bs">
              <h1>{booking.room}</h1>
              <p>BookingId: {booking._id}</p>
              <p>
                <b>CheckIn:</b> {booking.fromDate}
              </p>
              <p>
                <b>CheckOut:</b>
                {booking.toDate}
              </p>
              <p>
                <b>Amount:</b> {booking.totalAmount}
              </p>
              <p>
                <b>Status:</b>
                {booking.status == "booked" ? "CONFIRMED" : "CANCELLED"}
              </p>
              <div className="text-right">
                <button
                  className="btn btn-primary"
                  onClick={() => cancelBooking(booking._id, booking.roomid)}>
                  CANCEL BOOKING
                </button>
              </div>
            </div>;
          })}
      </div>
    </div>
  );
}
