import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { NavLink } from 'react-router-dom';
import moment from 'moment'


interface LinkTextProps {
  isActive: boolean;
}

const HeaderContainer = styled(animated.div)`
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const Link = styled(NavLink)`
  color: white;
  font-size: 20px;
  text-decoration: none;
  padding: 0 10px;
  color: white;
`;

const LinkText = styled.p`
  color: white;
  font-size: 20px;
  text-decoration: none;
  padding: 0 10px;
  color: white;
  position: relative;
`;

const BorderBottom = styled.div`
  width: 50px;
  border-bottom: ${(p: LinkTextProps) => p.isActive ? '2px solid white' : 'none'}
  position: absolute;
  bottom: -10px;
  transform: translate(-50%,0);
  left: 50%;
`

const Header: React.FC = () => {
  let currentLocation = window.location.pathname;
  const headerProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const decideIfActive = (str: string) => {
    if (str === currentLocation) {
      return true
    }
    return false
  }

  return (
    <HeaderContainer style={headerProps}>
      <LinkText>
        <Link to="/">Bilde</Link>
        <BorderBottom isActive={decideIfActive('/')} />
      </LinkText>
      <LinkText>
        <Link to="/kollektiv">Kollektiv</Link>
        <BorderBottom isActive={decideIfActive('/kollektiv')} />
      </LinkText>
      <LinkText>
        <Link to="/kart">Kart</Link>
        <BorderBottom isActive={decideIfActive('/kart')} />
      </LinkText>
    </HeaderContainer>
  );
};

export default Header;
