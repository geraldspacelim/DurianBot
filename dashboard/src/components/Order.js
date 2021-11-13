import { useHistory } from "react-router-dom";
import { FaCheck, FaPencilAlt, FaTrashAlt, FaTelegramPlane } from "react-icons/fa";
import '../index.css'

const Order = ({order, deleteRecord, paymentReceived}) => { 
    const history = useHistory();
    
    const handleRowClick = () => {
      history.push(`/invoice/${order.orderId}`);
    }
    
    const convertDatetime = (dt) => {
        const d = new Date(dt)
        return d.toLocaleString()
    }

    const editRecord = (e) => {
        e.stopPropagation();
        history.push(`/record/${order.orderId}`); 
    }
 

    return (
            <tr onClick={handleRowClick}>
                <td className="col-md-1">{order.orderId}</td>
                <td className="col-md-1">{order.name}</td>
                <td className="col-md-1">{order.contact}</td>
                <td className="col-md-1">{order.address}</td>
                <td className="col-md-1">{order.deliveryOption.split(" ")[0]}</td>
                <td className="col-md-1">{order.promoCode}</td>
                <td className="col-md-1">${order.amountPayable}</td>
                <td className="col-md-1">{convertDatetime(order.createdAt.toLocaleString())}</td>
                <td className="col-md-1">
                    {order.paymentReceived && <span className="badge rounded-pill bg-success">verified</span>}
                </td>
                <td className="col-md-1">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={(e) => paymentReceived(e, order._id)}
                        > <FaCheck />
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={FaTelegramPlane}
                        > <FaPencilAlt  />
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => {deleteRecord(e, order._id)}}
                        > <FaTrashAlt  />
                        </button>
                </td>
            </tr>
     );
}
 
export default Order;