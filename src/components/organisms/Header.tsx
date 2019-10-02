import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled(animated.div)`
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

const Link = styled(NavLink)`
  color: white;
  font-size: 16px;
  text-decoration: none;
  padding: 0 10px;
`;

const Header: React.FC = () => {
  const headerProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <HeaderContainer style={headerProps}>
<<<<<<< HEAD
      <Link to="/">hei</Link>
      <Link to="/">hei</Link>
      <Link to="/">hei</Link>
=======
      <Link to="/">Bilde</Link>
      <Link to="/kollektiv">Kollektiv</Link>
      <Link to="/" >hei</Link>
>>>>>>> 2b7ca397ae78e9e8d8724df6016028f0c68f17d6
    </HeaderContainer>
  );
};

export default Header;
