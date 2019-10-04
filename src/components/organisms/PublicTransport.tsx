import React from 'react';
import Transport from '../molecules/Transport';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring'
import { IPage } from '../../types/Page';
import { useHistory } from 'react-router';

const PublicTransportContainer = styled(animated.div)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const RealTimeMap = styled.embed`
  background: transparent;
  width: 700px;
  height: 660px;
  border: none;
`;

const RealTimeMapContainer = styled.div`
  width: 550px;
  height: 556px;
  overflow: hidden;
`;

const PublicTransport: React.FC<IPage> = ({ changePage, seconds, pageNumber }) => {
  let history = useHistory();
  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 2000 } })
  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/kollektiv');
    }
  }, [seconds]);
  return (
    <PublicTransportContainer style={animationProps}>
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
