import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { NavLink } from 'react-router-dom'

const HeaderContainer = styled(animated.div)`
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`

const Link = styled(NavLink)`
  color: white;
  font-size: 16px;
  text-decoration: none;
  padding: 0 10px;
`

const Header: React.FC = () => {
  const headerProps = useSpring({ opacity: 1, from: { opacity: 0 } })
  return (
    <HeaderContainer style={headerProps}>
      <Link to="/">hei</Link>
      <Link to="/" >hei</Link>
      <Link to="/" >hei</Link>
    </HeaderContainer>
  )
}

export default Header
