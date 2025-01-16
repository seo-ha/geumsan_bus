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
  span {position:absolute; top:10px; right:10px; font-size:1.2rem; color:#999999;}
  p {
     font-size:1.3rem; word-break: keep-all;
     &.ico img {width:50px;}
    } 
  
  &.full {
    width: 100%;
    h2 {font-size:1.5rem;}
    strong {font-size:3.8rem;}
    p {font-size:1.5rem;}
  }
`

const Weather:React.FC = () => {

  const [loading , setLoading] = useState<boolean>(true); //로딩
  const [currPosition, setCurrPosition] = useState<{lat:number; lon:number} | null>(null);//현재 위치
  const [data , setData] = useState<[]>([]); //데이터
  const [todayData , setTodayData] = useState<[]>([]); //데이터

  async function setWeather() {

    if (!currPosition) return;//위치를 받아오지 못했다면 리턴

    try {
      const APP_KEY = process.env.REACT_APP_WEATHER_KEY;
      const responseToday = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currPosition.lat}&lon=${currPosition.lon}&appid=${APP_KEY}&units=metric&lang=kr`);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currPosition.lat}&lon=${currPosition.lon}&appid=${APP_KEY}&units=metric&lang=kr`);

      const middayData = response.data.list.filter((el) => {
        const time = el.dt_txt.split(' ')[1];
        return time === '15:00:00';
      });
      
      setTodayData(responseToday.data)
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

        <WeatherBox className='full'>
          <h2>오늘</h2>
          <strong>{(todayData.main.temp).toFixed(1)}°</strong>
          <p className='ico'><img src={`https://openweathermap.com/img/w/${todayData.weather[0].icon}.png`} alt="" /></p>
          <p className='info'>{CodeKoText(todayData.weather[0].id)}</p>
        </WeatherBox>

        {
          data.map((item:any,idx:number)=>{
            if(idx !== 0) {
              return <WeatherBox key={idx}>
                <h2>{item.dt_txt.split(' ')[0]}</h2>
                <p className='ico'><img src={`https://openweathermap.com/img/w/${item.weather[0].icon}.png`} alt="" /></p>
                <p className='info'>{CodeKoText(item.weather[0].id)}</p>
              </WeatherBox>
            } else {return false;}
            
          })
        }
         
      </Container>
      : <Loading/>
  )
} 

export default Weather