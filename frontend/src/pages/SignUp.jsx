import React, { useState } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import image from "../images/authPageSide.png";
import { api_base_url } from '../helper';
import emailjs from 'emailjs-com';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [otp, setOTP] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  
  const sendOTP = async () => {
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiryTime = new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString();

    setGeneratedOTP(otpCode);

 
    const templateParams = {
      to_email: email,
      otp: otpCode,   
      time: expiryTime
    };

    try {
      await emailjs.send('service_minor', 'template_groot', templateParams, 'kx4XT4sAHWye047XU');
      alert(`OTP sent successfully to ${email}`);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send OTP. Please check your EmailJS configuration.");
    }
  };

 
  const verifyOTP = () => {
    if (otp === generatedOTP) {
      setIsOTPVerified(true);
      setError("");
      alert("OTP Verified Successfully");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };


  const submitForm = async (e) => {
    e.preventDefault();

    if (!isOTPVerified) {
      setError("Please verify OTP before signing up.");
      return;
    }

    try {
      const response = await fetch(`${api_base_url}/signUp`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          name: name,
          email: email,
          password: pwd
        })
      });

      const data = await response.json();

      if (data.success === true) {
        alert("Account created successfully");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Sign-up failed. Please try again.");
      console.error("Sign-up error:", err);
    }
  };

  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[35%]">
          <img className='w-[200px]' src={logo} alt="Logo" />

          <form onSubmit={submitForm} className='w-full mt-[60px]'>
            <div className="inputBox">
              <input
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder='Username'
              />
            </div>

            <div className="inputBox">
              <input
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder='Name'
              />
            </div>

            <div className="inputBox">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder='Email'
              />
            </div>

            <button
              type="button"
              className="btnBlue w-full mt-[10px]"
              onClick={sendOTP}
            >
              Send OTP
            </button>

            <div className="inputBox mt-[10px]">
              <input
                required
                onChange={(e) => setOTP(e.target.value)}
                value={otp}
                type="text"
                placeholder='Enter OTP'
              />
            </div>

            <button
              type="button"
              className="btnBlue w-full mt-[10px]"
              onClick={verifyOTP}
            >
              Verify OTP
            </button>

            <div className="inputBox mt-[10px]">
              <input
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type="password"
                placeholder='Password'
              />
            </div>

            <p className='text-[gray]'>
              Already have an account? <Link to="/login" className='text-[#00AEEF]'>Login</Link>
            </p>

            <p className='text-red-500 text-[14px] my-2'>{error}</p>

            <button className="btnBlue w-full mt-[20px]" disabled={!isOTPVerified}>
              Sign Up
            </button>
          </form>
        </div>

        <div className="right w-[55%]">
          <img className='h-[100vh] w-[100%] object-cover' src={image} alt="Auth Image" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
