import { ChangeEvent, useState } from "react";
import { UserInputInterface } from "../interfaces/user.interface";
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db, firebaseAuth } from "../Firebase";
import { Link } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import moment from "moment";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Login = () => {

    const [signupData, setSignupData] = useState<UserInputInterface>({
        email: "",
        password: ""
    });

    const [val_email, setVal_email] = useState<string>();
    const [val_pass, setVal_pass] = useState<string>();

    const { email, password } = signupData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        if (name === "email") {
            setVal_email(value.replace(" ", ""));
        } else {
            setVal_pass(value.replace(" ", ""));
        }
        setSignupData({
            ...signupData, [name]: value
        });

    }
    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                window.location.reload();
            }).catch(err => {
                if (err.code === "auth/user-not-found") {
                    alert("회원 정보가 없습니다.");
                } else if (err.code === "auth/wrong-password") {
                    alert("비밀번호가 맞지 않습니다.")
                } else {
                    console.log(`${err.code} - ${err.message}`);
                }
            });
    }

    const snsLogin = async ({ currentTarget }: any) => {
        const target = currentTarget;
        if (target.name === "google") {
            const provider = new GoogleAuthProvider;
            addUserInfo(provider);
        } else if (target.name === "github") {
            const provider = new GithubAuthProvider;
            addUserInfo(provider);
        }
    }

    const addUserInfo = async (provider: any) => {
        await signInWithPopup(firebaseAuth, provider)
            .then(async (result) => {
                const user = result.user;
                const data = await getDocs(collection(db, "users"));
                const usersData = data.docs.map(doc => ({
                    ...doc.data()
                }));
                // 유저 정보가 없으면 유저 정보 db에 등록
                if (!usersData.some(v => v.uid === user.uid)) {
                    await addDoc(collection(db, "users"), {
                        uid: user.uid,
                        nickname: user.displayName,
                        email: user.email,
                        date_created: moment().utc().format("YYYY-MM-DD HH:mm:ss")
                    });
                }
                window.location.reload();
            }).catch(err => {
                console.log(`${err.code} - ${err.message}`);
            });
    }

    return (
        <div className="login-form">
            <form onSubmit={onSubmit}>
                <div className="input-box">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email"
                        placeholder="example@matzip.com"
                        onChange={onChange}
                        value={val_email || ""}
                        required />
                    <span className="input-error hide">이메일 형식이 올바르지 않습니다.</span>
                </div>
                <div className="input-box">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password"
                        placeholder="********"
                        onChange={onChange}
                        value={val_pass || ""}
                        required />
                    <span className="input-error hide">비밀번호가 맞지 않습니다.</span>
                </div>
                <button type="submit">로그인</button>
                <div className="or">
                    <hr />
                    <span>or</span>
                    <hr />
                </div>
                <div className="sns-login">
                    <button type="button" name="google" onClick={snsLogin}><FcGoogle size={"2em"} /><span className="hide">구글 로그인</span></button>
                    <button type="button" name="github" onClick={snsLogin}><FaGithub size={"1.8em"} /><span className="hide">깃허브 로그인</span></button>
                </div>
                <Link to="/signup" className="signup">회원가입</Link>
            </form>
        </div>
    )
}