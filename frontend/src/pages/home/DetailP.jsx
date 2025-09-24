import { useLocation } from "react-router-dom";
import {useState,useEffect} from "react"
import axios from "axios"
axios.defaults.withCredentials=true;
import Order from "./Order"
import Reviews from "./Reviews"
import RandomP from "./RandomP.jsx"
function DetailP() {
  const location = useLocation();
  const product = location.state?.details;
const [ratings,setRatings]=useState([])

  if (!product) return <p>No product found</p>;

  const images = JSON.parse(product.image_url);

useEffect(()=>{
axios.get(`{import.mete.env.VITE_API_URL/product.product_id}/ratings`).then((res)=> setRatings(res.data)).catch(err=>console.error(err))
},[product])

  return (
    <div className="mb-4" >
      <div id="carouselExample" className="carousel slide px-2" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img 
                src={`http://localhost:5000${img}`}
                className="d-block w-100 img_details"
                alt={`slide-${index}`}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
<div className="px-2">
<p className="para fw-bold mb-0">{product.name}</p>
<p className=" para mt-0 mb-0">{product.description}</p>
<div className="d-flex mb-0 " >
<p className="para" >⭐{ratings[0]?.average_rating ?? "0"}</p>&nbsp;<span className="para" >({ratings[0]?.total_reviews ?? "0"}&nbsp;reviews)</span>
</div>
<p className=" para fw-bold mt-0">&#8377;{product.price}</p>
</div>
<Order product={product}/>
<br/>
<br/>
<RandomP subcategoryId={product.subcategory_id}/>
</div>
  );
}

export default DetailP;
