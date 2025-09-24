import {useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Category from "./Category.jsx";
import axios from "axios";
axios.defaults.withCredentials=true
import Carousel from "./Carousel.jsx"
import DetailP from "./DetailP.jsx"
function HomePage() {
  const [products, setProducts] = useState([]);
  const [beautyProducts, setBeautyProducts] = useState([]);
const [electricProd,setElectricProd]=useState([])
const [fashionProducts, setFashionProducts] = useState([]);
const [sportProd,setSportProd]=useState([])
const [groceriesProd,setGroceriesProd]=useState([])
const [furnitureProd,setFurnitureProd]=useState([])
const [singleProd,setSingleProd]=useState(null)
  
const navigate=useNavigate();

useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        setProducts(res.data);

const fBeautyProduct=res.data.filter((p)=> p.category_id ===2).slice(0,8)
setBeautyProducts(fBeautyProduct)

        // Filter aur limit ek sath
        const filtered = res.data
          .filter((p) => p.category_id === 4)
          .slice(0, 8); // sirf 10 hi item lenge

        setFashionProducts(filtered);

const electric=res.data.filter((p)=> p.category_id ===3).slice(0,8)
setElectricProd(electric)

const sports=res.data.filter((p)=> p.category_id ===6).slice(0,8)
setSportProd(sports)

const grocery=res.data.filter((p)=> p.category_id ===7).slice(0,8)
setGroceriesProd(grocery)


const home=res.data.filter((p)=> p.category_id ===8).slice(0,8)
setFurnitureProd(home)

      })

      .catch((err) => console.error(err));
  }, []);


const outProduct=(id)=>{
const product=products.find((p)=> p.product_id===id)
navigate("/detailsProduct",{state:{details:product}})
}

  return (
    <div className="container-lg mb-4">
      <Category />


<Carousel/>
<div className="top_main_div" >

<div className="bg-white mt-2 ">
      <h6 className="pt-1 ps-1">Beauty Products</h6>
      <div className="d-flex overflow-x-auto top_section gap-1 bg-white">
        {beautyProducts.map((p) => {
const images=JSON.parse(p.image_url)
const img=images[0]
return (
<div key={p.product_id} className="card top_section_div pt-1 border border-white px-2" >
<img src={`http://localhost:5000${img}`} className="img-fluid top_section_img" onClick={()=> outProduct(p.product_id)}/>
<p className="text-ellipsis" >{p.description}</p>
<p className="fw-bolder" >&#x20B9;{p.price}</p>
</div>
        )})}
</div>
</div>

<div className="bg-white mt-2 ps-1" >
<h6 className="pt-1 ps-1">mobiles</h6>
      <div className="d-flex overflow-x-auto top_section gap-2">
        {electricProd.map((p) => {
const images=JSON.parse(p.image_url)
const img=images[0]
return (
<div key={p.product_id} className="card top_section_div pt-1 border-white">
<img src={`http://localhost:5000${img}`} className="img-fluid" onClick={()=> outProduct(p.product_id)}/>
<p className="text-ellipsis p-1" >{p.description}</p>
<p className="fw-bolder" >&#x20B9;{p.price}</p>
</div>
        )})}
</div>
</div>

<div className="bg-white mt-2 ps-1" >
<h6 className="pt-1 ps-1">Fashion products</h6>
      <div className="d-flex overflow-x-auto top_section gap-2 ">
        {fashionProducts.map((p) => {
const images=JSON.parse(p.image_url)
const img=images[0]
return (
<div key={p.product_id} className="card top_section_div pt-1 border-white px-1">
<img src={`http://localhost:5000${img}`} className="img-fluid" onClick={()=> outProduct(p.product_id)}/>
<p className="text-ellipsis p-1" >{p.description}</p>
<p className="fw-bolder" >&#x20B9;{p.price}</p>
</div>
        )})}
</div>
</div>


<div className="bg-white mt-2 ps-1" >
<h6 className="pt-1 ps-1" >Sports & fitness</h6>
      <div className="d-flex overflow-x-auto top_section gap-2 ">
        {sportProd.map((p) => {
const images=JSON.parse(p.image_url)
const img=images[0]
return (
<div key={p.product_id} className="card top_section_div pt-1 border-white ">
<img src={`http://localhost:5000${img}`} className="img-fluid" onClick={()=> outProduct(p.product_id)}/>
<p className="text-ellipsis p-1" >{p.description}</p>
<p className="fw-bolder" >&#x20B9;{p.price}</p>
</div>
        )})}
</div>
</div>

<div className="bg-white mt-2 ps-1" >
<h6 className="pt-1 ps-1" >Grocery & Essentials</h6>
      <div className="d-flex overflow-x-auto top_section gap-2 ">
        {groceriesProd.map((p) => {
const images=JSON.parse(p.image_url)
const img=images[0]
return (
<div key={p.product_id} className="card top_section_div pt-1 border-white ">
<img src={`http://localhost:5000${img}`} className="img-fluid" onClick={()=> outProduct(p.product_id)}/>
<p className="text-ellipsis p-1" >{p.description}</p>
<p className="fw-bolder" >&#x20B9;{p.price}</p>
</div>
        )})}
</div>
</div>


<div className="bg-white mt-2 ps-1" >
<h6 className="pt-1 ps-1" >Home & furniture</h6>
      <div className="d-flex overflow-x-auto top_section gap-2">
        {furnitureProd.map((p) => {
const images=JSON.parse(p.image_url)
const img=images[0]
return (
<div key={p.product_id} className="card top_section_div pt-1 border-white ">
<img src={`http://localhost:5000${img}`} className="img-fluid" onClick={()=> outProduct(p.product_id)}/>
<p className="text-ellipsis p-1" >{p.description}</p>
<p className="fw-bolder" >&#x20B9;{p.price}</p>
</div>
        )})}
</div>
</div>

</div>
    </div>
  );
}

export default HomePage;
