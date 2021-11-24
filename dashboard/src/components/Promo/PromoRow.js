import { useState, useEffect } from 'react';
import { FaPlus, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
const axios = require('axios');

const PromoRow = ({promo, deletePromo, handleOpen}) => {
    return (
        <tr>
            <td className="col-md-2">{promo.code}</td>
            <td className="col-md-2">{promo.discount} %</td>
            <td className="col-md-2">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleOpen}
                        > <FaPlus  />
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => {deletePromo(e, {code : promo.code})}}
                        > <FaTrashAlt  />
                        </button>
            </td>
        </tr>
    )
}

export default PromoRow