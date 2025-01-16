import axios from 'axios';
import React,{useEffect,useState} from 'react'
import Selectcity from './Selectcity.tsx';
import Loading from './Loading.tsx';
import Selectpop from './Selectpop.tsx';
import {Container,BusInfo,Nolist,GradeNm} from '../css/style.ts'
import {BusItem, handleSelectButton, filterBusData, CitySelection, TerminalState } from '../utils/Select.ts';

const Intercity:React.FC = () => {

    const [loading , setLoading] = useState<boolean>(true); //로딩
    const [busData , setBusData] = useState<BusItem>([]); //전체 버스 노선을 담은 배열
    const [selectCity, setSelectCity] = useState<CitySelection>({ //선택한 도착 터미널
        depCity : "금산",
        arrCity : "선택"
    });
    const [selectTerminal , setSelectTerminal] = useState<TerminalState>({//선택한 터미널 정보, 팝업 작동
        state : '',
        active : false
    }); 
    const [selectBusData , setSelectBusData] = useState<[]>([]); //선택한 버스 노선을 담은 배열
    const intercityjson : BusItem[] = require('../json/intercity.json')

    async function fetchData() {

        try {
            
            const APP_KEY = process.env.REACT_APP_ERMINAL_KEY;
            const busDataBox : BusItem[] = [];
            let url = ['http://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo','http://apis.data.go.kr/1613000/SuburbsBusInfoService/getStrtpntAlocFndSuberbsBusInfo'];
            let depTerminal = ['NAEK330', 'NAI3273501'];

            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2,'0');
            const day = String(today.getDate()).padStart(2,'0');
        
            for (let i = 0; i < url.length; i++) {
               
                const params = {
                    serviceKey: APP_KEY,
                    pageNo: '1',
                    numOfRows: '15',
                    _type: 'json',
                    depTerminalId : depTerminal[i], //출발 터미널 id
                    depPlandTime: String(`${year}${month}${day}`), // 출발 날짜,
                    terminalNm : '금산'//터미널 이름
                };
                
                const response = await axios.get(url[i], { params });
                const responseData = response.data.response.body.items.item;
                
                responseData.forEach((el: BusItem) => busDataBox.push(el));
            }
            
            intercityjson.forEach((ele)=> busDataBox.push(ele));

            setBusData(busDataBox)
            setLoading(false)

        } catch (error) {
            console.log('error=>',error);
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterBusData(busData, selectCity, setSelectBusData)
    }, [selectCity,busData]);

    //받아온 데이터에서 시,분만 자르기
    const newSetDate = (date:string) => {
        const hour = String(date).slice(8,10);
        const minute = String(date).slice(10,12);
    
        return `${hour}시 ${minute}분`;
    }

    return (
        
        !loading ? //로딩 확인

        <Container>

            <Selectcity selectCity={selectCity} setSelectTerminal={setSelectTerminal}/> 

            <BusInfo className='listBox'>

                {

                    selectCity.arrCity === '선택' 
                    ? (busData.map((item) => {
                        const times = item.times || [null];
                        return times.map((el,idx)=> {
                            return <li key={idx}>
                                <p className='name'>{item.depPlaceNm} - {item.arrPlaceNm}</p>
                                <GradeNm $fontcolor={item.gradeNm === '고속' ? '#a10f0f' : item.gradeNm === '우등' ? '#b5830d' : '#999'}>
                                    {item.gradeNm}
                                </GradeNm>
                                {
                                    item.destination ? <p className='destination'>{item.destination}</p> : ''
                                } 
                                <p className='charge'> {parseInt(item.charge).toLocaleString()}원</p>
                                <p className='time'>
                                    <small>출발시간 {item.arrPlandTime ? ' - 도착시간' : ''}</small>
                                    {
                                        el
                                        ? (<span>{el}</span>)
                                        : newSetDate(item.depPlandTime) 
                                    }
                                    {item.arrPlandTime ? ` - ` : ''}
                                    {
                                        item.arrPlandTime ? newSetDate(item.arrPlandTime) : ''
                                    }
                                </p>
                            </li>
                            }) 
                        }))

                    : selectBusData.length === 0 ? (<Nolist>노선이 없습니다.</Nolist>)

                       : (selectBusData.map((item) => {
                            return item.times.map((el,idx)=> {
                                return <li key={idx}>
                                    <p className='name'>{item.depPlaceNm} - {item.arrPlaceNm}</p>
                                    <GradeNm $fontcolor={item.gradeNm === '고속' ? '#a10f0f' : item.gradeNm === '우등' ? '#b5830d' : '#999'}>
                                        {item.gradeNm}
                                    </GradeNm>
                                    {
                                        item.destination ? <p className='destination'>{item.destination}</p> : ''
                                    } 
                                    <p className='charge'> {parseInt(item.charge).toLocaleString()}원</p>
                                    <p className='time'>
                                        <small>출발시간 {item.arrPlandTime ? ' - 도착시간' : ''}</small>
                                        {
                                            item.times 
                                            ? (<span>{el}</span>)
                                            : newSetDate(item.depPlandTime) 
                                        }
                                        {item.arrPlandTime ? ` - ` : ''}
                                        {
                                            item.arrPlandTime ? newSetDate(item.arrPlandTime) : ''
                                        }
                                    </p>
                                </li>
                                }) 
                            }))
                }
            </BusInfo>

            <Selectpop busData={busData} selectCity={selectCity} onSelectButton={(e:React.MouseEvent<HTMLButtonElement>)=>{
                const text = e.currentTarget.innerText;
                handleSelectButton(text, selectCity, setSelectCity, selectTerminal, setSelectTerminal)
            }} selectTerminal={selectTerminal}/>

        </Container>

        : <Loading/> 
        
    )
}

export default Intercity