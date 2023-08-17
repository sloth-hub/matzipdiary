import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../Firebase";

export const Home = ({ userObj }: any) => {


    const logout = () => {
        firebaseAuth.signOut();
        window.location.reload();
    }

    return (
        <>
            <h1>home page</h1>
            <p>어서오세요 {userObj.nickname}님!</p>
            <button onClick={logout}>로그아웃</button>
        </>
    )
}