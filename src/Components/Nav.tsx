import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserInterface } from "../interfaces/user.interface";
import { firebaseAuth } from "../Firebase";

type RouterType = {
    userObj: UserInterface | null
}

export const Nav = ({ userObj }: RouterType) => {

    const navigate = useNavigate();
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
            <div className="inner">
                <Link to="/" className="logo">맛집일기</Link>
                <ul>
                    <li>{userObj ? `HELLO, ${userObj.nickname}!` : ""}</li>
                    <li>
                        {userObj ? <button onClick={logout} className="logout">로그아웃</button> :
                            <>
                                <button onClick={() => navigate("/login")} className="login">로그인</button>
                                <button onClick={() => navigate("/signup")} className="signup">회원가입</button>
                            </>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;