import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';

export function Register() {
    const { register, 
      handleSubmit, 
      formState: { errors } 
    } = useForm();
  
    const onSubmit = (data) => console.log(data);
  
    return (
        <>
            <p className="title">Sign Up</p>
  
            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} />
                <input type="email" {...register("email", { required: true })} />
                {errors.email && <span style={{ color: "red" }}>
                    *Email* is mandatory </span>}
                <input type="password" {...register("password")} />
                <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    );
  }
  
export function Login() {
    const {
      register,
      handleSubmit,
      formState: {errors},
    } = useForm();
    
    const onSubmit = (data) => {
      const userData = JSON.parse(localStorage.getItem(data.email));
      if (userData) { // getItem can return actual value or null
          if (userData.password === data.password) {
              console.log(userData.name + " You Are Successfully Logged In");
          } else {
              console.log("Email or Password is not matching with our record");
          }
      } else {
          console.log("Email or Password is not matching with our record");
      }
    };
    return (
        <>
            <p className="title">Log In</p>
  
            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                  <input type="email" {...register("email", { required: true })} />
                  {errors.email && <span style={{ color: "red" }}>
                      *Email* is mandatory </span>}
                  <input type="password" {...register("password")} />
                  <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
              </form>
        </>
    );
  }

  