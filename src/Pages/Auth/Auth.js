import { Formik, Form , Field, ErrorMessage } from "formik";
import { useAuth } from "../../hooks/auth.hooks";
import { fromValidator } from "../../validators/auth.form.validator";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loginform from "./Loginform";
import SignupForm from "./SignupForm";

const Auth = () => {



  const url = useLocation()
 
  const isLoginPage = (url.pathname == "/login"); 

  console.log(isLoginPage);

  return <>
  {isLoginPage && <Loginform/> }
  {!isLoginPage && <SignupForm/> }
  </> 
  
 
}

export default Auth