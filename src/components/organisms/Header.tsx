import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/nb'

interface LinkTextProps {
  isActive: boolean;
}

const HeaderContainer = styled(animated.div)`
  height: 65px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  margin-bottom: 100px;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Link = styled(NavLink)`
  font-size: 20px;
  text-decoration: none;
  padding: 0 10px;
  color: black;
`;

const LinkText = styled.p`
  font-size: 20px;
  text-decoration: none;
  padding: 0 10px;
  position: relative;
`;

const BorderBottom = styled.span`
  width: 50px;
  border-bottom: ${(p: LinkTextProps) => p.isActive ? '2px solid black' : 'none'};
  position: absolute;
  bottom: -10px;
  transform: translate(-50%,0);
  left: 50%;
`

const ClockContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  /* background-color: black; */
  padding-right: auto;
  /* border-radius: 3px; */
  color: black;
`

const Clock = styled.p`
  width: 100px;
  padding-left: 22px;
`
const Time = styled.p`
  width: 100px;
  padding-left: 22px;
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
      <ClockContainer>
        <Clock>{moment().format('HH : mm : ss')}</Clock>
        <Time>{moment().format('dddd').toUpperCase()}</Time>
      </ClockContainer>
      <LinkContainer>
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
        <LinkText>
          <Link to="/tegneserie">xkcd</Link>
          <BorderBottom isActive={decideIfActive('/tegneserie')} />
        </LinkText>
      </LinkContainer>
    </HeaderContainer>
  );
};

export default Header;
