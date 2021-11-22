import ProductList from './ProductList';
import { useState, useEffect } from 'react';
const axios = require('axios');


const ProductHome = () => {
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [requestData, setRequestData] = useState(new Date())
    
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/shop/")
            .then(res => {
                setProducts(res.data[0].products)
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
            })
    }, [requestData])

    return ( 
        <div className="home">
            <div className="loader" hidden={!isLoading}></div>
            {products && <ProductList products={products} setRequestData={setRequestData}/>}
        </div>
     );
}
 
export default ProductHome;