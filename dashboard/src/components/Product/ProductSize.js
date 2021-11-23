import { useState,} from 'react';
import { Button, Form, Row, Col} from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";


const ProductSize = ({d, idx, updateDetails, addDetails}) => {

    return (
        <Row className="mb-3">
              <Form.Group as={Col}   controlId="formGridCity">
                <Form.Label>Size (g) </Form.Label>
                <Form.Control min={0} type="number" value={d.size} onChange={(e) => updateDetails(e.target.value, "size", idx)}/>
              </Form.Group>

              
              <Form.Group as={Col}  controlId="formGridState">
                <Form.Label>Price ($)</Form.Label>
                <Form.Control min={0} type="number" value={d.price} onChange={(e) => updateDetails(e.target.value, "price", idx)}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
              <Form.Label>&nbsp;</Form.Label>
                <Button style={{display:'block'}} variant="success" onClick={addDetails}> <FaPlus /></Button>
              </Form.Group>

            </Row>
    )
}

export default ProductSize;