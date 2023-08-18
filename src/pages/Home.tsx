import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../Firebase";

export const Home = ({ userObj }: any) => {


    const logout = () => {
        firebaseAuth.signOut()
            .then(() => {
                window.location.reload();
            }).catch(err => {
                console.log(`${err.code} - ${err.message}`);
            });
    }

    return (
        <>
            <h1>home page</h1>
            <p>{userObj ? `Hello, ${userObj.nickname}!` : "goodbye!"}</p>
            <button onClick={logout}>로그아웃</button>
        </>
    )
}