import React from 'react';
import Transport from '../molecules/Transport';
import styled from 'styled-components';
import { History } from 'history';
import { IPage } from '../../types/Page'
import { useHistory } from "react-router"

const PublicTransportContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

// https://www.kolumbus.no/ruter/kart/sanntidskart/?c=58.916590,5.725658,15&lf=all&vt=bus,ferry
const RealTimeMap = styled.iframe`
  background-color: grey;
  width: 700px;
  height: 650px;
  border: none;
`

const RealTimeMapContainer = styled.div`
  width: 550px;
  height: 550px;
  overflow: hidden;
`

const PublicTransport: React.FC<IPage> = ({
  changePage,
  seconds,
  pageNumber
}) => {
  let history = useHistory();
  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/kollektiv')
    }
  }, [seconds])
  return (
    <PublicTransportContainer>
      <Transport stopIds={['NSR:StopPlace:27172', 'NSR:StopPlace:362', 'NSR:StopPlace:26919']} />
      <RealTimeMapContainer>
        <RealTimeMap src={'https://www.kolumbus.no/ruter/kart/sanntidskart/?c=58.912557,5.731902,15&lf=all&vt=bus,ferry'} />
      </RealTimeMapContainer>
    </PublicTransportContainer>
  )
}

export default PublicTransport
