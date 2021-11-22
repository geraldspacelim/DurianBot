import {Modal, Button, Form} from 'react-bootstrap';
import { useState } from 'react';


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
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => {
          handleClose()
        }}>Close</Button>
        <Button onClick={(e) => {
          addProduct(e)}}>Save</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default AddProductModal;