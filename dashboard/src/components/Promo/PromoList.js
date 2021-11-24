import PromoRow from "./PromoRow"
import PromoModal from "./PromoModal"
import { useState, useEffect } from 'react';
const axios = require('axios');

const PromoList  = ({promos, setRequestData, _id}) => {
    
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState("")
    const [show, setShow] = useState(false)

    const deletePromo = (e, body) => {
        e.stopPropagation();
        const answer = window.confirm("Confirm delete this promo?");
        if (answer) {
            axios.post(`http://localhost:8080/api/v1/shop/deletePromo/` + _id, body)
                .then(res => {
                    setRequestData(new Date())
                    setAlert("Promo deleted successfully")
                    setShowAlert(true)
                    setTimeout(function() { setShowAlert(false) }, 2000);
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleOpen = () => {
        setShow(true)
    }

    return (
        <div className="package-list">
            {showAlert && <div className="alert alert-primary" role="alert">
                {alert}
            </div>}
            <PromoModal handleClose={handleClose} isShow={show} _id={_id}/>
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {promos.map((promo, index) => (
                    <PromoRow promo={promo} key={index} deletePromo={deletePromo} handleOpen={handleOpen}/>
                ))}
                </tbody>
            </table>             
        </div> 
    )
}

export default PromoList