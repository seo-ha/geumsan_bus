import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from "react-icons/io5";

const GuidePopStyle = styled.div `
    
    opacity: 0; pointer-events: none; position: fixed; top: 0; left: 0; width: 0; height: 0; overflow:hidden; z-index: 10; transition: .3s; 

    .bg {
        opacity: 0; pointer-events: none; position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; background-color: rgba(0,0,0,0.5);transition: .3s; }

    .inner { display:none; position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 90%; min-height: 300px; max-height:80dvh; padding: 35px 20px; background: #fff; border-radius: 10px;
    
        h2 {display:block; margin-bottom:25px; font-size:2rem; font-weight:500; text-align:center;}
        .closeBtn {position:absolute; top:10px; right:10px; font-size:3.2rem;}

        .tabBox {
            display: flex; align-items: center; gap: 8px;
            button {
                display: block; width: 50%; height: 45px; font-size:1.5rem; border-radius: 5px; border: 1px solid #ddd;
                &.on {background-color:#1c486f; color:#fff; font-weight:500;}
            }
        }

        .content {
            display: none; max-height: calc(100dvh - 345px); margin-top: 35px; padding-bottom:20px; overflow-y: auto;

            li + li {margin-top: 35px;}

            p {word-break:keep-all;}
            span {display:block; margin-top: 8px; font-size: 1.4rem; word-break:keep-all; color:#830a0a;}
            img {display:block; margin-top: 15px; width:100%; border:1px solid #eaeaea; }

            &.active {display:block;}
        }
    }

    &.active {
        opacity: 1; pointer-events: all;
        .bg {opacity: 1; pointer-events: all;}
        .inner {display:block;}
    }

`

const GuidePop:React.FC = ({setShowGuide,showGuide}) => {

    const [tab, setTab] = useState<String>('galaxy');

    const handleChangeTab = (idx : any) => {

        let target = idx.getAttribute('data-rel');
        const $content = document.querySelectorAll('.tabContent .content');

        $content.forEach((el)=> {
            if(el.classList.contains(target)) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        })
    }

  return (
    <GuidePopStyle className={showGuide ? 'active' :''}>
        <div className="bg"></div>

        <div className="inner">
            <h2>홈 화면에 사이트 추가 방법</h2>
            <button className='closeBtn' onClick={()=>setShowGuide(!showGuide)}><IoCloseOutline /></button>

            <div className="tabBox">
                <button onClick={
                    (e)=>{handleChangeTab(e.currentTarget); setTab(e.currentTarget.getAttribute('data-rel'))}
                } data-rel='galaxy' className={tab === 'galaxy' ? 'on' : ''}>갤럭시</button>
                <button onClick={
                    (e)=>{handleChangeTab(e.currentTarget); setTab(e.currentTarget.getAttribute('data-rel'))}
                } data-rel='iphone' className={tab === 'iphone' ? 'on' : ''}>아이폰</button>
            </div>

            <div className='tabContent'>

                <ul className="content galaxy active">
                    <li>
                        <p>step 1. 크롬에서 사이트를 켜서 더보기를 누른다.</p>
                        <img src={process.env.PUBLIC_URL+'/img/guide_galaxy.jpg'} alt="" />
                    </li>
                    <li>
                        <p>step 2. 메뉴 하단에 '홈 화면에 추가' 메뉴를 누른다.</p>
                        <img src={process.env.PUBLIC_URL+'/img/guide_galaxy2.jpg'} alt="" />
                    </li>
                    <li>
                        <p>step 3. 설치를 누르면 사이트 아이콘만 생성이 되고 바로가기 만들기를 누르면 아이콘 아래 크롬 아이콘이 같이 생성된다.</p>
                        <img src={process.env.PUBLIC_URL+'/img/guide_galaxy3.jpg'} alt="" />
                    </li>
                    <li>
                        <p>step 4. 설치가 완료되면 모바일 화면에 바로가기 앱이 생성된다.</p>
                        <span>* 크롬 자동번역을 사용하고 계신 경우 번역을 해제해 주세요.</span>
                        <img src={process.env.PUBLIC_URL+'/img/guide_galaxy4.jpg'} alt="" />
                    </li>
                </ul>

                <ul className="content iphone">
                    <li>
                        <p>step 1. 사파리에서 사이트를 켜서 하단 더보기를 누른다.</p>
                        <img src={process.env.PUBLIC_URL+'/img/guide_iphone.jpg'} alt="" />
                    </li>
                    <li>
                        <p>step 2. 메뉴 하단에 '홈 화면에 추가' 메뉴를 누른다.</p>
                        <img src={process.env.PUBLIC_URL+'/img/guide_iphone2.png'} alt="" />
                    </li>
                    <li>
                        <p>step 3. 설치를 누르면 사이트 아이콘이 생성된다.</p>
                        <img src={process.env.PUBLIC_URL+'/img/guide_iphone3.jpg'} alt="" />
                    </li>
                    <li>
                        <p>step 4. 설치가 완료되면 모바일 화면에 바로가기 앱이 생성된다.</p>
                        <img src={process.env.PUBLIC_URL+'/img/guide_galaxy4.jpg'} alt="" />
                    </li>
                </ul>

            </div>

        </div>

    </GuidePopStyle>
  )
}

export default GuidePop