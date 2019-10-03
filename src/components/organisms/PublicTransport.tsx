import React from 'react';
import Transport from '../molecules/Transport';
import styled from 'styled-components';
import { History } from 'history';
import { IPage } from '../../types/Page'
import { useHistory } from "react-router"

const PublicTransportContainer = styled.div`
  display: flex;
  justify-content: center;
`

const PublicTransport: React.FC<IPage> = ({
  changePage,
  seconds,
  pageNumber
}) => {
  let history = useHistory();
  React.useEffect(() => {
    console.log(seconds)
    if (seconds === 100) {
      changePage(history, '/kollektiv')
    }
  }, [seconds])
  return (
    <PublicTransportContainer>
      <Transport stopIds={['NSR:StopPlace:27172', 'NSR:StopPlace:362', 'NSR:StopPlace:26919']} />
    </PublicTransportContainer>
  )
}

export default PublicTransport
