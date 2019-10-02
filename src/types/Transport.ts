export interface IStopPlace {
	id: string;
	name: string;
	estimatedCalls: IEstimatedCall[];
}

export interface IEstimatedCall {
	aimedArrivalTime: string;
	aimedDepartureTime: string;
	expectedArrivalTime: string;
	expectedDepartureTime: string;
	date: string;
	destinationDisplay: IDestinationDisplay;
	serviceJourney: IServiceJourney;
}

export interface IDestinationDisplay {
	frontText: string;
}

export interface IServiceJourney {
	journeyPattern: IJourneyPattern;
}

export interface IJourneyPattern {
	line: ILine;
}

export interface ILine {
	id: string[];
	name: string;
	transportMode: string;
}