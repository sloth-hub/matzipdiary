import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login"
import { Home } from "../pages/Home";
import { UserInterface } from "../interfaces/user.interface";

type RouterType = {
    isLoggedIn: boolean,
    userObj: UserInterface | null
}

export const AppRouter = ({ isLoggedIn, userObj }: RouterType) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home userObj={userObj} />} />
                <Route path="/signup/*" element={<SignUp />} />
                <Route path="/login/*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}