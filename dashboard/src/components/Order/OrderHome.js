import OrderList from './OrderList';
import { useState, useEffect } from 'react';
const axios = require('axios');


const OrderHome = () => {
    const [orders, setOrders] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [requestData, setRequestData] = useState(new Date())
    
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/order/")
            .then(res => {
                setOrders(res.data)
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
            })
    }, [requestData])

    return ( 
        <div className="home">
            <div className="loader" hidden={!isLoading}></div>
            {orders && <OrderList orders={orders} setRequestData={setRequestData}/>}
        </div>
     );
}
 
export default OrderHome;