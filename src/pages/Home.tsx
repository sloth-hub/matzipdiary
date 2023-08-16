import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate();

    const goLogin = () => {
        navigate("/signup");
    }

    return (
        <>
            <h1>home page</h1>
            <button onClick={goLogin}>signup 페이지로</button>
        </>
    )
}