export interface IPage {
  changePage: (history: any, path: string) => void;
  seconds: number;
  pageNumber: number;
}
export interface Page {
  pageId: number;
  isActive: boolean;
  weight: number;
}
