import Order from "./Order"
import '../index.css'
import { useState } from 'react';
const axios = require('axios');

const OrderList = ({orders, setRequestData}) => { 

    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState("")

    const deleteRecord = (e, _id) => {
        e.stopPropagation();
        const answer = window.confirm("Would you like to delete order?");
        if (answer) {
            axios.delete(`https://swiftys-server.glitch.me/api/orders/deleteOrder/${_id}`)
                .then(res => {
                    setRequestData(new Date())
                    setAlert("Record deleted successfully")
                    setShowAlert(true)
                    setTimeout(function() { setShowAlert(false) }, 2000);
                }).catch(err => {
                    console.log(err)
                })
        }
    }


    const paymentReceived = (e, _id) => {
        e.stopPropagation();
        const answer = window.confirm("Would you like to mark payment as recieved?");
        if (answer) {
            // approve
            axios.post(`http://localhost:8080/api/v1/order/paymentReceived/${_id}`)
                .then(res => {
                    setRequestData(new Date())
                    setAlert("Payment Received!")
                    setShowAlert(true)
                    setTimeout(function() { setShowAlert(false) }, 2000);
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    return ( 
        <div className="blog-list">
            {showAlert && <div className="alert alert-primary" role="alert">
                {alert}
            </div>}
             <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                    <th>Order ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th> 
                    <th>Delivery Option</th>
                    <th>Promo Code</th>
                    <th>Amount Payable</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <Order order={order} key={order._id} deleteRecord={deleteRecord} paymentReceived={paymentReceived}/>
                ))}
                </tbody>
            </table>             
        </div>
     );
}
 
export default OrderList;