import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";


const AddProductModal = ({handleClose, isShow, products, addProduct}) => {
    const [isPackage, setIsPackage] = useState(false)
    const [name, setName] = useState("")
    const [caption, setCaption] = useState("")
    const [details, setDetails] = useState([])
    const [source, setSource] = useState("")

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
          <Form>
            <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image Source</Form.Label>
                <Form.Control type="text" placeholder="Enter Souce" required/>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}  md="5" controlId="formGridCity">
                <Form.Label>Size (g/kg) </Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="formGridState">
                <Form.Label>Price ($)</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
              <Form.Label>&nbsp;</Form.Label>
                <Button style={{display:'block'}} variant="success"> <FaPlus /></Button>
              </Form.Group>

            </Row>
            
            <Modal.Footer>
              <Button onClick={(e) => {
                handleClose()
              }}>Close</Button>
              <Button variant="primary" type="submit">
                      Submit
                  </Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      
    </Modal>
    )
}

export default AddProductModal;