import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInputInterface } from "../interfaces/user.interface";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../Firebase";

export const Login = () => {

    const [signupData, setSignupData] = useState<UserInputInterface>({
        email: "",
        password: ""
    });

    const [val_email, setVal_email] = useState<string>();
    const [val_pass, setVal_pass] = useState<string>();

    const { email, password } = signupData;
    const navigate = useNavigate();

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
                console.log(user);
                navigate("/");
            }).catch((error) => {
                console.log(`${error.code} - ${error.message}`);
            });
    }

    return (
        <div className="login-form">
            <h1>Login page</h1>
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
            </form>
        </div>
    )
}