import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function Order({ product }) {
  const [cartId, setCartId] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  const addCart = (qty) => {
    const newProduct = {
      product_id: product.product_id,
      price: product.price,
      qty: qty,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/cart/add`, newProduct)
      .then((res) => {
setCartId(res.data);
alert(res.data.message);})
      .catch((err) => console.error(err));

    axios
      .get(`${import.meta.env.VITE_API_URL}/cart/views`)
      .then((res) => setCartProducts(res.data.items))
      .catch((err) => console.error(err));
  };

const orderPlace=()=>{
console.log("nsjim")
}

  return (
    <div>
      <div className="row text-center fixed-bottom mb-0 pb-0 place_order">
        <div className="dropdown col">
          <a
            className="btn btn-secondary"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
style={{backgroundColor:"white",color:"black",border:"none"}}
          >
            add to cart
          </a>

          <ul className="dropdown-menu">
            <li onClick={() => addCart(1)}>qty:1</li>
            <li onClick={() => addCart(2)}>qty:2</li>
            <li onClick={() => addCart(3)}>qty:3</li>
          </ul>
        </div>

        <button
          className="col border border-none"
          style={{ backgroundColor: "#FFC500" }}
          onClick={orderPlace}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Order;
