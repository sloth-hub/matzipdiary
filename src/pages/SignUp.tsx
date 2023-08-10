import React, { useState } from "react";
import { UserInputInterface } from "../interfaces/user.interface";

export const SignUp = () => {

    const [signupData, setSignupData] = useState<UserInputInterface>({
        email: "",
        name: "",
        password: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const onsubmit = () => {

    }

    return (
        <div className="sign-form">
            <h1>sign up page</h1>
            <form onSubmit={onsubmit}>
                <div className="input-box">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email" placeholder="example@matzip.com" />
                    <span className="input-error hide">이메일 형식이 올바르지 않습니다.</span>
                </div>
                <div className="input-box">
                    <label htmlFor="name">닉네임</label>
                    <input type="text" name="name" id="name" placeholder="한글 6글자, 영문 10글자 이하" />
                    <span className="input-error hide">한글 6글자, 영문 10글자 이하만 가능합니다.</span>
                </div>
                <div className="input-box">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password" placeholder="********" />
                    <span className="input-error hide">영문/숫자/특수문자 2가지 이상 포함한 8자 이상 32자 이하여야 합니다.(공백제외)</span>
                </div>
                <div className="input-box">
                    <label htmlFor="password-confirm">비밀번호 확인</label>
                    <input type="password" name="password-confirm" id="password-confirm" placeholder="********" />
                    <span className="input-error hide">비밀번호가 일치하지 않습니다.</span>
                </div>
                <button type="submit">가입하기</button>
            </form>
        </div>
    )
}