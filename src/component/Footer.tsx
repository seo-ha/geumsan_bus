import React, {useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IoBusOutline ,IoBus} from "react-icons/io5";
import { PiCloudSunBold, PiCloudSunFill } from "react-icons/pi";

const FooterStyle = styled.footer `
  position:fixed; bottom:0; left:0; width:100%; height:80px; padding: 0 8px; display: flex; background-color: #1c486f;

  a {
    display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; height: 100%; 

    svg {stroke: #ccc; fill:#ccc; font-size: 2.5rem;}
    span {display:block; margin-top:7px; font-size: 1.3rem;font-weight:500; color: #ccc;}

    &.on {
      svg {stroke: #fff; fill:#fff;}
      span {color:#fff; }
    }
  }
`

const Footer:React.FC = () => {

    const [activeLink, setActiveLink] = useState<string>('')
    const links = document.querySelectorAll('footer a');

    function onClickLink(event){
      
      const target = event.currentTarget;
      
      links.forEach(item => item.classList.remove('on'))
      target.classList.add('on')
      setActiveLink(target.getAttribute('href'))
      
    }

    // function checkPrams(links, prams) {
    //   links.forEach((el)=>{
    //     let getAttr = el.getAttribute('href');
    //     if(prams.search === getAttr) {
    //       links.forEach(item => item.classList.remove('on'))
    //       el.classList.add('on');
          
    //     }
    //   })
    // }

    const location = useLocation();
    useEffect(() => {
      const currentPrams = location.pathname; // URL 쿼리 가져오기
      setActiveLink(currentPrams);
    }, [location]);

    

  return (
    <FooterStyle>
        <Link to={'/'} className={activeLink === '' ? "on" : ""} onClick={onClickLink}> {activeLink === '/' || activeLink === '' ? < IoBus/> : < IoBusOutline/> } <span>시외/고속</span></Link>
        <Link to={'expressBus'} className={activeLink === '/expressBus' ? "on" : ""} onClick={onClickLink}> {activeLink === '/expressBus' ? < IoBus/> : < IoBusOutline/> } <span>공공버스</span></Link>
        <Link to={'cityBus'} className={activeLink === '/cityBus' ? "on" : ""} onClick={onClickLink}>{activeLink === '/cityBus' ? < IoBus/> : < IoBusOutline/> } <span>시내버스</span></Link>
        <Link to={'weather'} className={activeLink === '/weather' ? "on" : ""} onClick={onClickLink}>{activeLink === '/weather' ? < PiCloudSunFill/> : < PiCloudSunBold/> } <span>날씨</span></Link>
    </FooterStyle>
  )
}

export default Footer