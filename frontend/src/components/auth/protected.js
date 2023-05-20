import React from "react";
import Login from "../bloglogin";
function Protected({ children }) {
  const role = localStorage.getItem("userName");
  return <div>{role ? children : <Login />}</div>;
}
export default Protected;
