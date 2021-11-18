import { Link } from 'react-router-dom'; 
import { FaMinus, FaPlus } from "react-icons/fa";

const Product = ({order, idx, products, deleteOrder, handleOpen}) => {
    return (  
        
        <div className="row">
            <div className="col"> 
                <input
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={order.package}
                    readOnly
                >
                </input>
                 </div>
                 <div className="col">
                 <input
                        className="form-control"
                        id="exampleFormControlSelect1"
                        value={order.size}
                        readOnly
                    >
                    </input> 
                 </div>
                    
                <div className="col"> 
                 <input  type="number"
                    required
                    className="form-control"
                    value={order.quantity}
                    readOnly
                    />
                </div>
                <div className="col">
                    <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => deleteOrder(e, idx)}
                        > <FaMinus />
                    </button>
                    <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleOpen}
                        > <FaPlus />
                    </button>
                </div>
              
             </div>
    );
}
 
export default Product;