# 백오피스 프로그램 - foodOrder

## 개요
이 프로젝트는 Node.js 와 EXpress.js를 사용하여 음식 배달 서비스를 구현하는 과제입니다.

## 기술 스택
- **Node.js** :자바스크립트 실행 환경
- **Express.js** : Node.js 웹 애플리케이션 프레임워크
- **MySQL** : 관계형 데이터베이스 (Prisma를 통해 사용)
-  **JEST** : Test 프레임워크
-  **NodeMailer**: 메일 전송할 수 있는 라이브러리

## 와이어프레임
![image](https://github.com/user-attachments/assets/8240262e-fa01-461c-8333-a4d42f81c9e0)

## ERD
![image](https://github.com/user-attachments/assets/3ed97578-28b4-4ab2-9dc9-f2a54c8ca4b1)

## 프로젝트 설치 및 실행

## 요구 사항

- Node.js
- yarn
- MySQL

### 설정

1. **환경 변수 설정**
   '.env' 파일 생성, 아래 환경 변수 설정.
   
   ```plaintext
   DATABASE_URL="mysql://root:990211@localhost:3306/food_order_db"
   JWT_SECRET="MY_JWT_SECRET_KEY"

   user = 'coconarooroo@gmail.com'
   pass = 'vjrb vbow xwas ugyz'

   SESSION_KEY = 'your-secret-key'

   PORT = 7777
   ```
   
2. **서버 실행**

   ```bash
   yarn run dev
   ```
   
3. **의존성 설치**

   ```bash
   yarn install
   ```
   
## Store Ranking에 대하여

### 사고의 흐름
프로젝트 필수 구현 이후 음식점 랭킹 기능을 추가하여 구현하였습니다.

### 조건

**1.“고객님” 혹은 “사장님”으로 로그인 완료 시 메인 페이지에 음식점 랭킹을 보여줄 수 있어야 합니다.**

**2. 음식점 랭킹은 순수하게 매출액 기준으로 집계를 합니다.**

### 구현
가게를 모두 조회 한 후 가게의 매출순을 내림차 순으로 정렬하였습니다.
