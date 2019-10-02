import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  /*background-image: linear-gradient(to right bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);*/
  background-image: radial-gradient(
    circle,
    #574833,
    #5a452a,
    #5e4121,
    #613d18,
    #65380f,
    #723b0b,
    #7f3e07,
    #8d4003,
    #a84c02,
    #c45801,
    #e16401,
    #ff7000
  );
`;

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;
