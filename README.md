<div style="font-size: 36px; font-weight: bold;">
clear-closet
</div>

<br>

<details>
<summary style="font-size: 18px; font-weight: bold;">수행 배경</summary>
<div markdown="1">
## [ 프로젝트 주제 ]

옷장 정리 프로젝트 - 판매는 비싸게, 구입은 저렴하게!

(놀부심보 프로젝트)

## [ 기획 배경 ]** 

옷장 속에 오랫동안 입지 않은 묵은 의류들, 결국에는 의류 수거함에 넣게 되는 경우가 많습니다. 이러한 문제를 해결하기 위해 저희는 중고 의류 거래에 AI기술을 도입하였습니다. 사용자들에게 보다 효율적인 거래 환경을 제공함으로서 두 가지 문제를 해결하고자 합니다.

1. **무분별하게 버려지는 의류**
    
    많은 사람들이 입지 않는 옷을 버리거나 방치하는 경우가 많습니다. 이는 자원 낭비와 환경 오염의 원인이 됩니다.
    
     → AI를 이용하여 옷의 가격를 책정하고, 적절한 가격으로 중고 거래를 촉진함으로써 자원 낭비를 줄입니다.
    
2. **AI 의류 인식 기술로 시간 절약** 
    
    중고 옷 거래 시 비슷한 스타일의 옷을 찾는데 많은 시간이 소요됩니다.
    
    → AI 기반 스타일 매칭 알고리즘을 도입하여 사용자가 원하는 스타일의 옷을 빠르고 정확하게 찾을 수 있도록 돕습니다.
    

## [ 목표 ]
1. AI 기술의 합리적 가격 제시로 판매자와 구매자의 만족도 상승
2. 판매자 → 사진을 올리면 AI가 가격을 책정한 후 판매자의 동의 하에 가격 설정되고,
    추가적인 내용이 필요한 판매자는 설명을 작성할 수 있도록 합니다. 
3. 구매자 → 원하는 의류의 사진을 게시하면, DB를 통해 비슷한 의류를 자동으로 보여
    주고 구매의향이 있는 판매자와의 연결을 돕도록 합니다.
4. 관리자 → 과소비로 인한 사회적, 환경적 문제를 해결하고, 합리적인 거래 플랫폼을 사
    용자들에게 제공합니다.

## [ 주요 기능 ]
1. 중고  의류 거래 (판매 & 구매)
2. 의류 추천 시스템 (중고 의류 & 새 상품)
3. 거래 가격 자동 책정 AI 기술
4. 지역 커뮤니티 기능
5. 구매 문의 알람 기능
6. 안전한 거래를 위한 판매자 조회 기능 
7. 회원 정보 기능 - 로그인(간편 로그인), 회원가입 및 탈퇴, 마이페이지, 구매 및 판매 내역 목록

</div>
</details>

<hr>
<br>

<details>
<summary style="font-size: 18px; font-weight: bold;">컨벤션</summary>
<div markdown="1">

## **컨벤션 관리**

### 브랜치명

- ex) **feat/{이슈 키}-{BE/FE}-{이슈 요약}**
- **master** / **main** - 제품으로 출시 및 배포가 가능한 상태인 브랜치 → 최종 결과물 제출 용도
- **develop** - 다음 출시 버전을 개발하는 브랜치 → 기능 완성 후 중간에 취합하는 용도
- **feature** - 각종 기능을 개발하는 브랜치 → feat/login, feat/join 등으로 기능 분류 후 작업
- **hotfix** - 출시 버전에서 발생한 버그를 수정하는 브랜치

### Commit

- **Init**
    - 새로 브랜치를 생성하여 처음으로 커밋을 하는 경우
    - (예) `Init: Create feat/S09P11A203-52-document-scan branch`
- **Chore**
    - 그래들(Gradle) 또는 `package.json` 파일에 의존성을 추가하거나 수정하는 경우
    - 도커(Docker) 파일을 추가하거나 수정하는 경우
    - 기타 설정 파일을 추가하거나 수정하는 경우
    - (예) `Chore: Add env.yml file`
- **Feat**
    - 새로운 기능을 추가한 경우
    - CSS 또는 스타일을 수정한 경우
    - (예) `Feat: Add document scan feature`
- **Fix**
    - 버그를 고친 경우
    - 급하게 치명적인 버그를 고쳐야 하는 경우
    - (예) `Fix: Modify word addition bug`
- **Merge**
    - 브랜치에서 기능 구현 완료 후 다른 브랜치와 통합하는 경우
    - (예) `Merge: Merge feat/S09P11A203-52-document-scan branch to develop branch`
- **Refactor**
    - 효율적인 코드를 위해 코드 수정 및 리팩토링을 진행한 경우
    - 파일을 삭제하는 작업만 수행하는 경우
    - 파일, 폴더명을 수정하거나 옮기는 작업만 진행한 경우
    - (예) `Refactor: Modify folder structure`
- **Test**
    - 기능에 대한 테스트 코드를 작성하는 경우
    - (예) `Test: Add funding test code`

</div>
</details>

<hr>
<br>

<details>
<summary style="font-size: 18px; font-weight: bold;">명세서</summary>
<div markdown="1">

[요구사항 정의서](https://www.notion.so/7f159ce1e6eb43858891f4fd26317189?pvs=21)  
[기능 명세서](https://www.notion.so/964b0520ee4646188cb94e0b9fc5387b?pvs=21)  
[**ERD**](https://www.erdcloud.com/d/53ceCuGvDutkGREKx)  
[API 명세서](https://www.notion.so/54d1234ab07e4234be30d89afd116e2f?pvs=21)  
[화면 명세서](https://www.figma.com/design/x8CNcM9SLs7MjAymVrHUBB/Clear-Closet-Project?node-id=0-1&t=nBmW33Xr95C9nooL-1)  

</div>
</details>
