import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h3>All Products</h3>
      {products.map((p) => {
        // backend se image_url JSON string aayegi, use parse karna hoga
        const images = JSON.parse(p.image_url);
        return (
          <div key={p.id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>Price: ₹{p.price}</p>
            <p>Stock: {p.stock}</p>
            {images.map((img, i) => (
              <img 
                key={i} 
                src={`http://localhost:5000${img}`} 
                alt="product" 
                style={{maxWidth:"200px", display:"block", margin:"5px 0"}} 
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
