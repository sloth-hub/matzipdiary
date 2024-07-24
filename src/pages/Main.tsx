import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

export const Main = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <div className="main-content-wrap">
                <div className="content-left">
                    <div>
                        <h1 data-aos="fade-right" data-aos-duration="1000" data-aos-delay="500">맛집일기</h1>
                        <h2 data-aos="fade-right" data-aos-duration="1000" data-aos-delay="400">
                            맛집 리뷰를<br />
                            일기처럼 프라이빗하게
                        </h2>
                    </div>
                    <div>
                        <h3 data-aos="fade-right" data-aos-duration="1000" data-aos-delay="550">
                            내가 방문했던 맛집에 대해
                            <br />자유롭게 리뷰하고
                            <br />카테고리별로 볼 수 있는
                            <br />맛집 기록 서비스 입니다.
                        </h3>
                    </div>
                    <div data-aos="fade"
                        data-aos-duration="800"
                        data-aos-offset="0"
                        data-aos-delay="1200">
                        <button onClick={() => navigate("/login")}>
                            시작하기
                        </button>
                    </div>
                </div>
                <div className="content-right">
                    <img src={`${process.env.PUBLIC_URL}/images/matzipdiary_mobile_1.webp`}
                        alt="맛집일기 메인"
                        data-aos="fade-up"
                        data-aos-duration="1000" />
                    <img src={`${process.env.PUBLIC_URL}/images/matzipdiary_mobile_2.webp`}
                        alt="맛집일기 상세보기"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200" />
                </div>
            </div>
            <div className="bg"></div>
        </>
    );
}