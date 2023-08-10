import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login"
import { Home } from "../pages/Home";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup/*" element={<SignUp />} />
                <Route path="/login/*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}