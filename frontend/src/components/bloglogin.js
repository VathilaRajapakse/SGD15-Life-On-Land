import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";

export default function MemberLogin() {
  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");

  function sendData(event) {
    event.preventDefault();

    const member = {
      userName,
      password,
    };

    axios
      .post("http://localhost:8080/register/login", member)
      .then(() => {
        window.localStorage.setItem("userName", userName);
  window.location.reload()
        
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div class="limiter" id="login">
      <div class="container-login100">
        <div class="container">
          <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-5 col-md-offset-1">
              <div class="login_topimg"></div>
              <div class="wrap-login100">
                <form onSubmit={sendData} class="login100-form validate-form">
                  <span class="login100-form-title "> Login </span>
                  <span class="login100-form-subtitle m-b-16">
                    {" "}
                    to your account{" "}
                  </span>
                  <div
                    class="wrap-input100 validate-input m-b-16"
                    data-validate="Valid email is required: ex@abc.xyz"
                  >
                    <input
                      class="input100"
                      type="text"
                      name="Username"
                      placeholder="Username"
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                      required
                    />
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                      <span class="glyphicon glyphicon-user"></span>
                    </span>
                  </div>
                  <div
                    class="wrap-input100 validate-input m-b-16"
                    data-validate="Password is required"
                  >
                    <input
                      class="input100"
                      type="password"
                      name="pass"
                      placeholder="Password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      required
                    />
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
                      <span class="glyphicon glyphicon-lock"></span>
                    </span>
                  </div>
                  <div class="flex-sb-m w-full p-b-30">
                    <div class="contact100-form-checkbox">
                      <input
                        class="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="remember-me"
                      />
                      <label class="label-checkbox100" for="ckb1">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <a href="/registration" class="txt1">
                        Don't have an Account ?
                      </a>
                    </div>
                  </div>
                  <div class="container-login100-form-btn p-t-25">
                    {" "}
                    <button class="login100-form-btn"> Login </button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}