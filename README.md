# 금산버슈

![로고](https://github.com/seo-ha/geumsan_bus/blob/master/public/img/web_info_1.jpg)
+ React, typescript, 국토부 api, openWeather.api를 사용한 버스 정보 사이트입니다.
+ 링크 : https://seo-ha.github.io/geumsan_bus/
<br/>

# 목차
+ [홈페이지 설명](#홈페이지-설명)
+ [문제 해결](#문제-해결)
+ [작업 화면](#작업-화면)
<br/>

## 사이트 설명

충청남도 금산의 버스 정보를 담고 있는 사이트입니다.

국토부 api에 등록되어 있는 금산 버스 데이터의 내용이 적어 금산 군청 사이트의 등록된 엑셀 파일을 json으로 만들어 사용하였습니다.

데이터로 가져오는 것이 아니라 유지보수의 힘듦이 있겠지만 고향의 버스 정보를 담은 앱이 없어서 만들었습니다.

+ axios로 국토부 교통 데이터와 날씨 데이터를 받아왔습니다.
+ filter를 사용해 원하는 버스 정보를 찾을 수 있습니다.
+ 출발 장소에 맞춰 도착 장소만 선택할 수 있게 효과를 줬습니다.
+ favicon을 적용해 모바일에서 크롬과 사파리 메뉴 - 홈 화면에 추가를 누르면 앱처럼 적용하게 만들었습니다.
<br/>

## 문제 해결

💥 새로고침을 하면 404 오류가 발생한다. 

🍀 404페이지를 추가해 스크립트를 추가해서 메인페이지로 돌아가게 수정했다.

<br/>

## 작업 화면

### 메인 페이지와 장소 선택
![main](https://github.com/seo-ha/geumsan_bus/blob/master/public/img/web_info_2.jpg)

출발 장소에 맞춰 도착 장소가 있는 장소만 클릭이 가능하게 적용.

<br/>

### 검색화면과 날씨
![work](https://github.com/seo-ha/geumsan_bus/blob/master/public/img/web_info_3.jpg)

버스 번호로 검색이 가능하게 만들었습니다.

OpenWeather.api를 사용해 날씨 정보를 받아와 사용했다.

<br/>

### 홈 화면에 사이트 추가 설명
![home](https://github.com/seo-ha/geumsan_bus/blob/master/public/img/web_info_4.jpg)

크롬과 사파리 더보기 메뉴 '홈 화면에 추가'로 앱 화면에 바로가기 설명 팝업을 작업함.



