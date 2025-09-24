import {useNavigate} from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import Subcategory from "./Subcategory.jsx"

function Category() {
  const [categories, setCategories] = useState([]);
  const [searchParams,setSearchParams]=useSearchParams()
  const [subcategories,setSubcategories]=useState([])
  const [products,setProducts]=useState([])
  const [filterProducts,setFilterProducts]=useState([])
const categoryId=searchParams.get("categoryId")
const subcategoryId=searchParams.get("subcategoryId")
 
const navigate=useNavigate();
useEffect(()=>{
axios.get(`${import.meta.env.VITE_API_URL}/categories`).then((res) =>setCategories(res.data)).catch(err=> console.error(err))
},[])
useEffect(()=>{
if(!categoryId) return;
axios.get(`${import.meta.env.VITE_API_URL}/subcategory/${categoryId}`).then((res)=> setSubcategories(res.data)).catch(err=>console.error(err))
},[categoryId])

useEffect(()=>{
if(!subcategoryId) return;
axios.get(`${import.meta.env.VITE_API_URL}/products/${subcategoryId}`)
.then((res) =>{
setFilterProducts(res.data);
navigate("/Subcategory",{state:{filterP:res.data}})
}).catch(err=> console.log(err))
},[subcategoryId])


return (
<div className="mb-2">
  <div className="d-flex cate_div gap-3 bg-white overflow-x-auto p-2">
    {categories.map((cate) => {
      return (
        <div className="dropdown " key={cate.category_id} style={{ position: "static" }}>
          <button
                 style={{backgroundColor:"white",border:"none"}}
            className=" dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false" 
            onClick={()=>setSearchParams({categoryId:cate.category_id})}
           
          >
            {cate.category_name}
          </button>
          <ul className="dropdown-menu" data-bs-popper="static" style={{
      position: "fixed", 
      zIndex: 1050,         
    }}>
{subcategories.map((sub)=> <li className="dropdown-item" key={sub.subcategory_id} onClick={
()=> setSearchParams({subcategoryId:sub.subcategory_id})}>{sub.name}</li>)}
          </ul>
        </div>
      );
    })}
  </div>
</div>
);


}

export default Category
