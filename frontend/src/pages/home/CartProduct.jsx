import {useState,useEffect} from "react"
import "../../App.css"
import axios from "axios"
axios.defaults.withCredentials=true
function CartProduct(){
const [cartId,setCartId]=useState(null)
const [cartProduct,setCartProduct]=useState([])
const [carts,setCarts]=useState([])
const cartsRow = carts.length > 0 ? carts[0] : {};
useEffect(()=>{
cartProduct.length>0 && setCartId(cartProduct[0].cart_id)
},[cartProduct])
useEffect(()=>{
axios.get(`${import.meta.env.VITE_API_URL}/cart/views`).then((res)=>{ setCartProduct(res.data.items)}).catch(err=> console.error(err))
},[])

const removeItem = (id) => {
  axios.delete(`${import.meta.env.VITE_API_URL}/itemRemove/${id}`).then((res) => {
      alert(res.data.message);
      setCartProduct(prev => prev.filter(item => item.cartItem_id !== id));
    })
    .catch(err => alert(err));
}

useEffect(()=>{
if(cartId){
axios.get(`${import.meta.env.VITE_API_URL}/carts/${cartId}`).then((res)=> setCarts(res.data)).catch(err=> console.error(err))
}
},[cartId])

const placeOrder=()=>{
axios.post(`${import.meta.env.VITE_API_URL}/placeOrder`,cartsRow).then((res)=> alert(res.data.message)).catch(err=> alert(err))
}

const totalAmount=cartProduct.reduce((acc,p)=> acc+ Number(p.price),0)
return (
<div>
<div className="d-flex">
<div className="row w-75 bg-white me-2">
{cartProduct.length>0 && cartProduct.map((p)=> {
let images = [];
try {
  images = JSON.parse(p.image_url);
} catch(e) {
  console.error("Invalid image_url", e);
}
const img = images.length > 0 ? images[0] : "";

return (
<div className="col-12 cart_div d-flex border-bottom" key={p.cartItem_id}>
<img src={`http://localhost:5000${img}`} className="cart_image ps-2 pt-1 "/>
<div className="cart_text ms-1">
<p className="p_name ">{p.name}</p>
<p className="p_price mb-0 ">&#8377;{p.price}</p>
<div className="d-flex text-center ms-2  mt-0 pt-0">
<p className="order-btn border px-1">SAVE FOR LATER</p>
<p className="order-btn border px-1" onClick={()=> removeItem(p.cartItem_id)}>REMOVE</p>
</div>
</div>
</div>
)})}
<button onClick={placeOrder}>place order</button>
</div>
<div className="w-25 text-center gap-2 bg-white  me-0 h-50">
<p>total price</p>
<p className="p_price">Total amount:&#8377;{totalAmount}</p>
<p className="order-btn">Safe and Secure Payments.Easy returns.100% Authentic products.</p>
</div>
</div>
</div>
)
}

export default CartProduct
