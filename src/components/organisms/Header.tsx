import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'

const AnimatedDonut = styled(CircularProgress)`
  height: 25px;
  width: 25px;
  background: transparent;
  border-radius: 50%;
  display: inline-block;
`;

const Circle = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

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

interface LinkTextProps {
  isActive: boolean;
}

const LinkText = styled.p`
  color: white;
  font-size: 20px;
  text-decoration: none;
  padding: 0 10px;
  color: white;
  border-bottom: ${(p: LinkTextProps) => p.isActive ? '1px solid white' : 'none'}
`;

const Header: React.FC = () => {
  let currentLocation = window.location.pathname;
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const headerProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    let interval: any = null;
    if (seconds === 101) {
      reset();
    }
    interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const reset = () => {
    setSeconds(0);
  };

  const decideIfActive = (str: string) => {
    if (str === currentLocation) {
      return true
    }
    return false
  }

  return (
    <HeaderContainer style={headerProps}>
      <Circle>
        <AnimatedDonut value={seconds} variant="static" size="30px" />
      </Circle>
      <LinkText isActive={decideIfActive('/')}><Link to="/">Bilde</Link></LinkText>
      <LinkText isActive={decideIfActive('/kollektiv')}><Link to="/kollektiv">Kollektiv</Link></LinkText>
      <LinkText isActive={decideIfActive('/kart')}><Link to="/kart">Kart</Link></LinkText>
    </HeaderContainer>
  );
};

export default Header;
