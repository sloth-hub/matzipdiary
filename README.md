# 맛집일기 matzip diary

> **맛집 리뷰를 일기처럼 프라이빗하게 쓰고 볼 수 있는 웹 서비스 입니다.** <br>
카카오맵 api를 이용해 가게 검색, 위치 정보를 저장하고 react-quill 에디터로 자유롭게 글을 쓸 수 있습니다.

## 🔗 **SITE LINK**
https://sloth-hub.github.io/matzipdiary/

<p>테스트용 ID : test01@test.com</p>

테스트용 PW : test1234!!

## ⚙ **TECHNOLOGIES**

![HTML Badge](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS Badge](https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Javascript Badge](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Badge](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript Badge](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black)
![FirebaseBadge](https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)

## 📚 **LIBRARY**
- KakaoMap
- React-quill
- React-icons
- moment.js

## 📄 **FEATURES**

- ### / - 메인 페이지
    - 프로필 이미지 클릭시 회원정보, 로그아웃 팝업 활성화
    - 작성일순, 방문일순, 별점순 정렬
    - 업종 카테고리 정렬
    - 이미지 레이지 로딩
    - 페이지네이션 (더보기 버튼)

- ### /login - 로그인 페이지
  - Firebase 이메일 로그인, sns 로그인 (구글, 깃허브)
  - 이메일, 비밀번호 불일치 및 유저 정보 없음 처리

- ### /signup - 회원가입 페이지
  - 정규식을 이용한 이메일, 닉네임, 비밀번호 예외처리
  - Firebase Database에 유저정보 저장

- ### /note/:id - 상세 페이지
  - 이미지 슬라이드 및 크게보기
  - 맵 아이콘 클릭시 해당 주소가 찍힌 카카오맵으로 이동
  - 일기 수정, 삭제 기능

- ### /write - 일기 작성 페이지
  - 카카오맵을 이용한 위치 검색 및 위치 정보 가져오기
  - 이미지 드래그 첨부
  - 별점 매기기
  - React-quill 에디터를 사용한 글쓰기
  - Firebase Database에 일기 데이터 저장, Firebase Storage에 이미지 업로드 및 연동

- ### /note/:id/write - 일기 수정 페이지
  - 이전 페이지 일기 데이터 표시
  - 수정된 일기 데이터를 Firebase Database에 다시 저장

## 🖥 PREVIEW, DETAIL - **WEB**

![matzipdiary_detail_1](https://github.com/user-attachments/assets/5e5cb55a-7c79-42d3-9a18-7aa816566d4b)
![matzipdiary_detail_2](https://github.com/user-attachments/assets/d8abfc86-fc77-4fb2-a4e0-18101e772d12)
![matzipdiary_detail_3](https://github.com/user-attachments/assets/c7a23ad1-c058-48aa-93fb-4ff735231eb5)
![matzipdiary_detail_4](https://github.com/user-attachments/assets/604ad417-b058-4aac-aa80-80c1b8abbdee)
![matzipdiary_detail_5](https://github.com/user-attachments/assets/166b1d11-a869-4beb-8796-70d3f26647f3)

## 💻 PREVIEW - **TABLET**
![matzipdiary_tablet](https://github.com/user-attachments/assets/d28e35fd-9857-4d09-bdef-281322d3ff85)

## 📱 PREVIEW - **MOBILE**
![matzipdiary_mobile](https://github.com/user-attachments/assets/03b2d132-3396-4944-9fa5-36c49564b4bd)

