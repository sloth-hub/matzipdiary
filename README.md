# 맛집일기 matzip diary

> 맛집 리뷰를 일기처럼 프라이빗하게 쓰고 볼 수 있는 사이트 입니다. 

## 🔗 **SITE LINK**
https://sloth-hub.github.io/matzipdiary/

## 📄 **FEATURES**

- ### 메인 페이지
    - 프로필 이미지 클릭시 회원정보, 로그아웃 팝업 활성화
    - 작성일순, 방문일순 정렬
    - 업종 카테고리 정렬
    - 이미지 레이지 로딩 구현

- ### /login - 로그인 페이지
  - Firebase 이메일 로그인, sns 로그인 (구글, 깃허브)
  - 이메일, 비밀번호 불일치 및 유저 정보 없음 처리

- ### /signup - 회원가입 페이지
  - 정규식을 이용한 이메일, 닉네임, 비밀번호 예외처리
  - Firebase Database에 유저정보 저장

- ### /detail - 상세 페이지
  - 이미지 슬라이드 구현
  - 이미지 레이지 로딩 구현
  - 글 수정, 삭제 기능 구현

- ### /write - 일기 작성 페이지
  - 카카오맵을 이용한 위치 검색 및 위치 정보 저장
  - Firebase Database, Firebase Storage에 글과 이미지 업로드 및 연동
  - 이미지 드래그 첨부 기능 구현
  - React-quill 에디터 사용

## 🖥 PREVIEW - **WEB**

## 💻 PREVIEW - **TABLET**

## 📱 PREVIEW - **MOBILE**

## ⚙ TECHNOLOGIES

![HTML Badge](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS Badge](https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Javascript Badge](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Badge](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript Badge](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black)
![FirebaseBadge](https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)

## 📚 LIBRARY
- KakaoMap
- React-quill
- React-icons
- moment.js