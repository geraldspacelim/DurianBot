import ProductRow from "./ProductRow"
import { useState, useEffect } from 'react';
const axios = require('axios');

const PackageList  = ({products, setRequestData}) => {
    
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState("")

    const deleteRecord = (e, _id) => {
        e.stopPropagation();
        const answer = window.confirm("Would you like to delete order?");
        if (answer) {
            axios.delete(`https://swiftys-server.glitch.me/api/shop/`)
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
                    <ProductRow product={product} key={index} deleteRecord={deleteRecord}/>
                ))}
                </tbody>
            </table>             
        </div> 
    )
}

export default PackageList