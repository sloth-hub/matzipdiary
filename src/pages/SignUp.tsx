import React, { ChangeEvent, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { UserInputInterface } from "../interfaces/user.interface";
import { db, firebaseAuth } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import moment from "moment";

export const SignUp = () => {

    const [signupData, setSignupData] = useState<UserInputInterface>({
        email: "",
        nickname: "",
        password: "",
        psConfirm: ""
    });
    const [emailMsg, setEmailMsg] = useState<string>("");
    const [nicknameMsg, setNicknameMsg] = useState<string>("");
    const [pwMsg, setPwMsg] = useState<string>("");
    const [pwCfmMsg, setPwCfmMsg] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean[]>([]);

    const { email, nickname, password, psConfirm } = signupData;
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData, [name]: value
        });
    }

    const onFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        if (id === "email") checkEmail(value);
        else if (id === "nickname") checkNickname(value);
        else if (id === "password") checkPw(value);
        else checkPwCfm(value);
    }

    const checkEmail = async (value: string) => {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const querySnapshot = await getDocs(query(
            collection(db, "users"),
            where("email", "==", value)
        ));
        if (regExp.test(value)) {
            if (!querySnapshot.empty) {
                setEmailMsg("이미 사용중인 이메일 입니다.");
                return false;
            } else {
                setEmailMsg("");
                return true;
            }
        } else {
            setEmailMsg("이메일 형식이 올바르지 않습니다.");
            return false;
        }
    }

    const checkNickname = (value: string) => {
        const kor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        const eng = /[a-zA-Z]/g;
        const symbols = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;

        if (kor.test(value) && value.length < 7) {
            setNicknameMsg("");
            return true;
        } else if (eng.test(value) && value.length < 11) {
            setNicknameMsg("");
            return true;
        } else if (symbols.test(value)) {
            setNicknameMsg("한글 6글자, 영문 10글자 이하만 가능합니다.");
            return false;
        } else {
            setNicknameMsg("한글 6글자, 영문 10글자 이하만 가능합니다.");
            return false;
        }
    }

    const checkPw = (value: string) => {
        const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/g;
        if (regExp.test(value)) {
            setPwMsg("");
            return true;
        } else {
            setPwMsg("영문/숫자/특수문자를 포함한 8자 이상 15자 이하여야 합니다.(공백제외)");
            return false;
        }
    }

    const checkPwCfm = (value: string) => {
        if (password === value && value !== "") {
            setPwCfmMsg("");
            return true;
        } else {
            setPwCfmMsg("비밀번호가 일치하지 않습니다.");
            return false;
        }
    }

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (await checkEmail(email) && checkNickname(nickname!) && checkPw(password) && checkPwCfm(psConfirm)) {
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    await addDoc(collection(db, "users"), {
                        uid: user.uid,
                        ...signupData,
                        date_created: moment().utc().format("YYYY-MM-DD HH:mm:ss")
                    });
                    alert("가입이 완료되었습니다.");
                    navigate("/");
                    navigate(0);
                })
                .catch((error) => {
                    console.log(`${error.code} - ${error.message}`);
                });
        } else {
            alert("형식에 맞지 않는 항목이 있습니다. 다시 입력해주세요.");
        }
    }

    return (
        <div className="sign-form">
            <form onSubmit={onSubmit}>
                <div className="input-box">
                    <label htmlFor="email">이메일</label>
                    <input type="email" name="email" id="email"
                        placeholder="example@matzip.com"
                        onChange={onChange}
                        onBlur={onFocusOut} />
                    <span className="input-error">{emailMsg}</span>
                </div>
                <div className="input-box">
                    <label htmlFor="nickname">닉네임</label>
                    <input type="text" name="nickname" id="nickname"
                        placeholder="한글 6글자, 영문 10글자 이하"
                        onChange={onChange}
                        onBlur={onFocusOut} />
                    <span className="input-error">{nicknameMsg}</span>
                </div>
                <div className="input-box">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" id="password"
                        placeholder="********"
                        onChange={onChange}
                        onBlur={onFocusOut} />
                    <span className="input-error">{pwMsg}</span>
                </div>
                <div className="input-box">
                    <label htmlFor="psConfirm">비밀번호 확인</label>
                    <input type="password" name="psConfirm" id="psConfirm"
                        placeholder="********"
                        onChange={onChange}
                        onBlur={onFocusOut} />
                    <span className="input-error">{pwCfmMsg}</span>
                </div>
                <div className="btn-wrap">
                    <button className="back" onClick={() => navigate("/")}>뒤로</button>
                    <button type="submit">가입하기</button>
                </div>
            </form>
        </div>
    )
}