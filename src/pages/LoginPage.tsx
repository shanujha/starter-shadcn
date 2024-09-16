import { useState } from "react";
import "./styles/LoginPage.css"
import { LoginForm } from '@/components/blocks/authentication'
import { useAuth } from "@/hooks/useAuth";
import {SubmitHandler} from 'react-hook-form'
import { Navigate } from "react-router-dom";

export type FormValues = {
  password: string
  email: string
}

const LoginPage = () => {

  const { user, login }: any = useAuth();

  if (user) {
    // user is not authenticated
    return <Navigate to="/test" />;
  }

  // const onSubmit: SubmitHandler<FormValues> = (data) => console.log('form-data', data)
  const handleLogin = async (values: FormValues) => {
    const {email, password} = values;
    if (email === "acme@example.com" && password === "password") {
      // Replace with actual authentication logic
      await login({ username: email });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container">
    <LoginForm formsubmitHandler={handleLogin}/>
  </div>
  )
}

export default LoginPage
