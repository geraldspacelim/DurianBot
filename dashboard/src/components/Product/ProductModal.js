import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ProductVariance from "./ProductVariance";
import "../../index.css";
const axios = require("axios");

const AddProductModal = ({ handleClose, isShow, _id }) => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState([{ size: "", price: "" }]);
  const [source, setSource] = useState("");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const updateDetails = (e, type, idx) => {
    let tempDetails = [...details];
    if (type === "price") {
      e = parseInt(e);
    }
    tempDetails[idx][type] = e;
    setDetails(tempDetails);
  };

  const addDetails = () => {
    let tempDetails = [...details];
    tempDetails.push({ size: "", price: "" });
    setDetails(tempDetails);
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (window.confirm("Confirm add new product?")) {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("name", name);
      formData.append("caption", caption);
      formData.append("image", source);
      formData.append("details", JSON.stringify(details));

      axios
        .post(
          "http://159.223.69.13:8080/api/v1/shop/newProductCollection/" + _id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setIsLoading(true);
          handleClose(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Modal
      show={isShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Caption"
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image Upload</Form.Label>
            <input
              required
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
              required
              onChange={(e) => setSource(e.target.files[0])}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Size</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Price</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState"></Form.Group>
          </Row>

          {details.map((d, idx) => (
            <ProductVariance
              d={d}
              idx={idx}
              key={idx}
              updateDetails={updateDetails}
              addDetails={addDetails}
            />
          ))}

          <Modal.Footer />
          <div className="edit-submit">
            <Button
              variant="danger"
              onClick={(e) => {
                setName("");
                setCaption("");
                setSource("");
                setDetails([{ size: "", price: "" }]);
                handleClose(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
