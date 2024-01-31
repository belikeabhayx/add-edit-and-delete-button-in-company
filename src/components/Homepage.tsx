"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import LoginForm from "@/components/auth/login-form";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Social } from "./auth/social";

const page = () => {
  useEffect(() => {
    const signInBtn = document.querySelector<HTMLButtonElement>("#sign-in-btn");
    const signUpBtn = document.querySelector<HTMLButtonElement>("#sign-up-btn");
    const container = document.querySelector<HTMLDivElement>(".container");

    const handleSignUpClick = () => {
      container?.classList.add("sign-up-mode");
    };

    const handleSignInClick = () => {
      container?.classList.remove("sign-up-mode");
    };

    signUpBtn?.addEventListener("click", handleSignUpClick);
    signInBtn?.addEventListener("click", handleSignInClick);

    // Clean up event listeners when the component unmounts
    return () => {
      signUpBtn?.removeEventListener("click", handleSignUpClick);
      signInBtn?.removeEventListener("click", handleSignInClick);
    };
  }, []);


  return (
    <>
      <div>
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <script
              src="https://kit.fontawesome.com/64d58efce2.js"
              crossOrigin="anonymous"
            ></script>
            <title>Accounting Software</title>
          </head>
          <body>
            <div className="container">
              <div className="forms-container">
                <div className="signin-signup">

                  <form action="#" className="sign-in-form">
                    <h2 className="title">Sign in</h2>
                    {/* <div className="input-field">
                      <i className="fas fa-user"></i>
                      <input type="text" placeholder="Username" />
                    </div> */}
                    {/* <div className="input-field">
                      <i className="fas fa-lock"></i>
                      <input type="password" placeholder="Password" />
                    </div> */}
                    <input type="button" value="Login" className="btn solid" id="sign-up-btn"/>
                    <p className="social-text">
                      Or Sign in with social platforms
                    </p>
                    <div className="social-media">
                      <a href="#" className="social-icon">
                        <i className="fab fa-facebook-f"><FaFacebook/></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-twitter"><FcGoogle/></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-google"><FaGithub /></i>
                      </a>
                      <a href="#" className="social-icon">
                        <i className="fab fa-linkedin-in"><FaTwitter /></i>
                      </a>
                    </div>
                  </form>

                  <form action="#" className="sign-up-form">
                    {/* <LoginForm/> */} <Social/>
                  </form>


                </div>
              </div>

              <div className="panels-container">
                <div className="panel left-panel">
                  <div className="content">
                    <h3>Accounting Software</h3>
                    <p>
                      Do your work easily and effectively with us
                      Do your work easily and effectively with us 
                    </p>
                  </div>
                  <Image
                    src="/log.svg"
                    className="image"
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
                <div className="panel right-panel">
                  <div className="content">
                    <h3>login in with your socials</h3>
                    <p>
                      we have all types of social login, login-in to use our service.
                    </p>
                    <button className="btn transparent" id="sign-in-btn">
                      Sign in
                    </button>
                  </div>
                  <Image
                    src="/register.svg"
                    className="image"
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </body>
        </html>
      </div>
    </>
  );
};

export default page;
