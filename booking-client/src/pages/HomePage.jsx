import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [dublicateRooms, setDublicateRooms] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/getRooms");
        setRooms(data.data);
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

  const filterByDate = (dates) => {
    setFromDate(moment(dates[0]).format("MMMM Do YYYY"));
    setToDate(moment(dates[1]).format("MMMM Do YYYY"));

    let tempRooms = [];

    for (const room of dublicateRooms) {
      let isAvailable = true;

      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (
            moment(dates[0]).isBetween(booking.fromDate, booking.toDate) ||
            moment(dates[1]).isBetween(booking.fromDate, booking.toDate)
          ) {
            isAvailable = false;
            break;
          }
        }
      }

      if (isAvailable || room.currentBookings.length === 0) {
        tempRooms.push(room);
      }
    }
    setAvailability(tempRooms.length > 0);
    setRooms(tempRooms);
  };

  const filterBySearch = () => {
    const tempRooms = dublicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  };

  const filterByType = (e) => {
    setType(e);
    if (e !== "all") {
      const tempRooms = dublicateRooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(dublicateRooms);
    }
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
            placeholder="Search rooms"
          />
        </div>
        <div className="col-md-3 ">
          <select
            className="form-control"
            value={type}
            onChange={(e) => filterByType(e.target.value)}>
            <option value="all">All</option>
            <option value="delux">Deluxe</option>
            <option value="non-delux">Non-Deluxe</option>
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
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
