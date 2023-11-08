import Cookies from "js-cookie";
import React from "react";
import { create } from "zustand";
import request from "../server/request";

interface AuthState {
  login: () => void;
  register: () => void
}


const useAuth = create<AuthState>()((set) => ({
  login: async (e: React.FormEvent<HTMLInputElement>, user: object, setIsAuth: React.Dispatch<boolean>, navigate: React.Dispatch<string>) => {
    e.preventDefault();
    await request
      .post(
        "api/v1/auth/login",
        user
      )
      .then((res) => {
        console.log(user)
        console.log(res)
        Cookies.set("token", res.data.token)
        setIsAuth(true)
        navigate('/account')
      }).catch(err => console.log(err));
  },
  register: async(e: React.FormEvent<HTMLInputElement>, user: object, setIsAuth: React.Dispatch<boolean>, navigate: React.Dispatch<string>) => {
    e.preventDefault();
    await request.post("api/v1/auth/register", user).then(res => {
      Cookies.set("token", res.data.token);
      setIsAuth(true)
      navigate('/account')
    }).catch(err => console.log(err))
  }
}));

export default useAuth;
