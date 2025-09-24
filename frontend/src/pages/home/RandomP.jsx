import {useState,useEffect} from "react"
import axios from "axios"
axios.defaults.withCredentials=true
function RandomP({subcategoryId}){
const [randomsP,setRandomsP]=useState([])
useEffect(()=>{
axios.get(`${import.meta.env.VITE_API_URL}/randomsP/${subcategoryId}`).then((res)=> setRandomsP(res.data)).catch(err=>console.error(err))
},[])

return (
<div className="bg-white bottom_div">
<h6 className="similar ps-1" >similar products</h6>
<div className="d-flex overflow-x-auto bot_main_div gap-2 ps-1">
{randomsP.map((p)=>{
let images=[];
try{
 images=JSON.parse(p.image_url)
}catch(e){
console.error("invalid img_url",e)
}

const img=images.length>0? images[0]:""
return (
<div className="card bot_div border border-none">
<img src={`http://localhost:5000${img}`} className="bot_image img-fluid" />
<p className="text-ellipsis ps-1" >{p.description}</p>
<p className="fw-bold ps-1" >&#x20B9;{p.price}</p>
</div>
)
})}
</div>
</div>
)}

export default RandomP
