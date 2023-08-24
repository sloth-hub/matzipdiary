import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login"
import { Home } from "../pages/Home";
import { UserInterface } from "../interfaces/user.interface";
import { WriteNote } from "../pages/WriteNote";
import Nav from "../Components/Nav";

type RouterType = {
    isLoggedIn: boolean,
    userObj: UserInterface | null
}

export const AppRouter = ({ isLoggedIn, userObj }: RouterType) => {
    return (
        <BrowserRouter>
            <Nav userObj={userObj} />
            <main id="main">
                <Routes>
                    {isLoggedIn ?
                        <>
                            <Route path="/" element={<Home userObj={userObj} />} />
                            <Route path="/write" element={<WriteNote userObj={userObj} />} />
                        </>
                        :
                        <>
                            <Route path="/" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                        </>
                    }
                </Routes>
            </main>
            <footer>&copy; 2023 matzipdiary. All rights reserved.</footer>
        </BrowserRouter>
    )
}