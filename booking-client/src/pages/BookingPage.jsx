import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

function BookingPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const roomId = params.roomid;
  const fromDate = moment(params.fromDate, "MMMM Do YYYY");
  const toDate = moment(params.toDate, "MMMM Do YYYY");

  const totalDays = moment.duration(toDate.diff(fromDate)).asDays();
  const [totalAmount, setTotalAmount] = useState();
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.reload("/login");
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("http://localhost:5000/api/getroombyid", {
            roomid: roomId,
          })
        ).data.data;
        setTotalAmount(data.rentPerDay * totalDays);
        console.log(data);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const bookRoom = async () => {
    const bookRoomDetails = {
      room,
      userId,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
    };

    try {
      const result = await axios.post(
        "http://localhost:5000/api/bookroom",
        bookRoomDetails
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : error ? (
        <Error />
      ) : (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5 mx-5">
              <h1>{room.name}</h1>
              <img className="bigImage" src={room.imageUrls[0]} alt="image" />
            </div>
            <div style={{ textAlign: "right" }} className="col-md-5 mx-5">
              <h1>Booking Details</h1>
              <hr />
              <div>
                <b>
                  <p>Name: </p>
                  <p>From Date: {params.fromDate} </p>
                  <p>To Date: {params.toDate}</p>
                  <p>Max Count : {room.maxCount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1 className="mt-1 text-bold">Amount</h1>
                <hr />
                <b>
                  <p>Total Days: {totalDays}</p>
                  <p>Rent Per Day: {room.rentPerDay}</p>
                  <p>Total Amount : {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
