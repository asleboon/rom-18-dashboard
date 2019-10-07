import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(123deg, #f3f3f3 78%, #ff7000 22%);
`;


interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  )
};

export default Layout;
