import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login"
import { Home } from "../pages/Home";
import { UserInterface } from "../interfaces/user.interface";
import { WriteNote } from "../pages/WriteNote";
import Nav from "../Components/Nav";
import { Detail } from "../pages/Detail";

type RouterType = {
    isLoggedIn: boolean,
    userObj: UserInterface | null
}

export const AppRouter = ({ isLoggedIn, userObj }: RouterType) => {
    return (
        <BrowserRouter>
            <Nav userObj={userObj} />
            <main id="main">
                <div className="inner">
                    <Routes>
                        {isLoggedIn ?
                            <>
                                <Route path="/" element={<Home userObj={userObj} />} />
                                <Route path="/write" element={<WriteNote userObj={userObj} />} />
                                <Route path="/note/:id" element={<Detail />} />
                            </>
                            :
                            <>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={<SignUp />} />
                            </>
                        }
                    </Routes>
                </div>
            </main>
            <footer>
                <div className="inner">
                    &copy; 2023 <span>matzipdiary.</span> All rights reserved.
                </div>
            </footer>
        </BrowserRouter>
    )
}