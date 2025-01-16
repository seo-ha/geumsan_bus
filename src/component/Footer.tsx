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
    span {display:block; margin-top:7px; font-size: 1.2rem;font-weight:500; color: #ccc;}

    &.on {
      svg {stroke: #fff; fill:#fff;}
      span {color:#fff; }
    }
  }
`

const Footer:React.FC = () => {

    const [activeLink, setActiveLink] = useState<string>('')
    const links = document.querySelectorAll('footer a');
    const location = useLocation();

    function onClickLink(event){
      
      const target = event.currentTarget;
      
      links.forEach(item => item.classList.remove('on'))
      target.classList.add('on')
      setActiveLink(target.getAttribute('href'))
      
    }

    useEffect(() => {
      const currentPrams = location.pathname; // URL 쿼리 가져오기
      setActiveLink(currentPrams);
    }, [location]);

  
  return (
    <FooterStyle>
        <Link to={'/geumsan_bus/'} className={activeLink === '/geumsan_bus/' ? "on" : ""} onClick={onClickLink}> {activeLink === '/' ? < IoBus/> : < IoBusOutline/> } <span>시외/고속</span></Link>
        <Link to={'/geumsan_bus/Express'} className={activeLink === '/geumsan_bus/Express' ? "on" : ""} onClick={onClickLink}> {activeLink === '/Express' ? < IoBus/> : < IoBusOutline/> } <span>공공버스</span></Link>
        <Link to={'/geumsan_bus/Citybus'} className={activeLink === '/geumsan_bus/Citybus' ? "on" : ""} onClick={onClickLink}>{activeLink === '/Citybus' ? < IoBus/> : < IoBusOutline/> } <span>시내버스</span></Link>
        <Link to={'/geumsan_bus/Weather'} className={activeLink === '/geumsan_bus/Weather' ? "on" : ""} onClick={onClickLink}>{activeLink === '/Weather' ? < PiCloudSunFill/> : < PiCloudSunBold/> } <span>날씨</span></Link>
    </FooterStyle>
  )
}

export default Footer