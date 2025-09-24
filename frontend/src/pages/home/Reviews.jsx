import {useState,useRef} from "react"
import axios from "axios"
axios.defaults.withCredentials=true
function Reviews({productId}){
const inputRef=useRef(null)
const [rating,setRating]=useState(null)
const submit=()=>{
const data={
reviews:inputRef.current.value,
rating:rating,
productId:productId
}
axios.post(`${import.meta.env.VITE_API_URL}/reviews`,data).then((res)=> alert(res.data)).catch(err=> alert("error"))
}
return (
<div>

<input ref={inputRef}  placeholder="Reviews text" />
<br/>
<br/>
{
[1,2,3,4,5].map((n)=>{
return <span key={n}  onClick ={()=>setRating(n)} style={{color:rating>=n ? 'gold':''}} ><i className="fa-solid fa-star"></i></span>
})
}
<p>rating:{rating}</p>
<button onClick={submit}>submit</button>
</div>
)
}

export default Reviews
