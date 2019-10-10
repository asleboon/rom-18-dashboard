import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/nb'
import { CircularProgress } from '@material-ui/core';

interface LinkTextProps {
  isActive: boolean;
}

const HeaderContainer = styled.div`
  height: 65px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  margin-bottom: 100px;
  position: relative;
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

const CountDown = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-size: 15px; */
  /* font-weight: 700; */
  position: absolute;
  top: -5px;
  right: 15px;
`

interface IHeader {
  resetTimer: () => void;
  seconds: number;
}

const Header: React.FC<IHeader> = ({
  resetTimer,
  seconds
}) => {
  let currentLocation = window.location.pathname;
  const decideIfActive = (str: string) => {
    if (str === currentLocation) {
      return true
    }
    return false
  }

  return (
    <HeaderContainer className="animated fadeIn">
      <CountDown>
        <CircularProgress variant="static" value={seconds} color="inherit" />
      </CountDown>
      <ClockContainer>
        <Clock>{moment().format('HH : mm : ss')}</Clock>
        <Time>{moment().format('dddd').toUpperCase()}</Time>
      </ClockContainer>
      <LinkContainer>
        <LinkText>
          <Link onClick={resetTimer} to="/">Bilde</Link>
          <BorderBottom className="animated fadeIn" isActive={decideIfActive('/')} />
        </LinkText>
        <LinkText>
          <Link onClick={resetTimer} to="/kollektiv">Kollektiv</Link>
          <BorderBottom className="animated fadeIn" isActive={decideIfActive('/kollektiv')} />
        </LinkText>
        <LinkText>
          <Link onClick={resetTimer} to="/trafikk">Trafikk</Link>
          <BorderBottom className="animated fadeIn" isActive={decideIfActive('/trafikk')} />
        </LinkText>
        <LinkText>
          <Link onClick={resetTimer} to="/tegneserie">Xkcd</Link>
          <BorderBottom className="animated fadeIn" isActive={decideIfActive('/tegneserie')} />
        </LinkText>
      </LinkContainer>
    </HeaderContainer>
  );
};

export default Header;
