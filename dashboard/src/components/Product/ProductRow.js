import { useState, useEffect } from 'react';
const axios = require('axios');

const ProductRow = ({product}) => {
    
    const {size, setSize} = useState(0)
    const {price, setPrice} = useState(0)

    return (
        <tr>
            <td className="col-md-2">{product.name}</td>
            <td className="col-md-2">{product.caption}</td>

            <td className="col-md-2">
                <select
                value={size}
                onChange={(e) => setPrice(e.target.value)}
            >
                {product.details.map((option, idx) => <option key={idx}>{option.size}</option>)}
            </select>
            </td>
            <td className="col-md-2">
            <td className="col-md-2">{price}</td>

            </td>
        </tr>
    )
}

export default ProductRow