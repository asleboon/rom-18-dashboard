import React from 'react';
import Transport from '../molecules/Transport';
import styled from 'styled-components';
import { History } from 'history';

const PublicTransportContainer = styled.div`
  display: flex;
  justify-content: center;
`

interface IPublicTransport {
  history: History,
}

const PublicTransport: React.FC<IPublicTransport> = ({
  history
}) => {
  React.useEffect(() => {
    // setInterval(() => {
    //   history.push('/kart')
    // }, 11000)
  }, [])
  return (
    <PublicTransportContainer>
      <Transport stopIds={['NSR:StopPlace:27172', 'NSR:StopPlace:362', 'NSR:StopPlace:26919']} />
    </PublicTransportContainer>
  )
}

export default PublicTransport
