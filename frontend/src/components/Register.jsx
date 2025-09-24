import { useRef } from "react";
import axios from "axios";
axios.defaults.withCredentials=true;
function Register() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const phoneRef = useRef("");
  const addressRef = useRef("");
  const roleRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      role: roleRef.current.value || "customer", // default customer
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData);
      alert("Registration successful!");

      // Reset fields
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      phoneRef.current.value = "";
      addressRef.current.value = "";
      roleRef.current.value = "customer";
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="needs-validation p-4" noValidate >
      <h1 className="regis_h1 mb-4" >Register</h1>
      <form onSubmit={handleSubmit}>
<div className="row register_row ">
<div className="col-12 col-md-6 regis_col" >
<label className="form-label" htmlFor="name">enter name</label>
        <input ref={nameRef} className="form-control" id="name" type="text" placeholder="Enter your name" required />
<div className="valid-feedback" >please vlid enter name</div>
</div>     
   <br /><br />
<div className="col-12 col-md-6 regis_col" >
<label className="form-label" htmlFor="email">enter email</label>
        <input ref={emailRef} type="email" id="email" className="form-control" placeholder="Enter your email" required />
<div className="valid-feedback">enter valid email</div>
</div>
        <br /><br />
<div className="col-12 col-md-6 regis_col" >
<label className="form-label" htmlFor="password">enter password</label>
        <input ref={passwordRef} type="password" id="password" className="form-control" placeholder="Enter password" required />
<div className="valid-feedback" > enter valid password</div>
</div>
        <br /><br />
<div className="col-12 col-md-6 regis_col" >
<label className="form-label" htmlFor="number">enter phone number</label>
        <input ref={phoneRef} type="number" id="number" className="form-control" placeholder="Enter phone number" required/>
<div className="valid-feedback" > enter valid phone number</div>
</div>
        <br /><br />
<div className="col-12 col-md-6 regis_col" >
<label className="form-label" htmlFor="address">enter address</label>
        <textarea ref={addressRef} id="address" className="form-control" placeholder="Enter address" required></textarea>
<div className="valid-feedback" > enter valid address</div>
</div>
        <br /><br />
<div className="col-12 col-md-6 regis_col" >
<label className="form-label" htmlFor="selecter">select one</label>
        <select ref={roleRef} id="selecter" className="form-control" defaultValue="customer" required>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
<div className="valid-feedback" > enter valid choose one</div>
</div>
        <br /><br />
</div>
        <button type="submit" className=" regis_btn btn btn-primary ps-1">Register</button>
      </form>
    </div>
  );
}

export default Register;
