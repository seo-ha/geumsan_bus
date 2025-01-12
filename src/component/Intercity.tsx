import axios from 'axios';
import React,{useEffect,useState} from 'react'
import styled, { css } from 'styled-components';
import Selectcity from './Selectcity.tsx';
import intercityjson from '../json/intercity.json'
import Loading from './Loading.tsx';

//container
const Container = styled.div `
    padding-bottom: 100px;

    .time {
        span {display:inline-block;}
    }
`;

//팝업 스타일
const SelectPop = styled.div `
    position: fixed; top: 0; left: 0; width: 0; height: 0; overflow:hidden; z-index: 1;transition: .3s; 

    .bg {
        position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; background-color: rgba(0,0,0,0.5);transition: .3s; }

    .inner { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); grid-template-columns:repeat(3,1fr); grid-auto-rows:40px; gap:10px; width: 90%; height: 300px; max-height:80dvh; padding: 20px; background: #fff; border-radius: 10px;
    
        button {
            position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 40px; border: 1px solid #ccc; border-radius: 5px; font-size: 1.5rem;
        }
    }

    ${
        (props)=> props.$isvisibel === 'true' ? css`
            
            {opacity: 1; pointer-events: all;}
            .bg {opacity: 1; pointer-events: all;}
            .inner {display:grid;}
        
        ` : css`
            {opacity: 0; pointer-events: none;}
            .bg {opacity: 0; pointer-events: none;}
            .inner {display:none;}
        `
    } 
`
//버스 리스트 스타일
const BusInfo = styled.ul `
  
    padding: 10px 20px 0;

    li {
        position:relative; padding:20px 15px; border: 1px solid #eaeaea; background-color: #fff; box-shadow: 0 0 0.8rem rgba(0,0,0,0.15); border-radius: 5px;

        & + li {margin-top:15px;}

        p {
            
            &.name {display:block; margin-bottom:3px; font-size:2.2rem; font-weight:500;}
            &.charge { display:block; margin-bottom:15px; font-size:2rem; text-align:right; font-weight:500; letter-spacing:-0.05rem; }
            &.time { 
                padding:15px 12px 12px; background-color:#f1f1f1; border-radius:5px; font-size:1.6rem; 

                small {display:block; margin-bottom:15px; font-size:1.4rem; color:#777;}
                span {
                    display:block; font-size: 1.6rem; color:#333;
                    & + span { margin-top:8px; padding-top:8px; border-top:1px solid #d7d7d7;}
                }
            }
            &.destination {display:block; margin:5px 0 8px;font-size: 1.5rem;}  
        }
    }
  
`
//버스 등급 스타일
const GradeNm = styled.p<{$fontcolor : string}> `
    position:absolute; top:15px; right:15px; color : ${(props)=>props.$fontcolor}; font-size: 1.4rem;
`

const Intercity:React.FC = () => {

    const [loading , setLoading] = useState<boolean>(true); //로딩
    const [busData , setBusData] = useState<[]>([]); //전체 버스 노선을 담은 배열
    const [selectTerminal , setSelectTerminal] = useState<string>('false'); 
    const [selectCity, setSelectCity] = useState<string>('선택'); //선택한 도착 터미널
    const [selectBusData , setSelectBusData] = useState<[]>([]); //선택한 버스 노선을 담은 배열

    async function fetchData() {

        try {
            
            const APP_KEY = process.env.REACT_APP_ERMINAL_KEY;
            const busDataBox : any = [];
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
                
                responseData.forEach(el => busDataBox.push(el));
            }
            
            intercityjson.forEach((ele)=> busDataBox.push(ele));

            setBusData(busDataBox)
            setSelectBusData(busDataBox)
            setLoading(false)

        } catch (error) {
            console.log('error=>',error);
        }

    }

    //받아온 데이터에서 시,분만 자르기
    const newSetDate = (date:string) => {
        const hour = String(date).slice(8,10);
        const minute = String(date).slice(10,12);
    
        return `${hour}시 ${minute}분`;
    }


    useEffect(() => {
        fetchData();
    }, []);

    //팝업 안에 tags 클릭했을 때
    document.querySelectorAll('.selectPop button').forEach(ele => {
        ele.addEventListener('click',function(){
            setSelectCity(this.innerText);
            setSelectTerminal(undefined);

            setSelectBusData( busData.filter(el => el.arrPlaceNm === this.innerText) )
            
        })
    });

    return (
        
        loading === false ? //로딩 확인

        <Container>

            <Selectcity selectCity={selectCity} setSelectTerminal={setSelectTerminal}/> 

            <BusInfo className='listBox'>
                {
                    selectBusData.map((item:any, idx : number) => {
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
                                            ? item.times.map((el, idx) => <span key={idx}>{el}</span>) 
                                            : newSetDate(item.depPlandTime) 
                                        }
                                        {item.arrPlandTime ? ` - ` : ''}
                                        {
                                            item.arrPlandTime ? newSetDate(item.arrPlandTime) : ''
                                        }
                                    </p>
                                </li>
                        })
                }
            </BusInfo>

            <SelectPop className='selectPop' $isvisibel={selectTerminal === 'true' ? 'true' : undefined}>
                <div className="bg"></div>
                <div className="inner">
                    {
                        busData.filter((el,idx) => idx === busData.findIndex(item=> item.arrPlaceNm === el.arrPlaceNm))
                       .map((item, idx)=> <button key={idx}>{item.arrPlaceNm}</button>)
                    }
                </div>
            </SelectPop>

        </Container>

        : <Loading/> 
        
    )
}

export default Intercity