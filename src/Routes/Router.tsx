import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login"
import { Home } from "../pages/Home";
import { UserInterface } from "../interfaces/user.interface";
import { WriteNote } from "../pages/WriteNote";
import Nav from "../Components/Nav";
import { Detail } from "../pages/Detail";
import { db } from "../Firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NoteInterface } from "../interfaces/note.interface";

type RouterType = {
    isLoggedIn: boolean,
    userObj: UserInterface | null,
}

export const AppRouter = ({ isLoggedIn, userObj }: RouterType) => {

    const [notes, setNotes] = useState<NoteInterface[]>([]);
    const [ogNotes, setOgNotes] = useState<NoteInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userObj) getNotes();
    }, []);

    const getNotes = async () => {
        const q = query(
            collection(db, "notes"),
            where("uid", "==", userObj!.uid),
            orderBy("date_created", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(), id: doc.id
            }
        });
        // @ts-ignore
        setNotes(data);
        // @ts-ignore
        setOgNotes(data);
        setIsLoading(false);
    }

    return (
        <BrowserRouter>
            <Nav userObj={userObj} />
            <main id="main">
                <div className={isLoggedIn? "inner" : "inner center"}>
                    <Routes>
                        {isLoggedIn ?
                            <>
                                <Route path="/" element={<Home notes={notes} ogNotes={ogNotes} setNotes={setNotes} isLoading={isLoading} />} />
                                <Route path="/write" element={<WriteNote userObj={userObj} />} />
                                <Route path="/note/:id" element={<Detail />} />
                            </>
                            :
                            <>
                                <Route path="/" element={<Login />} />
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
        </BrowserRouter>
    )
}