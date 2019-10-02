import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  max-width: 100vw;
  min-height: 100vh;
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
