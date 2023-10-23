import { Link, useNavigate } from "react-router-dom";
import { UserInterface } from "../interfaces/user.interface";
import { firebaseAuth } from "../Firebase";

type RouterType = {
    userObj: UserInterface | null
}

export const Nav = ({ userObj }: RouterType) => {

    const navigate = useNavigate();
    const logout = () => {
        const response = window.confirm("정말로 로그아웃 하시겠습니까?");
        if (response) {
            firebaseAuth.signOut()
                .then(() => {
                    window.location.reload();
                }).catch(err => {
                    console.log(`${err.code} - ${err.message}`);
                });
        }
    }

    const pfpToggle = () => {
        const popup = document.querySelector(".pfp-popup");
        popup!.classList.toggle("on");
    }

    return (
        <nav>
            <div className="inner">
                <Link to="/" className="logo">맛집일기</Link>
                <div className="pfp-wrap" >
                    {userObj ? <>
                        <button type="button" className="pfp-btn" onClick={pfpToggle}>
                            <img src={userObj && userObj.pfp !== null ? userObj.pfp : `${process.env.PUBLIC_URL}/images/blank-profile-picture.webp`} className="pfp" alt="profile image" />
                        </button>
                        <div className="pfp-popup">
                            <span>{userObj.nickname}</span>
                            <button onClick={logout} className="logout">로그아웃</button>
                        </div>
                    </>
                        :
                        <>
                            <button onClick={() => navigate("/login")} className="login">로그인</button>
                            <button onClick={() => navigate("/signup")} className="signup">회원가입</button>
                        </>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Nav;