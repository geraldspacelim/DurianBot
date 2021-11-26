import ProductRow from "./ProductRow"
import AddProductModal from "./ProductModal"
import { useState, useEffect } from 'react';
const axios = require('axios');

const PackageList  = ({products, setRequestData, _id}) => {
    
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState("")
    const [show, setShow] = useState(false)

    const deleteProduct = (e, body) => {
        e.stopPropagation();
        const answer = window.confirm("Deleting this will delete its collection, continue?");
        if (answer) {
            axios.post(`http://localhost:8080/api/v1/shop/deleteProductCollection/` + _id, body)
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

    const handleClose = (isEdit) => {
        setShow(false)
        if (isEdit) {
            setRequestData(new Date())
            setShowAlert(true)
            setAlert("Product Added")
            setTimeout(function() { setShowAlert(false) }, 2000);
        } 
    }

    const handleOpen = () => {
        setShow(true)
    }

    return (
        <div className="package-list">
            {showAlert && <div className="alert alert-primary" role="alert">
                {alert}
            </div>}
            <AddProductModal handleClose={handleClose} isShow={show} products={products} _id={_id}/>
            <table className="table table-dark table-hover table-sm">
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
                         <ProductRow product={product} detail={detail} deleteProduct={deleteProduct} handleOpen={handleOpen}/>
                    ))
                ))}
                </tbody>
            </table>             
        </div> 
    )
}

export default PackageList