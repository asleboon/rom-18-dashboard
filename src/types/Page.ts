export interface IPage {
	changePage: (history: any, path: string) => void;
	seconds: number;
	pageNumber: number;
}
