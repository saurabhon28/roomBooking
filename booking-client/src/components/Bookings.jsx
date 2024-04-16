import { useEffect, useState } from "react";

import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          "http://localhost:5000/api/getallbookings"
        );
        console.log(data.data);
        setBookings(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {bookings.length && <h1>There are total {bookings.length} bookings</h1>}
        {error && <Error />}
      </div>
    </div>
  );
}

export default Bookings;
