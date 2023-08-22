import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login"
import { Home } from "../pages/Home";
import { UserInterface } from "../interfaces/user.interface";
import { WriteNote } from "../pages/WriteNote";

type RouterType = {
    isLoggedIn: boolean,
    userObj: UserInterface | null
}

export const AppRouter = ({ isLoggedIn, userObj }: RouterType) => {
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ?
                    <>
                        <Route path="/" element={<Home userObj={userObj} />} />
                        <Route path="/write" element={<WriteNote />} />
                    </>
                    :
                    <>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </>
                }
            </Routes>
        </BrowserRouter>
    )
}