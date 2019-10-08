import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/nb';

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
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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
  border-bottom: ${(p: LinkTextProps) => (p.isActive ? '2px solid black' : 'none')};
  position: absolute;
  bottom: -10px;
  transform: translate(-50%, 0);
  left: 50%;
`;

const ClockContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  /* background-color: black; */
  padding-right: auto;
  /* border-radius: 3px; */
  color: black;
`;

const Clock = styled.p`
  width: 100px;
  padding-left: 22px;
`;
const Time = styled.p`
  width: 100px;
  padding-left: 22px;
`;

interface IHeader {
  resetTimer: () => void;
}

const Header: React.FC<IHeader> = ({ resetTimer }) => {
  let currentLocation = window.location.pathname;
  const decideIfActive = (str: string) => {
    if (str === currentLocation) {
      return true;
    }
    return false;
  };

  return (
    <HeaderContainer className="animated fadeIn">
      <ClockContainer>
        <Clock>{moment().format('HH : mm : ss')}</Clock>
        <Time>
          {moment()
            .format('dddd')
            .toUpperCase()}
        </Time>
      </ClockContainer>
      <LinkContainer>
        <LinkText>
          <Link onClick={resetTimer} to="/">
            Bilde
          </Link>
          <BorderBottom className="animated fadeIn" isActive={decideIfActive('/')} />
        </LinkText>
        <LinkText>
          <Link onClick={resetTimer} to="/kollektiv">
            Kollektiv
          </Link>
          <BorderBottom className="animated fadeIn" isActive={decideIfActive('/kollektiv')} />
        </LinkText>
        <LinkText>
          <Link onClick={resetTimer} to="/trafikk">
            Traffik
          </Link>
          <BorderBottom className="animated fadeIn" isActive={decideIfActive('/trafikk')} />
        </LinkText>
        <LinkText>
          <Link onClick={resetTimer} to="/tegneserie">
            Xkcd
          </Link>
          <BorderBottom className="animated fadeIn" isActive={decideIfActive('/tegneserie')} />
        </LinkText>
      </LinkContainer>
    </HeaderContainer>
  );
};

export default Header;
