import AddOrderModal from "./AddOrderModal"
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Product from "./Product"
const axios = require('axios');

const EditOrder = () => {
    const { id } = useParams();
    const [name, setName] = useState("")
    const [contact, setContact] = useState(0)
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [deliveryOption, setDeliveryOption] = useState([])
    const [orders, setOrders] = useState(null)
    const [amountPayable, setAmountPayable] = useState(0)
    const [promoCode, setPromoCode] = useState("")
    const [promos, setPromos] = useState([])
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [show, setShow] = useState(false)
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/order/getOrder/${id}`)
            .then(res => {
                setName(res.data.name)
                setContact(res.data.contact)
                setAddress(res.data.address)
                setEmail(res.data.email)
                setDeliveryOption(res.data.deliveryOption)
                setOrders(res.data.orders)
                setAmountPayable(res.data.amountPayable)
                axios.get(`http://localhost:8080/api/v1/shop/`)
                .then(res => {
                    setPromos(res.data[0].promos)
                    setDeliveryOptions(res.data[0].deliveryOptions)
                    setProducts(res.data[0].products)
                    setIsLoading(false)
                })
            }).catch(err => {
                console.log(err)
            })
    },[])

    const deleteOrder = (e,idx) => {
        let tempCart = [...orders]
        tempCart.splice(idx, 1);
        setOrders(tempCart)
    }

    const addOrder = () => {
        console.log("ad")
    }

    const calculateNewPayableAmt = () => {
        console.log("test")
    }

    const submitChanges = () => {
        // e.preventDefault()
        // console.log("hi")
    }

    const handleClose = () => {
        setShow(false )
    }

    const handleOpen = () => {
        setShow(true)
    }

    return ( 
        <div className="container">
        <AddOrderModal handleClose={handleClose} isShow={show} products={products}/>
        <div className="loader" hidden={!isLoading}></div>
            {orders && <form>
                <div className="form-group">
                    <div className="row">
                        <div className="col"> 
                        <label>Name: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col"> 
                        <label>Contact: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                    <div className="col"> 
                        <label>Email: </label>
                        <input  type="email"
                            required
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className="col"> 
                        <label>Delivery Option: </label>
                        <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                    >
                        {deliveryOptions.map((option, idx) => <option key={idx}>{option.mode}</option>)}
                    </select>
                    </div>
                </div>
                </div>
                
                <div className="form-group"> 
                <label>Address: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col"> 
                            <label>Amount Payble: </label>
                            <input  type="number"
                                readOnly
                                className="form-control"
                                value={`${amountPayable.toFixed(2)}`}
                                />
                        </div>
                        <div className="col"> 
                            <label>Promo Code </label>
                            <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        >
                            {promos.map((option, idx) => <option key={idx}>{option.code}</option>)}
                        </select>
                        </div>
                </div>
               
                </div>
                {orders.map((order, idx) => {
                    return (<Product order={order} products={products} key={idx} idx={idx} deleteOrder={deleteOrder} handleOpen={handleOpen}/>
                )})}
                <button type="button" 
                onClick={submitChanges()}
                value="Add Product"
                className="btn btn-primary"
                > Edit Order
                </button>
        </form>}
        </div>
     );
}
 
export default EditOrder;