import {useLocation} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
function Subcategory(){
const [subcategories,setSubcategories]=useState([])
const location=useLocation()
const filterProducts=location.state?.filterP
if(!filterProducts) return <p>products not found</p>



return (
<div className="row mx-0">
{filterProducts.map((p)=>{
const images=JSON.parse(p.image_url)
const img=images[0]

return (
<div className=" card card_img col-6 col-md-4 subcate_div">
<img src={`http://localhost:5000${img}`}  className="pt-2"/>
<p className="text-ellip description" >{p.description}</p>
<p className="fw-bold" >&#x20B9;{p.price}</p>
</div>
)
})}
</div>
)}

export default Subcategory
