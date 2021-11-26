import { useHistory } from "react-router-dom";
import { FaCheck, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import '../../index.css'

const OrderRow = ({order, deleteRecord, paymentReceived}) => { 
    const history = useHistory();
    
    const convertDatetime = (dt) => {
        const d = new Date(dt)
        return d.toLocaleString()
    }

    const editRecord = () => {
        history.push(`/editOrder/${order._id}`); 
    }
 

    return (
            <tr>
                <td className="col-md-1">{order.orderId}</td>
                <td className="col-md-1">{order.name}</td>
                <td className="col-md-1">{order.contact}</td>
                <td className="col-md-1">{order.address}</td>
                <td className="col-md-1">{order.deliveryOption.split(" ")[0]}</td>
                <td className="col-md-1">${order.amountPayable}</td>
                <td className="col-md-1">{convertDatetime(order.createdAt.toLocaleString())}</td>
                <td className="col-md-1">
                    {order.paymentReceived && <span className="badge rounded-pill bg-success">verified</span>}
                </td>
                <td className="col-md-1">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={(e) => paymentReceived(e, {_id: order._id, telegramId: order.telegramId})}
                        > <FaCheck />
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={editRecord}
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
 
export default OrderRow;