import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getRooms");
        console.log(response.data.data);
        setRooms(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Rooms</h1>
        {loading && <Loader />}
        {!loading && !error && (
          <>
            <table className="table table-bordered table-dark">
              <thead className="bs thead-dark">
                <tr>
                  <th>Room ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Rent Per Day</th>
                  <th>Max Count</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentPerDay}</td>
                    <td>{room.maxCount}</td>
                    <td>{room.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1>There are total {rooms.length} rooms</h1>
          </>
        )}
        {error && <Error />}
      </div>
    </div>
  );
}
