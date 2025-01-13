import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {weatherDescKo} from '../json/weatherKo.ts'
import Loading from './Loading.tsx';
import styled from 'styled-components';

const Container = styled.ul `
  display:flex; justify-content:space-between; align-content:flex-start; gap:10px 10px; flex-wrap:wrap; height: calc(100dvh - 64px); padding: 30px 20px 120px; background-color: #f1f1f1; overflow-y: auto;
`

const WeatherBox = styled.li `
   
  position:relative; width: calc(50% - 5px); height:auto; padding:20px; text-align:center; background-color: #fff; border-radius: 10px;

  h2 {font-size:1.3rem;}
  strong {display:block; margin:5px auto; font-size:2rem; font-weight:600;}
  p {
     font-size:1.3rem;
     &.ico img {width:55px;}
     &.humidity {}
     &.tempNum {display:block; margin:5px 0;}
     &.info {}
  } 
  
  &.full {
    width: 100%; padding: 25px 20px;
    h2 {font-size:1.5rem;}
    strong {font-size:3.8rem;}
    p {font-size:1.5rem;}
    span {position:absolute; top:15px; right:15px; font-size:1.3rem; color:#999999;}
  }
`

const Weather:React.FC = () => {

  const [loading , setLoading] = useState<boolean>(true); //로딩
  const [currPosition, setCurrPosition] = useState<{lat:number; lon:number} | null>(null);//현재 위치
  const [data , setData] = useState<[]>([]); //데이터

  async function setWeather() {

    if (!currPosition) return;//위치를 받아오지 못했다면 리턴

    try {
      const APP_KEY = process.env.REACT_APP_WEATHER_KEY;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currPosition.lat}&lon=${currPosition.lon}&appid=${APP_KEY}`);
      
      const middayData = response.data.list.filter((el) => {
        const time = el.dt_txt.split(' ')[1];
        return time === '15:00:00';
      });

      setData(middayData)
      setLoading(false)
      
    } catch (error) {
      console.log('error', error);
    }
  } 

  //내 위치 찾기
  const getLocation = () =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setCurrPosition({
        lat : position.coords.latitude, 
        lon : position.coords.longitude
      })
    })
  }
 
  useEffect(()=>{
    getLocation();
  },[])

  useEffect(()=>{
    if(currPosition){
      setWeather();
    }
  },[currPosition])
  
  //코드 받아와서 번역된 텍스트 찾기 
  const CodeKoText = (code:number)=>{
    return weatherDescKo.find((el) => el[code])?.[code];
  }

  return (

    loading === false ? //로딩 확인

      <Container>

        {
          data.map((item:any,idx:number)=>{
            return <WeatherBox key={idx} className={idx === 0 ? 'full' : ''}>
              {
                idx === 0 ? <span>15:00 기준</span> : ''
              }
              <h2>{item.dt_txt.split(' ')[0]}</h2>
              <strong>{(item.main.temp - 273.15).toFixed(1)}°</strong>
              <p className='ico'><img src={`https://openweathermap.com/img/w/${item.weather[0].icon}.png`} alt="" /></p>
              <p className='humidity'>습도 {item.main.humidity}</p>
              <p className='tempNum'>최고 {(item.main.temp_max - 273.15).toFixed(0)}°  최저 {(item.main.temp_min - 273.15).toFixed(0)}°</p>
              <p className='info'>{CodeKoText(item.weather[0].id)}</p>
            </WeatherBox>
            
          })
        }
         
      </Container>
      : <Loading/>
  )
}

export default Weather