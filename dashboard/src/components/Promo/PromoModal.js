import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../index.css";
const axios = require("axios");

const PromoModal = ({ handleClose, isShow, _id }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const addPromo = (e) => {
    e.preventDefault();
    if (window.confirm("Confirm add new promo?")) {
      setIsLoading(true);
      const body = {
        code: code,
        discount: parseInt(discount),
      };
      axios
        .post("http://159.223.69.13:8080/api/v1/shop/addPromo/" + _id, body)
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
        <Modal.Title id="contained-modal-title-vcenter">Add Promo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addPromo}>
          <Form.Group className="mb-3">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Code </Form.Label>
                <Form.Control
                  placeholder="PROMOCODE"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Discount</Form.Label>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">
                      %
                    </span>
                  </div>
                </div>
              </Form.Group>
            </Row>
          </Form.Group>

          <Modal.Footer />
          <div className="edit-submit">
            <Button
              variant="danger"
              onClick={(e) => {
                setCode("");
                setDiscount(0);
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

export default PromoModal;
