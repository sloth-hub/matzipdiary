import React from "react";
import { Link } from "react-router-dom";
import { UserInterface } from "../interfaces/user.interface";
import { firebaseAuth } from "../Firebase";

type RouterType = {
    userObj: UserInterface | null
}

export const Nav = ({ userObj }: RouterType) => {

    const logout = () => {
        firebaseAuth.signOut()
            .then(() => {
                window.location.reload();
            }).catch(err => {
                console.log(`${err.code} - ${err.message}`);
            });
    }

    return (
        <nav>
            <Link to="/" className="logo">맛집일기</Link>
            <ul>
                <li>{userObj ? `HELLO, ${userObj.nickname}!` : "goodbye!"}</li>
                <li>
                    <button onClick={logout}>로그아웃</button>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;