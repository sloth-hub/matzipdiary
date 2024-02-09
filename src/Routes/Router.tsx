import { useState, useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login"
import { Home } from "../pages/Home";
import { UserInterface } from "../interfaces/user.interface";
import { WriteNote } from "../pages/WriteNote";
import { Main } from "../pages/Main";
import Nav from "../Components/Nav";
import { Detail } from "../pages/Detail";
import { db } from "../Firebase";
import { collection, getDocs, orderBy, query, where, limit } from "firebase/firestore";
import { NoteInterface } from "../interfaces/note.interface";

type RouterType = {
    isLoggedIn: boolean,
    userObj: UserInterface | null,
}

export const AppRouter = ({ isLoggedIn, userObj }: RouterType) => {

    return (
        <HashRouter>
            <Nav userObj={userObj} />
            <main id="main">
                <div className={isLoggedIn ? "inner" : "inner center"}>
                    <Routes>
                        {isLoggedIn ?
                            <>
                                <Route path="/" element={<Home userObj={userObj} />} />
                                <Route path="/write" element={<WriteNote userObj={userObj} />} />
                                <Route path="/note/:id" element={<Detail />} />
                                <Route path="/note/:id/write" element={<WriteNote userObj={userObj} />} />
                            </>
                            :
                            <>
                                <Route path="/" element={<Main />} />
                                <Route path="/login" element={<Login />} />
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
        </HashRouter>
    )
}