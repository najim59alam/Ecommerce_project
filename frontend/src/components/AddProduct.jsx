import { useState, useEffect } from "react";
import axios from "axios";

function AddProduct() {
  const [data, setData] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
const [categories,setCategories]=useState([])
const [categoryId,setCategoryId]=useState("")
const [subcategories,setSubcategories]=useState([])
const [subcategoryId,setSubcategoryId]=useState("")

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (files.length < 1) return;
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

useEffect(()=>{
axios.get(`${import.meta.env.VITE_API_URL}/categories`).then(res=> setCategories(res.data)).catch(err=> console.error(err))
},[])

useEffect(()=>{
if(!categoryId) return;
axios.get(`${import.meta.env.VITE_API_URL}/subcategory/${categoryId}`).then((res)=> setSubcategories(res.data)).catch(err=> console.error(err))
},[categoryId])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.productName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category_id", categoryId);
    formData.append("subcategory_id", subcategoryId);    
    files.forEach((file) => {
      formData.append("file", file);
    });

    axios
      .post(`${import.meta.env.VITE_API_URL}/product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => alert(res.data.message))
      .catch((err) => {
        console.error("Upload Error:", err);
        alert("failed: " + (err.response?.data?.message || err.message));
      });
  };

  return (
    <div>
      <h3>Add Product Page</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data.productName}
          placeholder="product name"
          onChange={handleInput}
          name="productName"
        />
        <input
          type="text"
          value={data.description}
          placeholder="description"
          onChange={handleInput}
          name="description"
        />
        <input
          type="number"
          value={data.price}
          placeholder="price"
          onChange={handleInput}
          name="price"
        />
        <input
          type="number"
          value={data.stock}
          placeholder="stock"
          onChange={handleInput}
          name="stock"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{display:categoryId?"none":""}}>
<option value="" >Select Category</option>
{categories.map((cate)=>{
 return <option value={cate.category_id} key={cate.category_id}>{cate.category_name}</option>
})}</select>
<br/>
{categoryId? <select value={subcategoryId} onChange={(e)=>setSubcategoryId(e.target.value)}><option value="">Select Subcategories</option>
{subcategories.map((subcate)=>{
return <option value={subcate.subcategory_id} key={subcate.subcategory_id}>{subcate.name}</option>
})}
</select>:""}
        <button type="submit">add product</button>
      </form>
<p>cate {categoryId}</p>
<p>sub{subcategoryId}</p>
      {previews.map((src, i) => (
        <img
          src={src}
          key={i}
          style={{ maxWidth: "200px", display: "flex" }}
          alt="preview"
        />
      ))}
    </div>
  );
}

export default AddProduct;
