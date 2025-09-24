import {Link} from "react-router-dom"
function Navbar(){
return (
<div className="d-flex gap-2 align-items-center bg-white navbar mb-3" >
<h2 className="fst-italic ps-2 text-primary mb-0" >Bitka</h2>
<input className="searchbar my-0 py-0" placeholder="search for products" />
<div className="d-flex  align-items-center icons_div" >
<div>
<Link className="link text-black" to="/Login">
<i class="fa-solid fa-user"></i>&nbsp;
<span className="mt-2">Login</span>
</Link>
</div>
<i class="fa-solid fa-house-user invisible"></i>
<Link to="/CartProduct" className="link "><i class="fa-solid fa-cart-shopping"></i></Link>
<i class="fa-solid fa-ellipsis-vertical invisible"></i>
</div>
</div>
)
}

export default Navbar
