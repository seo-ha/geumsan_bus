import axios from 'axios';
import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import Selectcity from './Selectcity.tsx';


const IntercityStyle = styled.div `

`;

const LoadingStyle = styled.div `
    display: flex; align-items: center; justify-content:center; height: calc(100dvh - 64px); padding-bottom: 80px;
    img {width: 180px}
`;



const Intercity:React.FC = () => {

    const [loading , setLoading] = useState(true); 
    const [busData , setBusData] = useState([]); 

    async function fetchData() {
        try {

        const url = 'http://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo';
        const url2 = 'http://apis.data.go.kr/1613000/SuburbsBusInfoService/getStrtpntAlocFndSuberbsBusInfo';
        // const url = 'http://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndSuberbsBusInfo'
        const API_KEY = 'B7EeyQ47OTEanhCPm2iAOgY6MFQ00RK+II5Q6HZmS89+U5cX19NNRA2PXlCMX4+54521S9yFj8JDVJNzWBiU2A=='

        const params = {
            serviceKey: API_KEY,
            pageNo: '1',
            numOfRows: '15',
            _type: 'json', // JSON 형태로 응답받기
            // depTerminalId: 'NAEK330', // 출발 터미널 ID
            depTerminalId : "NAI3273501", //시외버스 금산
            depPlandTime: '20240108', // 출발 날짜,
            // arrTerminalId: 'NAEK300', // 도착 터미널 ID
            // arrTerminalId : "NAI3271401", //시외버스 대전복합
            terminalNm : '마전'
        };

        const response = await axios.get(url, { params });

        const response2 = await axios.get(url2, { params });

        setBusData(response2.data.response.body.items.item);
        console.log(response.data.response.body.items.item);
        console.log(response2.data.response.body.items.item);
        
     
        setLoading(false)
        

        } catch (error) {
        console.log('error=>',error.response);
        }
    }

  const newSetDate = (date) => {
    date = String(date);
    console.log(date);
    
    const year = date.slice(0,4);
    const month = date.slice(4,6);
    const day = date.slice(6,8);
    const hour = date.slice(8,10);
    const minute = date.slice(10,12);
   
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`
  }

  useEffect(() => {
      fetchData();
  }, []);

  return (
    
    loading === false ? //로딩 확인

    <IntercityStyle className='intercity'>

        <Selectcity/> 

        {

            busData.map((item, idx) => {
            return <div key={idx}>
                <p>{item.depPlaceNm}</p>
                <p>{ newSetDate(item.depPlandTime) }</p>
                <br></br>
                <p>{item.arrPlaceNm}</p>
                <p>{ newSetDate(item.arrPlandTime) }</p>
                <hr></hr>
            </div>
            })
        }

    </IntercityStyle>

    : <LoadingStyle><img src={process.env.PUBLIC_URL+'/img/logo.svg'} alt="" /></LoadingStyle> 
       
  )
}

export default Intercity