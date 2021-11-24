import PromoList from './PromoList';
import { useState, useEffect } from 'react';
const axios = require('axios');


const PromoHome = () => {
    const [promos, setPromos] = useState(null)
    const [_id, set_id] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [requestData, setRequestData] = useState(new Date())
    
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/shop/")
            .then(res => {
                setPromos(res.data[0].promos)
                set_id(res.data[0]._id)
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
            })
    }, [requestData])

    return ( 
        <div className="home">
            <div className="loader" hidden={!isLoading}></div>
            {promos && <PromoList promos={promos} setRequestData={setRequestData} _id={_id}/>}
        </div>
     );
}
 
export default PromoHome;