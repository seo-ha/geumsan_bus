import React from 'react'
import styled from 'styled-components';
import { FaArrowRight } from "react-icons/fa6";

const SelectCityStyle = styled.div `
    display: flex; align-items: center; height: 110px; padding: 0 20px;

    .item {
        display:flex; align-items: center; justify-content: center; flex-direction: column; width: 100%;

        span {display:block; margin-bottom:5px; font-size : 1.4rem;}
        strong {font-size: 2.5rem;}  
    }

    i {
        margin-top: 15px; font-size: 1.5rem; 
        svg {fill:#9d9d9d;}
    }
`;

const Selectcity:React.FC = ({selectCity, setSelectTerminal}) => {

  return (
    <SelectCityStyle>
        <div className='item' onClick={() => setSelectTerminal({state: "depBtn", active:true})}>
            <span>출발</span>
            <strong>{selectCity.depCity}</strong>
            
        </div>
        <i><FaArrowRight/></i>
        <button className='item' onClick={() => setSelectTerminal({state: "arrBtn", active:true})}>
            <span>도착</span>
            <strong>{selectCity.arrCity}</strong>
        </button>
    </SelectCityStyle>
  )
}

export default Selectcity