import ProductList from "./ProductList";
import { useState, useEffect } from "react";
const axios = require("axios");

const ProductHome = () => {
  const [products, setProducts] = useState(null);
  const [_id, set_id] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [requestData, setRequestData] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://159.223.69.13:8080/api/v1/shop/")
      .then((res) => {
        setProducts(res.data[0].products);
        set_id(res.data[0]._id);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [requestData]);

  return (
    <div className="home">
      <div className="loader" hidden={!isLoading}></div>
      {products && (
        <ProductList
          products={products}
          setRequestData={setRequestData}
          _id={_id}
        />
      )}
    </div>
  );
};

export default ProductHome;
