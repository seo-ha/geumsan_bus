import styled from "styled-components"

export const Container = styled.div`
  padding-bottom: 100px;
`
//버스 리스트 스타일
export const BusInfo = styled.ul `
  
    padding: 10px 20px 0;

    li {
        position:relative; padding:20px 15px; border: 1px solid #eaeaea; background-color: #fff; box-shadow: 0 0 0.8rem rgba(0,0,0,0.15); border-radius: 5px;

        & + li {margin-top:15px;}

        p {
            
            &.name {
                display:flex; align-items:center; gap:7px; margin-bottom:3px; font-size:2rem; font-weight:500;

                small { display:inline-flex; padding:4px 7px; font-size:1.6rem; font-weight:500; border-radius:3px; color:#fff; background-color:#569313; }
            }
            &.charge { display:block; margin-bottom:15px; font-size:2rem; text-align:right; font-weight:500; letter-spacing:-0.05rem; }
            &.time { 
                padding:15px 12px 12px; background-color:#f1f1f1; border-radius:5px; font-size:1.6rem; 

                small {display:block; margin-bottom:15px; font-size:1.4rem; color:#777;}
                span {
                    display:block; font-size: 1.6rem; color:#333;
                    & + span { margin-top:8px; padding-top:8px; border-top:1px solid #d7d7d7;}
                }
            }
            &.destination {display:block; margin:8px 0 15px;font-size: 1.5rem;} 
            &:has( + .charge) {margin-bottom:0;} 
        }
    }
  
`
export const Nolist = styled.span `
    display:block; width: 100%; padding-top: 50px; text-align:center; font-size: 1.5rem; color:#888;
`
export const Caption = styled.p `
    display:block; width: 100%; padding:10px 20px; text-align:left; font-size: 1.4rem; color:#830a0a; word-break: keep-all; line-height: 1.3;
`
//버스 등급 스타일
export const GradeNm = styled.p<{$fontcolor : string}> `
    position:absolute; top:15px; right:15px; color : ${(props)=>props.$fontcolor}; font-size: 1.4rem;
`