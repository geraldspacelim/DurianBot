import {Modal, Form, ModalBody, ModalHeader, ModalTitle, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';

const AddOrderModal = ({handleClose, isShow, products}) => {
    const [name, setName] = useState("")
    const [sizes, setSizes] = useState([])
    const [size, setSize] = useState(0)
    const [quantity, setQuantity] = useState(0)

    return (
        <Modal
      show={isShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Package
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="modal-select">
            <select
                className="form-control"
                id="exampleFormControlSelect1"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                    const currObj = products.find(o => o.name === e.target.value);
                    setSizes(currObj.details)
                }}
            >
                {products.map((option, idx) => <option key={idx}>{option.name}</option>)}
            </select>
          </div>
     
          <div className="modal-select">
            <select
                className="form-control"
                id="exampleFormControlSelect1"
                value={size}
                onChange={(e) => {
                    if (e.target.value.includes("Package")) {
                        setSize("N.A.")
                    } else {
                        setSize(e.target.value)}
                    }}
            >
                {sizes.map((option, idx) => <option key={idx}>{option.size}</option>)}
            </select>
          </div>
          <div className="modal-select">
             <input  type="number"
                min={1}
                required
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
          </div>
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default AddOrderModal;