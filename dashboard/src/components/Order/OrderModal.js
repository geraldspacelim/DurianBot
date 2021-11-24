import {Modal, Button, Form} from 'react-bootstrap';
import { useState } from 'react';


const OrderModal = ({handleClose, isShow, products, addToCart}) => {
    const [name, setName] = useState("")
    const [currentPackage, setCurrentPackage] = useState(null)
    const [size, setSize] = useState(0)
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [enableOtherFields, setEnableOtherFields] = useState(true)

    // const SubmitForm ()

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
      <Form>
      <label>Name: </label>
          <div className="modal-select">
            <select
                className="form-control"
                id="exampleFormControlSelect1"
                value={name}
                required
                onChange={(e) => {
                      setName(e.target.value)
                      const currObj = products.find(o => o.name === e.target.value);
                      setCurrentPackage(currObj)
                      setEnableOtherFields(false)
                }}
            >
                <option hidden >-- Select Option --</option>
              {products.map((option, idx) => <option key={idx}>{option.name}</option>)}
            </select>
          </div>
          <div className="row">
          <div className="col"> 
          <label>Size: </label>
          <div className="modal-select">
            <select
                disabled={enableOtherFields}
                className="form-control"
                required
                id="exampleFormControlSelect1"
                value={size}
                onChange={(e) => {
                  
                    if (e.target.value.includes("Package")) {
                        setSize("N.A.")
                    } else {
                        setSize(e.target.value)
                      }
                      setPrice(currentPackage.details[e.target.options.selectedIndex - 1].price)
                    }
                  }
            >
                <option hidden ></option>
                {currentPackage && currentPackage.details.map((option, idx) => <option key={idx}>{option.size}</option>)}
            </select>
          </div>
          </div>
          <div className="col"> 
          <label>Quantity: </label>

          <div className="modal-select">
             <input  type="number"
                disabled={enableOtherFields}
                min={1}
                required
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
          </div>
          </div>
          </div>
          </Form>
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => {
          setName("")
          setSize(0)
          setQuantity(1)
          setEnableOtherFields(true)
          handleClose()
        }}>Close</Button>
        <Button onClick={(e) => {
          const order = {
            "package": name, 
            "size": size, 
            "quantity": quantity, 
            "price": price
          }
          setName("")
          setSize(0)
          setQuantity(1)
          setEnableOtherFields(true)
          addToCart(e, order)}}>Save</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default OrderModal;