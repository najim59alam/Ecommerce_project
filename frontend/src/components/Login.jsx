import { useRef } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, formData)
      .then((res) => alert(res.data.message))
      .catch((err) =>
        alert(err.response?.data?.message || "Something went wrong")
      );
  };

  const logout = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/logout`).then(() =>
      alert("logout successful")
    );
  };

  return (
    <div className="p-4 login_page" >
      <h3 className="ms-3">Login page</h3>
      <br />
      <form
        onSubmit={handleSubmit}
        className="log_input needs-validation"
        noValidate
      >
        <div className="row log_row">
          <div className="col-12 col-md-6 log_col">
            <label htmlFor="validationCustom01" className="form-label">
              Email name
            </label>
            <br />
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              placeholder="enter email name"
              id="validationCustom01"
              required
            />
            <div className="invalid-feedback">Please enter a valid email.</div>
          </div>
          <div className="col-12 col-md-6 log_col">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <br />
            <input
              ref={passwordRef}
              type="password"
              placeholder="enter password"
              className="form-control"
              id="password"
              required
            />
            <div className="invalid-feedback">Password is required.</div>
          </div>
        </div>
        <br />
        <br />
        <button type="submit" className="log_btn btn btn-primary ms-3">
          Login
        </button>
      </form>
      <button onClick={logout} className="log_btn btn btn-primary">
        Logout
      </button>
    </div>
  );
}

export default Login;
