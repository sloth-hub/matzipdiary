import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { UserInputInterface } from "../interfaces/user.interface";

export const Login = () => {

    const [signupData, setSignupData] = useState<UserInputInterface>({
        email: "",
        password: ""
    });

    const [val_email, setVal_email] = useState<string>();
    const [val_pass, setVal_pass] = useState<string>();

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
        console.log(signupData);
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