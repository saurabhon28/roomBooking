import { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img className="smallImg" src={room.imageUrls[0]} alt="room-image" />
      </div>
      <div className="col-md-7 mx-auto">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count: {room.maxCount}</p>
          <p>Phone Number: {room.phoneNumber}</p>
          <p>Type: {room.type}</p>
        </b>

        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}

          <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
            <button className="btn btn-primary m-2">Book Now</button>
          </Link>
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                {" "}
                <img
                  className="d-block w-100 bigImage"
                  src={url}
                  alt={`Slide ${index}`} // Use index to ensure unique alt text
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
