import React from "react";

export const Main = () => {

    return (
        <>
            <div className="main-content-wrap">
                <div className="content-left">
                    <div>
                        <h1>맛집일기</h1>
                        <h2>
                            맛집 리뷰를<br />
                            일기처럼 프라이빗하게
                        </h2>
                    </div>
                    <div>
                        <h3>내가 방문했던 맛집에 대해
                            <br />자유롭게 리뷰하고
                            <br />카테고리를 볼 수 있는
                            <br />맛집 기록 서비스 입니다.
                        </h3>
                    </div>
                </div>
                <div className="content-right">
                    <img src={`${process.env.PUBLIC_URL}/images/matzipdiary_mobile_1.png`} alt="맛집일기 메인" />
                    <img src={`${process.env.PUBLIC_URL}/images/matzipdiary_mobile_2.png`} alt="맛집일기 상세보기" />
                </div>
            </div>
            <div className="bg"></div>
        </>
    );
}