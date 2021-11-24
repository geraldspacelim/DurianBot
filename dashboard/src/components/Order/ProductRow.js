import { FaMinus, FaPlus } from "react-icons/fa";
import '../../index.css'

const ProductRow = ({order, idx, deleteOrder, handleOpen}) => {
    return (  
        
        <div className="row row-product">
            <div className="col-4"> 
                <input
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={order.package}
                    readOnly
                >
                </input>
                 </div>
                 <div className="col-2">
                 <input
                        className="form-control"
                        id="exampleFormControlSelect1"
                        value={order.size}
                        readOnly
                    >
                    </input> 
                 </div>
                    
                <div className="col-2"> 
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
 
export default ProductRow;