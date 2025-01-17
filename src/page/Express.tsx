import React,{useState,useEffect} from 'react'
import Selectcity from '../component/Selectcity.tsx'
import Selectpop from '../component/Selectpop.tsx'
import {BusItem, handleSelectButton, filterBusData, CitySelection, TerminalState } from '../utils/Select.ts';
import {Container,BusInfo,Nolist,Caption} from '../css/style.ts'

const Express:React.FC = () => {

  const publicjson = require('../json/public.json');
  const busData:[BusItem] = publicjson; //전체 버스 노선을 담은 배열
  const [selectBusData , setSelectBusData] = useState<BusItem>(publicjson); //선택한 버스 노선을 담은 배열
  const [selectCity, setSelectCity] = useState<CitySelection>({ //선택한 도착 터미널
      depCity : "금산",
      arrCity : "선택"
  });
  const [selectTerminal , setSelectTerminal] = useState<TerminalState>({//선택한 터미널 정보, 팝업 작동
      state : '',
      active : false
  }); 

  useEffect(() => {
    filterBusData(busData, selectCity, setSelectBusData)
  }, [selectCity,busData]);


  return (
    <Container>

      <Selectcity selectCity={selectCity} setSelectTerminal={setSelectTerminal}/>

      {
        selectCity.depCity !== '금산' ? <Caption>종점 출발 시간이오니 다소 시간이 조발 될 수 있으므로 여유를 가지고 이용해 주시기 바랍니다.</Caption> : ''
      }

      <BusInfo className='listBox'>
          {

            selectCity.arrCity === '선택' 
              ? (busData.map((item:any) => {
                return item.info.map((el:any, idx : number)=>{
                  return <li key={idx}>
                      <p className='name'>{item.depPlaceNm} - {item.arrPlaceNm}</p>
                      <p className='destination'>{ el.destination === '' ? item.destination : el.destination }</p>
                      <p className='time'>{el.times}</p>
                  </li>
                })
              }))

           : selectBusData.length === 0 ? (<Nolist>노선이 없습니다.</Nolist>)

            : (selectBusData.map((item:any) => {
                return item.info.map((el:any, idx : number)=>{
                  return <li key={idx}>
                      <p className='name'>{item.depPlaceNm} - {item.arrPlaceNm}</p>
                      <p className='destination'>{ el.destination === '' ? item.destination : el.destination }</p>
                      <p className='time'>{el.times}</p>
                  </li>
                })
              }))
          }
      </BusInfo>

      <Selectpop busData={busData} selectCity={selectCity} onSelectButton={(e:React.MouseEvent<HTMLButtonElement>)=>{
        const text = e.currentTarget.innerText;
        handleSelectButton(text,selectCity,setSelectCity, selectTerminal, setSelectTerminal)
      }} selectTerminal={selectTerminal}/>

    </Container>
  )
}

export default Express