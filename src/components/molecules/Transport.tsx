import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { STOP_PLACE_QUERY } from './../../graphql/query';
import styled from 'styled-components';
import { IStopPlace, IEstimatedCall } from './../../types/Transport'
import TransportRow from './TransportRow'


const TransportTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`

const TransportTitle = styled.h3`
  color: white;
  font-size: 35px;
  text-shadow: 2px 3px 0px #898999;
  text-align: center;
`

const TransportTableHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 88px;
  margin: 1px;
  background-color: rgba(255,255,255, 0.7);
`

const HeaderText = styled.div`
  display: flex;
  width: 150px;
  font-size: 18px;
  color: black;
  text-shadow: 1px 1.5px 0px #898999;
`

export interface IDeparture extends IEstimatedCall {
  departurePlace: string;
}

interface ITransport {
  stopIds: string[];
}

const Transport: React.FC<ITransport> = ({
  stopIds,
}) => {
  const { loading, error, data } = useQuery(STOP_PLACE_QUERY, {
    variables: { stopIds, n: 3 }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const sortDataByDate = (stopPlaces: IStopPlace[]) => {
    // concat all lists
    // TODO: types
    let allDepartures: IDeparture[] = [];
    stopPlaces.forEach((stops: IStopPlace) => {
      stops.estimatedCalls.forEach((call: IEstimatedCall) => {
        // add departure place on each departure
        allDepartures.push({ ...call, departurePlace: stops.name })
      })
    })

    // sort each item by date
    allDepartures.sort(function (a: IDeparture, b: IDeparture) {
      return new Date(a.aimedArrivalTime).getTime() - new Date(b.aimedArrivalTime).getTime()
    });
    return allDepartures
  }

  let departures: IDeparture[] = sortDataByDate(data.stopPlaces)

  return (
    <TransportTable>
      {departures.length > 0 &&
        departures.map((departure: IDeparture, idx: number) => {
          return (
            <TransportRow
              key={idx + departure.aimedArrivalTime}
              departurePlace={departure.departurePlace}
              aimedArrivalTime={departure.aimedArrivalTime}
              expectedArrivalTime={departure.expectedArrivalTime}
              destinationDisplay={departure.destinationDisplay}
              serviceJourney={departure.serviceJourney}
              quay={departure.quay}
            />
          )
        }
        )}
    </TransportTable>
  )
}

export default Transport
