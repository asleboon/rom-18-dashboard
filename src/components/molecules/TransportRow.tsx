import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IDeparture } from './Transport';
import moment from 'moment';
import { IoIosBus, IoIosTrain } from 'react-icons/io';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 5fr 2fr;
  justify-items: space-around;
  align-items: center;
  height: 60px;
  margin: 1px;
  padding-left: 25px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const Text = styled.div`
  display: flex;
  font-size: 20px;
  color: black;
`;

const TrainIcon = styled(IoIosTrain)`
  width: 35px;
  height: 35px;
  padding-left: 50%;
`;

const BusIcon = styled(IoIosBus)`
  width: 35px;
  height: 35px;
  padding-left: 50%;
`;

const Route = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: black;
  color: white;
`;

const TransportRow: React.FC<IDeparture> = ({
  serviceJourney,
  departurePlace,
  aimedArrivalTime,
  expectedArrivalTime,
  destinationDisplay,
  quay
}) => {
  const [nextDeparture, setNextDeparture] = useState();

  useEffect(() => {
    let formatedTime: string;
    let untilArrival = Math.abs(+new Date(expectedArrivalTime) - Date.now());
    let untilArrivalString = moment(untilArrival).format('m');

    if (untilArrivalString === '0') {
      formatedTime = 'Nå';
    } else {
      formatedTime = `${untilArrivalString} minutt`;
    } 

    setNextDeparture(formatedTime);
  }, [expectedArrivalTime]);

  const transportMode = serviceJourney.journeyPattern.line.transportMode;
  return (
    <Container>
      <Route>
        <p>{transportMode === 'bus' ? serviceJourney.journeyPattern.line.name : quay.publicCode}</p>
      </Route>
      <Text>{nextDeparture}</Text>
      <Text>{destinationDisplay.frontText}</Text>
      <Text>{transportMode === 'bus' ? <BusIcon /> : <TrainIcon />}</Text>
    </Container>
  );
};

export default TransportRow;
