import {useState,useEffect} from "react"
import ".././App.css"
import axios from "axios"
axios.defaults.withCredentials=true;
function AllListing(){
const [products,setProducts]=useState([])
useEffect(()=>{
axios.get(`${import.meta.env.VITE_API_URL}/products`).then(res=> setProducts(res.data)).catch(err=> console.error(err))
},[])

return (
<div>
<h2>All Product</h2>
<div className="d-flex flex-wrap">
{products.map((p)=>{
const images=JSON.parse(p.image_url)
const image=images[0]
return (
<div className="card">
<h2>{p.name}</h2>
<h5>{p.description}</h5>
<img src={`http://localhost:5000${image}`} />
</div>
)
})}
</div>
</div>
)}


export default AllListing

