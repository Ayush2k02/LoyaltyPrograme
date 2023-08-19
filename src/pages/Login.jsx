import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const newEmail = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      email: newEmail,
    }));
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
  };

  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  };
  const myFunc = async (event) => {
    event.preventDefault();
    console.log(formData.email);
    console.log(formData.password);
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/sign_in",
        formData,
        { headers }
      );
      console.log("Response:", response.data);
      // You can handle the response data here
    } catch (error) {
      console.log("hjfisd");
      console.error("Error:", error);
      // Handle the error here
    }
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={myFunc}>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  value={formData.email}
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={handleInputChange}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  value={formData.password}
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
