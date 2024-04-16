import axios from "axios";
import { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

function AddRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [rentPerDay, setRentPerDay] = useState();
  const [maxCount, setMaxCount] = useState();
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [type, setType] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");

  const addRoomHandle = async (e) => {
    e.preventDefault();
    const newRoom = {
      name,
      rentPerDay,
      maxCount,
      description,
      phoneNumber,
      type,
      imageUrls: [imageUrl1, imageUrl2, imageUrl3],
    };
    try {
      setLoading(true);
      const result = await axios.post(
        "http://localhost:5000/api/addnewroom",
        newRoom
      );
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats", "Your New Room Added Successfully", "success").then(
        (result) => {
          window.location.href = "/home";
        }
      );
    } catch (error) {
      console.log(error);
      setError(false);
      setLoading(false);
      Swal.fire("Oops", "Something went Wrong", "faliure");
    }
  };

  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Room Name"
        />
        <input
          type="number"
          value={rentPerDay}
          onChange={(e) => setRentPerDay(e.target.value)}
          className="form-control"
          placeholder="Rent Per Day"
        />
        <input
          type="number"
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.value)}
          className="form-control"
          placeholder="Max Count"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Description"
        />
        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="form-control"
          placeholder="Phone-Number"
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="form-control"
          placeholder="Type"
        />
        <input
          type="text"
          value={imageUrl1}
          onChange={(e) => setImageUrl1(e.target.value)}
          className="form-control"
          placeholder="Image URL 1"
        />
        <input
          type="text"
          value={imageUrl2}
          onChange={(e) => setImageUrl2(e.target.value)}
          className="form-control"
          placeholder="Image URL 2"
        />
        <input
          type="text"
          value={imageUrl3}
          onChange={(e) => setImageUrl3(e.target.value)}
          className="form-control"
          placeholder="Image URL 3"
        />

        <div className="text-right mt-2">
          <button className="btn btn-primary" onClick={addRoomHandle}>
            Add Room
          </button>
        </div>
        {error && <Error />}
      </div>
    </div>
  );
}

export default AddRoom;
