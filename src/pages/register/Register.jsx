import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="e.g, johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="e.g, abc@example.com"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" placeholder="Password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="e.g, India"
            onChange={handleChange}
          />
          <button style={{ width: "110%" }} type="submit">Register</button>
        </div>

        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <div>
            <label htmlFor="">Phone Number</label>
            <br />
            <br />
            <input
              name="phone" style={{ width: "100%" }}
              type="text"
              placeholder="e.g, +91 7949837758"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <br />
            <br />
            <textarea
              placeholder="A short description of yourself" style={{width: "100%"}}
              name="desc"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
          </div>
          <a href="/login" style={{color:"blue"}}>Already have an account?</a>
        </div>


      </form>
    </div>
  );
}

export default Register;