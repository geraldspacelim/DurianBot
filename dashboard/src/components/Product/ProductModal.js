import {Modal, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { useHistory  } from "react-router-dom";
import ProductSize from './ProductSize';
import "../../index.css"
const axios = require('axios');

const AddProductModal = ({handleClose, isShow}) => {
    const [name, setName] = useState("")
    const [details, setDetails] = useState([{size: 0, price: 0}])
    const [source, setSource] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory ();

    const updateDetails = (e, type, idx) => {
      let tempDetails = [...details]
      tempDetails[idx][type] = parseInt(e)
      setDetails(tempDetails)
    }

    const addDetails = () => {
      let tempDetails = [...details]
      tempDetails.push({size: 0, price: 0})
      setDetails(tempDetails)
    }

    const addProduct = (e) => {
      e.preventDefault()
      setIsLoading(true)
      const body = {
        name: name,
        source, source,
        details: details
      }
      axios.post("http://localhost:8080/api/v1/shop/addProducts", body).then(res => {
        setIsLoading(false)
        history.push ('/productHome')
      }).catch(err  => {
        console.log(err)
      })
    }

    return (
      
        <Modal
      show={isShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="loader" hidden={!isLoading}></div>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image Source</Form.Label>
                <Form.Control type="text" placeholder="Enter Souce" required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                />
            </Form.Group>


            {details.map((d, idx) => (
              <ProductSize d={d} idx={idx} updateDetails={updateDetails} addDetails={addDetails}/>
            ))}
            
            <Modal.Footer>
              <Button variant="danger" onClick={(e) => {
                setName("")
                setSource("")
                setDetails([{size: 0, price: 0}])
                handleClose()
              }}>Close</Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                      Submit
                  </Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      
    </Modal>
    )
}

export default AddProductModal;