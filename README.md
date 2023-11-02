# 맛집일기 matzip diary

> **맛집 리뷰를 일기처럼 프라이빗하게 쓰고 볼 수 있는 웹 서비스 입니다.** <br>
카카오맵 api를 이용해 가게 검색, 위치 정보를 저장하고 react-quill 에디터로 자유롭게 글을 쓸 수 있습니다.

## 🔗 **SITE LINK**
https://sloth-hub.github.io/matzipdiary/

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

## 📄 **FEATURES**

- ### / - 메인 페이지
    - 프로필 이미지 클릭시 회원정보, 로그아웃 팝업 활성화
    - 작성일순, 방문일순 정렬
    - 업종 카테고리 정렬
    - 이미지 레이지 로딩
    - 페이지네이션

- ### /login - 로그인 페이지
  - Firebase 이메일 로그인, sns 로그인 (구글, 깃허브)
  - 이메일, 비밀번호 불일치 및 유저 정보 없음 처리

- ### /signup - 회원가입 페이지
  - 정규식을 이용한 이메일, 닉네임, 비밀번호 예외처리
  - Firebase Database에 유저정보 저장

- ### /note/:id - 상세 페이지
  - 이미지 슬라이드 및 크게보기
  - 이미지 레이지 로딩
  - 글 수정, 삭제 기능

- ### /write - 일기 작성 페이지
  - 카카오맵을 이용한 위치 검색 및 위치 정보 저장
  - Firebase Database, Firebase Storage에 글과 이미지 업로드 및 연동
  - 이미지 드래그 첨부 기능
  - React-quill 에디터로 글쓰기

- ### /note/:id/write - 일기 수정 페이지
  - 이전 데이터 표시

## 🖥 PREVIEW - **WEB**
### 메인 페이지
![pc_1](https://github.com/sloth-hub/matzipdiary/assets/53851248/43d3eb47-dd96-493a-8115-7697b3d653ed)
### 상세 페이지
![pc_2](https://github.com/sloth-hub/matzipdiary/assets/53851248/d1e202be-cb1c-4898-b20c-618c76d71580)
### 일기 작성 페이지
![pc_3](https://github.com/sloth-hub/matzipdiary/assets/53851248/0e190183-bcf0-4bb6-bcb2-e1995eb1555a)
### 로그인 페이지
![pc_4](https://github.com/sloth-hub/matzipdiary/assets/53851248/f63ba963-5440-4f6f-989f-cd38b8ef8438)
### 회원가입 페이지
![pc_5](https://github.com/sloth-hub/matzipdiary/assets/53851248/dfe2337c-55d5-452d-b032-6d85c8ef88c5)

## 💻 PREVIEW - **TABLET**
### 메인 페이지
![tablet_1](https://github.com/sloth-hub/matzipdiary/assets/53851248/3b1d7cb4-67e7-4558-9cad-a9483cd55961)
### 상세 페이지
![tablet_2](https://github.com/sloth-hub/matzipdiary/assets/53851248/d8ba2a7b-630e-42cb-b1fe-2dac70356b3b)
### 일기 작성 페이지
![tablet_3](https://github.com/sloth-hub/matzipdiary/assets/53851248/e94e6e6f-d2ff-4566-9b65-41747ff507c8)
### 로그인 페이지
![tablet_4](https://github.com/sloth-hub/matzipdiary/assets/53851248/8c71d06a-217b-4f2b-945b-ce073cca9837)
### 회원가입 페이지
![tablet_5](https://github.com/sloth-hub/matzipdiary/assets/53851248/1ecf4499-6e6e-4125-bd93-2d6d6d919fb9)

## 📱 PREVIEW - **MOBILE**
### 메인 페이지
![mobile_1](https://github.com/sloth-hub/matzipdiary/assets/53851248/9b24bd6d-cb5f-4d6a-9481-fa646eaa8b41)
### 상세 페이지
![mobile_2](https://github.com/sloth-hub/matzipdiary/assets/53851248/876a1a65-f9b9-404f-ae25-2beb665d7f08)
### 일기 작성 페이지
![mobile_3](https://github.com/sloth-hub/matzipdiary/assets/53851248/760fa4d1-86e0-4b61-a565-cc14c87a9ea9)
### 로그인 페이지
![mobile_4](https://github.com/sloth-hub/matzipdiary/assets/53851248/7317523e-61db-455c-a69b-c6149a5ffef9)
### 회원가입 페이지
![mobile_5](https://github.com/sloth-hub/matzipdiary/assets/53851248/65408196-ad0c-42e9-aaf6-151da27a5ae5)