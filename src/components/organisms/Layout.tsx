import React from 'react'
import styled from 'styled-components'


const LayoutContainer = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(to right bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  /* background-image: linear-gradient(to right, #000000, #35161c, #652229, #97312e, #c7472a, #db5324, #ee6119, #ff7000, #ff7000, #ff7000, #ff7000, #ff7000); BOUVET FARGER */
`

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.FC<Props> = ({
  children
}) => {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  )
}

export default Layout
