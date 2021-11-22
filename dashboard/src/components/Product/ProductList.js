import ProductRow from "./ProductRow"
import { useState, useEffect } from 'react';
const axios = require('axios');

const PackageList  = ({products, setRequestData}) => {
    
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState("")

    const deleteProduct = (e, body) => {
        e.stopPropagation();
        const answer = window.confirm("Deleting this will delete its collection, continue?");
        if (answer) {
            axios.delete(`https://swiftys-server.glitch.me/api/shop/deleteProduct`, body)
                .then(res => {
                    setRequestData(new Date())
                    setAlert("Product deleted successfully")
                    setShowAlert(true)
                    setTimeout(function() { setShowAlert(false) }, 2000);
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    const addProduct = () => {
        console.log("add product")
    }

    return (
        <div className="package-list">
            {showAlert && <div className="alert alert-primary" role="alert">
                {alert}
            </div>}
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                    <th>Name</th>
                    <th>Caption</th>
                    <th>Size</th>
                    <th>Price</th> 
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    product.details.map((detail) => (
                         <ProductRow product={product} detail={detail} deleteProduct={deleteProduct} addProduct={addProduct}/>
                    ))
                ))}
                </tbody>
            </table>             
        </div> 
    )
}

export default PackageList