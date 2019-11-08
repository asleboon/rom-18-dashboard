import React from 'react';
import Transport from '../molecules/Transport';
import styled from 'styled-components';
import { IPage } from '../../types/Page';
import { useHistory } from 'react-router';

const PublicTransportContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  animation-delay: 0.5s;
`;

const RealTimeMap = styled.embed`
  background: transparent;
  width: 700px;
  height: 670px;
  border: none;
`;

const RealTimeMapContainer = styled.div`
  width: 550px;
  height: 568px;
  overflow: hidden;
  border: 1px solid #afafaf;
  border-radius: 4px;
`;

const PublicTransport: React.FC<IPage> = ({ changePage, seconds }) => {
  let history = useHistory();

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/kollektiv');
    }
  }, [seconds]);

  return (
    <PublicTransportContainer className="animated fadeInLeft">
      <Transport stopIds={['NSR:StopPlace:27172', 'NSR:StopPlace:362', 'NSR:StopPlace:26919']} />
      <RealTimeMapContainer>
        <RealTimeMap
          src={'https://www.kolumbus.no/ruter/kart/sanntidskart/?c=58.912557,5.731902,15&lf=all&vt=bus,ferry'}
        />
      </RealTimeMapContainer>
    </PublicTransportContainer>
  );
};

export default PublicTransport;
