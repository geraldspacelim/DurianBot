import { useState, useEffect } from 'react';
import { FaPlus, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
const axios = require('axios');

const ProductRow = ({product, detail, index, deleteProduct, addProduct}) => {
    return (
        <tr>
            <td className="col-md-2">{product.name}</td>
            <td className="col-md-2">{product.caption}</td>
            <td className="col-md-2">{detail.size}</td>
            <td className="col-md-2">${detail.price}</td>
            <td className="col-md-2">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={addProduct}
                        > <FaPlus  />
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => {deleteProduct(e, {"name": product.name, "size": detail.size})}}
                        > <FaTrashAlt  />
                        </button>
            </td>
        </tr>
    )
}

export default ProductRow