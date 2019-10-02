import React from 'react';
import styled from 'styled-components';
import { IDeparture } from './Transport';
import moment, { Moment } from 'moment';
import { IoIosBus, IoIosTrain } from 'react-icons/io'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 88px;
  margin: 1px;
  background-color: rgba(255,255,255, 0.5);
`

const Text = styled.div`
  width: 150px;
  display: flex;
  font-size: 18px;
  color: black;
`

const TrainIcon = styled(IoIosTrain)`
  width: 35px;
  height: 35px;
  padding: 0 5px;
`

const BusIcon = styled(IoIosBus)`
  width: 35px;
  height: 35px;
  padding: 0 5px;
`

const TransportRow: React.FC<IDeparture> = ({
  serviceJourney,
  departurePlace,
  aimedArrivalTime,
  expectedArrivalTime,
  destinationDisplay,
}) => {
  const delay = () => {
    let delayed = Math.abs((+new Date(aimedArrivalTime)) - (+new Date(expectedArrivalTime)))
    let stringTime = moment(delayed).format('mm');
    if (stringTime === '') {
      return 'På tiden'
    }
    return `${stringTime} forsinket`
  }
  delay()
  return (
    <Container>
      <Text>{moment(aimedArrivalTime).format('HH:mm')}</Text>
      <Text>{moment(expectedArrivalTime).format('HH:mm')}</Text>
      <Text>{departurePlace}</Text>
      <Text>{destinationDisplay.frontText}</Text>
      <Text>{serviceJourney.journeyPattern.line.transportMode === 'bus' ? <BusIcon /> : <TrainIcon />}</Text>
    </Container>
  )
}

// <DepartureContainer key={idx + departure.aimedArrivalTime}>
//   <DepartureInfo>{moment(departure.aimedArrivalTime).format('HH:mm')}</DepartureInfo>
//   <DepartureInfo>{moment(departure.expectedArrivalTime).format('HH:mm')}</DepartureInfo>
//   <DepartureInfo>Avgang: {departure.departurePlace}</DepartureInfo>
//   <DepartureInfo>Destination: {departure.destinationDisplay.frontText}</DepartureInfo>
//   {moreInfo.transportMode === 'bus' ? <BusIcon /> : <TrainIcon />}
// </DepartureContainer>

export default TransportRow
