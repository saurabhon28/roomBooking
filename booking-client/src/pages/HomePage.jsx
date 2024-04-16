import { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from "antd";
import moment from "moment";

//use library from antd date picker
const { RangePicker } = DatePicker;

function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); // Initialized as true
  const [error, setError] = useState(false); // Initialized as false
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [dublicateRooms, setDublicateRooms] = useState([]);
  const [availability, setAvailbility] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/getRooms");
        setRooms(data.data); // assuming 'data' structure is { data: [] }
        setDublicateRooms(data.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);
  //filter date function
  const filterByDate = (dates) => {
    console.log(dates);
    setFromDate(moment(dates[0]).format("MMMM Do YYYY"));
    setToDate(moment(dates[1]).format("MMMM Do YYYY"));

    var temprooms = [];

    for (const room of dublicateRooms) {
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (
            !moment(
              moment(dates[0])
                .format("MMMM Do YYYY")
                .isBetween(booking.fromDate, booking.toDate)
            ) &&
            !moment(
              moment(dates[1])
                .format("MMMM Do YYYY")
                .isBetween(booking.fromDate, booking.toDate)
            )
          ) {
            if (
              moment.dates[0].format("MMMM Do YYYY") !== booking.fromDate &&
              moment.dates[0].format("MMMM Do YYYY") !== booking.toDate &&
              moment.dates[1].format("MMMM Do YYYY") !== booking.fromDate &&
              moment.dates[1].format("MMMM Do YYYY") !== booking.toDate
            ) {
              setAvailbility(true);
            }
          }
        }
      }
      if (availability == true || room.currentBookings.length == 0) {
        temprooms.push(room);
      }
      setRooms(temprooms);
    }
  };

  const filterBySearch = () => {
    const temprooms = dublicateRooms.filter((room) =>
      room.name.toLoweCase().includes(searchKey.toLowerCase())
    );
    setRooms(temprooms);
  };

  const filterByType = (e) => {
    setType(e);
    if (e !== "all") {
      const tempRooms = dublicateRooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );

      setRooms(tempRooms);
    }
    setRooms(dublicateRooms);
  };

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5 mx-3">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
            className="form-control"
            placeholder="search rooms"
          />
        </div>
        <div className="col-md-3 ">
          <select className="form-control" value={type} onChange={filterByType}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="col-md-9 mt-2">
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        ) : error ? (
          <Error />
        ) : null}{" "}
        {/* Added null as fallback */}
      </div>
    </div>
  );
}

export default HomePage;
