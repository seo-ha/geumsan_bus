import React from 'react'
import styled from 'styled-components';

const LoadingStyle = styled.div `
    display: flex; align-items: center; justify-content:center; height: calc(100dvh - 64px); padding-bottom: 80px;
    img {width: 180px}
`;

const Loading:React.FC = () => {
  return (
    <LoadingStyle><img src={process.env.PUBLIC_URL+'/img/logo.svg'} alt="" /></LoadingStyle>
  )
}

export default Loading