import React from "react";

export interface BusItem {
    depPlaceNm: string;
    arrPlaceNm: string;
    gradeNm: string;
    destination?: string;
    charge: string | number;
    depPlandTime: string;
    arrPlandTime?: string;
    times?: string[];
    info?:[info]
}

export interface info {
    num:string;
    times:string;
    destination : string
}

export interface CitySelection {
    depCity : string;
    arrCity : string;
}

export interface TerminalState {
    state : string;
    active : boolean;
}

export interface BusData {
    depPlaceNm : string;
    arrPlaceNm : string;
    [key:string] : any
}

export function handleSelectButton (
    text : string,
    selectCity : CitySelection,
    setSelectCity:React.Dispatch<React.SetStateActive<TerminalState>>,
    selectTerminal: TerminalState,
    setSelectTerminal: React.Dispatch<React.SetStateAction<TerminalState>>
) {
    if(selectTerminal.state === 'arrBtn'){
        if(text !== selectCity.depCity) {
            setSelectCity({
                arrCity:text,
                depCity:selectCity.depCity,
            });
        }
    } else if (selectTerminal.state === 'depBtn') {
        if (text !== selectCity.depCity) {
          setSelectCity({
            arrCity: selectCity.arrCity,
            depCity: text,
          });
        }
    }
    setSelectTerminal({state : selectTerminal.state, active:false})
}

// 리스트 필터링 함수
export function filterBusData(
    busData: BusData[],
    citys: CitySelection,
    setSelectBusData: React.Dispatch<React.SetStateAction<BusData[]>>
  ) {
    const filteredData = busData.filter(
      (el) => el.arrPlaceNm === citys.arrCity && el.depPlaceNm === citys.depCity
    );
    setSelectBusData(filteredData);
  }