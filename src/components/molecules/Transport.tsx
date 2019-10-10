import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { STOP_PLACE_QUERY } from './../../graphql/query';
import styled from 'styled-components';
import { IStopPlace, IEstimatedCall } from './../../types/Transport';
import TransportRow from './TransportRow';

const TransportTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransportTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  border: 1px solid #afafaf;
  border-radius: 4px;
`;

export interface IDeparture extends IEstimatedCall {
  departurePlace: string;
}

interface ITransport {
  stopIds: string[];
}

/**
 * Input a list of stopplaces and return an arrray of
 * departures
 * @param stopPlaces
 */
const refineData = (stopPlaces: IStopPlace[]) => {
  let allDepartures: IDeparture[] = [];
  stopPlaces.forEach((stops: IStopPlace) => {
    stops.estimatedCalls.forEach((call: IEstimatedCall) => {
      // add departure place on each departure
      allDepartures.push({ ...call, departurePlace: stops.name });
    });
  });
  return allDepartures;
};

/**
 *
 * @param stopPlaces
 */
const sortDataByDate = (allDepartures: IDeparture[]) => {
  // sort each item by date
  allDepartures.sort(function(a: IDeparture, b: IDeparture) {
    return new Date(a.expectedArrivalTime).getTime() - new Date(b.expectedArrivalTime).getTime();
  });
  return allDepartures;
};

/**
 * returns a list with two lists -> [bus, train]
 * @param allDepartures
 */

const sortByTransportType = (allDepartures: IDeparture[]) => {
  let buses: IDeparture[] = [];
  let trains: IDeparture[] = [];

  allDepartures.forEach((departure: IDeparture) => {
    if (departure.serviceJourney.journeyPattern.line.transportMode === 'bus') {
      buses.push(departure);
    } else {
      trains.push(departure);
    }
  });

  return [buses, trains];
};

const Transport: React.FC<ITransport> = ({ stopIds }) => {
  const [stopPlaces, setStopPlaces] = React.useState([]);
  const [busDepartues, setBusDepartures] = React.useState();
  const [trainDepartures, setTrainDepartures] = React.useState();

  React.useEffect(() => {
    refineAndSortDepartures();
  }, [stopPlaces]);

  const refineAndSortDepartures = async () => {
    if (stopPlaces.length > 0) {
      let data = await refineData(stopPlaces);
      let sortedByDate = await sortDataByDate(data);
      let sortedByType = await sortByTransportType(sortedByDate);
      setBusDepartures(sortedByType[0]);
      setTrainDepartures(sortedByType[1]);
    }
  };

  const { loading, error, data } = useQuery(STOP_PLACE_QUERY, {
    variables: { stopIds, n: 3 }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :/ </p>;
  if (data && stopPlaces.length <= 0) {
    setStopPlaces(data.stopPlaces);
  }

  return (
    <TransportTableContainer>
      <TransportTable style={{ marginBottom: 4 }}>
        {busDepartues &&
          busDepartues.map((departure: IDeparture, idx: number) => {
            // let transportMode = departure.serviceJourney.journeyPattern.line.transportMode;
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
            );
          })}
      </TransportTable>
      <TransportTable style={{ marginTop: 4 }}>
        {trainDepartures &&
          trainDepartures.map((departure: IDeparture, idx: number) => {
            // let transportMode = departure.serviceJourney.journeyPattern.line.transportMode;
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
            );
          })}
      </TransportTable>
    </TransportTableContainer>
  );
};

export default Transport;
