import React from 'react'
import styled, { css } from 'styled-components'

const SelectPop = styled.div `
    position: fixed; top: 0; left: 0; width: 0; height: 0; overflow:hidden; z-index: 10;transition: .3s; 

    .bg {
        position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; background-color: rgba(0,0,0,0.5);transition: .3s; }

    .inner { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); flex-wrap:wrap; align-content:flex-start; gap:10px; width: 90%; min-height: 300px; max-height:80dvh; padding: 20px; background: #fff; border-radius: 10px;
    
        button {
            position: relative; display: flex; align-items: center; justify-content: center; width: calc(100% / 3 - 7px); min-height:45px; padding:5px 5px; border: 1px solid #ccc; border-radius: 5px; font-size: 1.4rem;

            &.disabled {background-color:#ddd; color:#888;}
        }
    }

    ${
        (props)=> props.$isvisibel === 'true' ? css`
            
            {opacity: 1; pointer-events: all;}
            .bg {opacity: 1; pointer-events: all;}
            .inner {display:flex;}
        
        ` : css`
            {opacity: 0; pointer-events: none;}
            .bg {opacity: 0; pointer-events: none;}
            .inner {display:none;}
        `
    } 
`

const Selectpop:React.FC = ({busData,selectCity,selectTerminal,onSelectButton}) => {


    const filterArrCity =  busData.filter((el: { depPlaceNm: string  }) => el.depPlaceNm === selectCity.depCity).map(
        (item) => item.arrPlaceNm
    )

  return (
    <SelectPop className='selectPop' $isvisibel={selectTerminal.active === true ? 'true' : undefined}>
        <div className="bg"></div>
        <div className="inner">
            {
                selectTerminal.state === 'arrBtn'

                ?    busData.filter((el,idx) => idx === busData.findIndex((item: { arrPlaceNm: string })=> item.arrPlaceNm === el.arrPlaceNm))
                    .map((item, idx)=> <button key={idx} onClick={(e: any)=>onSelectButton(e)}

                    disabled ={filterArrCity.includes(item.arrPlaceNm) ? false : true}
                    className = {filterArrCity.includes(item.arrPlaceNm) ? '' : 'disabled'}

                    >{item.arrPlaceNm}</button>)

                :   busData.filter((el,idx) => idx === busData.findIndex((item: { depPlaceNm: string })=> item.depPlaceNm === el.depPlaceNm))
                    .map((item, idx)=> <button key={idx} onClick={(e: any)=>onSelectButton(e)} >{item.depPlaceNm}</button>)
            }
        </div>
    </SelectPop>
  )
}

export default Selectpop