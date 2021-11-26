import { useState,} from 'react';
import { Button, Form, Row, Col} from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";


const ProductVariance = ({d, idx, updateDetails, addDetails}) => {

    return (
        <Row className="mb-3">
              <Form.Group as={Col}   controlId="formGridCity">
                <Form.Control required placeholder="100g" type="text" value={d.size} onChange={(e) => updateDetails(e.target.value, "size", idx)}/>
              </Form.Group>

              
              <Form.Group as={Col}  controlId="formGridState">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input class="form-control" id="inlineFormInputGroupUsername2" placeholder="28" type="number" value={d.price} required onChange={(e) => updateDetails(e.target.value, "price", idx)}/>
              </div>
                
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Button variant="success" onClick={addDetails}> <FaPlus /></Button>
              </Form.Group>

            </Row>
    )
}

export default ProductVariance;