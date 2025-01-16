
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Intercity from './component/Intercity.tsx';
import Express from './component/Express.tsx';
import Citybus from './component/Citybus.tsx';
import Weather from './component/Weather.tsx';
import Footer from './component/Footer.tsx';

const Header =  styled.header `
    position:sticky; top:0; left:0; display:flex; align-items:center; justify-content:space-between; width:100%; height: 64px; padding: 0 20px; background-color:#fff; border-bottom: 1px solid #eaeaea; z-index: 3;

    h1 {
      display:flex; align-items:center; gap:5px; font-size: 2.1rem; font-weight: 600; letter-spacing: 0.02rem;

      img { width: 25px;}
    }
  `

const App:React.FC = () => {

  return (
    <div className="App">

      <Header>
        <h1>금산버슈 <img src={process.env.PUBLIC_URL+'/img/logo.svg'} alt="" /></h1>
      </Header>

      <Routes>
        <Route path='/' element={<Intercity/>}/>
        <Route path='/Express' element={<Express/>}/>
        <Route path='/Citybus' element={<Citybus/>}/>
        <Route path='/Weather' element={<Weather/>}/>
      </Routes>

      <Footer/>
     

    </div>
  );
}

export default App;
