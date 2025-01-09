import React, {useState} from 'react'
import { Link } from 'react-router-dom';
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

    function onClickLink(event){

        const target = event.currentTarget;
        const links = document.querySelectorAll('footer a');

        links.forEach(item => item.classList.remove('on'))
        target.classList.add('on')
        setActiveLink(target.getAttribute('href'))
        
    }

  return (
    <FooterStyle>
        <Link to={'/'} className='on' onClick={onClickLink}> {activeLink === '/' || activeLink === '' ? < IoBus/> : < IoBusOutline/> } <span>시외</span></Link>
        <Link to={'expressBus'} onClick={onClickLink}> {activeLink === '/expressBus' ? < IoBus/> : < IoBusOutline/> } <span>고속</span></Link>
        <Link to={'cityBus'} onClick={onClickLink}>{activeLink === '/cityBus' ? < IoBus/> : < IoBusOutline/> } <span>시내</span></Link>
        <Link to={'weather'} onClick={onClickLink}>{activeLink === '/weather' ? < PiCloudSunFill/> : < PiCloudSunBold/> } <span>날씨</span></Link>
    </FooterStyle>
  )
}

export default Footer