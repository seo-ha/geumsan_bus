import React from 'react'
import styled from 'styled-components';
import { FaArrowRight } from "react-icons/fa6";

const SelectCityStyle = styled.div `
    display: flex; align-items: center;

    .item {
        display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; padding: 25px 10px;

        span {display:block; margin-bottom:5px; font-size : 1.5rem;}
        strong {font-size: 2.5rem;}  
    }

    i {
        margin-top: 15px; font-size: 1.7rem; 
        svg {fill:#9d9d9d;}
    }
`;

const Selectcity:React.FC = () => {
  return (
    <SelectCityStyle>
        <div className='item'>
            <span>출발</span>
            <strong>금산</strong>
        </div>
        <i><FaArrowRight/></i>
        <button className='item'>
            <span>도착</span>
            <strong>대전</strong>
        </button>
    </SelectCityStyle>
  )
}

export default Selectcity