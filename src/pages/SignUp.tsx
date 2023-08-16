import React, { ChangeEvent, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { UserInputInterface } from "../interfaces/user.interface";
import { db, firebaseAuth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import moment from "moment";

export const SignUp = () => {

    const [signupData, setSignupData] = useState<UserInputInterface>({
        email: "",
        nickname: "",
        password: ""
    });

    const { email, nickname, password } = signupData;
    const navigate = useNavigate();

    const psConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, nextSibling } = e.target;
        if (value === signupData.password) {
            (nextSibling as HTMLElement).classList.add("hide");
        } else {
            (nextSibling as HTMLElement).classList.remove("hide");
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData, [name]: value
        });
    }

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    ...signupData,
                    date_created: moment().utc().format("YYYY-MM-DD HH:mm:ss")
                });
                alert("가입이 완료되었습니다");
                navigate("/login");
            })
            .catch((error) => {
                console.log(`${error.code} - ${error.message}`);
            });
    }

    return (
        <div className="sign-form">
            <h1>sign up page</h1>
            <form onSubmit={onSubmit}>
                <div className="input-box">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email"
                        placeholder="example@matzip.com" onChange={onChange}
                        required />
                    <span className="input-error hide">이메일 형식이 올바르지 않습니다.</span>
                </div>
                <div className="input-box">
                    <label htmlFor="nickname">닉네임</label>
                    <input type="text" name="nickname" id="nickname"
                        placeholder="한글 6글자, 영문 10글자 이하" onChange={onChange}
                        required />
                    <span className="input-error hide">한글 6글자, 영문 10글자 이하만 가능합니다.</span>
                </div>
                <div className="input-box">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password"
                        placeholder="********" onChange={onChange}
                        required />
                    <span className="input-error hide">영문/숫자/특수문자 2가지 이상 포함한 8자 이상 32자 이하여야 합니다.(공백제외)</span>
                </div>
                <div className="input-box">
                    <label htmlFor="password-confirm">비밀번호 확인</label>
                    <input type="password" name="password-confirm" id="password-confirm"
                        placeholder="********" onChange={psConfirm}
                        required />
                    <span className="input-error hide">비밀번호가 일치하지 않습니다.</span>
                </div>
                <button type="submit">가입하기</button>
            </form>
        </div>
    )
}