
import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Intercity from './page/Intercity.tsx';
import Express from './page/Express.tsx';
import Citybus from './page/Citybus.tsx';
import Weather from './page/Weather.tsx';
import Footer from './component/Footer.tsx';
import { BsPatchQuestion } from "react-icons/bs";
import GuidePop from './component/GuidePop.tsx';

const Header =  styled.header `
    position:sticky; top:0; left:0; display:flex; align-items:center; justify-content:space-between; width:100%; height: 64px; padding: 0 20px; background-color:#fff; border-bottom: 1px solid #eaeaea; z-index: 3;

    h1 {
      display:flex; align-items:center; gap:5px; font-size: 2.1rem; font-weight: 600; letter-spacing: 0.02rem;

      img { width: 25px;}
    }

    button {display:inline-block; font-size:2.4rem;}
  `

const App:React.FC = () => {

  const [showGuide, setShowGuide] = useState<boolean>(false);

  return (
    <div className="App">

      <Header>
        <h1>금산버슈 <img src={process.env.PUBLIC_URL+'/img/logo.svg'} alt="" /></h1>

        <button onClick={()=>setShowGuide(true)}><BsPatchQuestion/></button>
      </Header>

      <Routes>
        <Route path='/geumsan_bus/' element={<Intercity/>}/>
        <Route path='/geumsan_bus/Express' element={<Express/>}/>
        <Route path='/geumsan_bus/Citybus' element={<Citybus/>}/>
        <Route path='/geumsan_bus/Weather' element={<Weather/>}/>
      </Routes>
 
      <Footer/>

      <GuidePop setShowGuide={setShowGuide} showGuide={showGuide}/>
     

    </div>
  );
}

export default App;
