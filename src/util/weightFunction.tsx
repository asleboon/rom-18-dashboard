import { Page } from '../types/Page';
import moment from 'moment';
const Pages: Page[] = [{ pageId: 1, isActive: true, weight: 100 }];

export const Weight = () => {};
interface IPage {
  path: string;
  weight: number;
  isActive: boolean;
}
export const googleMapsWeight = (pages: IPage[], setPage: Function) => {
  const format: string = 'hh:mm:ss';
  const time = moment(),
    beforeTime = moment('14:00:00', format),
    afterTime = moment('18:00:00', format);
  if (time.isBetween(beforeTime, afterTime)) {
    const newPage = { path: '/kart', weight: 1, isActive: true };
    pages.map((page, index) => {
      if (page.path === newPage.path) {
        pages[index] = newPage;
      }
    });
    setPage(pages);
    console.log(pages);
    console.log('is between');
  } else {
    const newPage = { path: '/kart', weight: 1, isActive: false };
    pages.map((page, index) => {
      if (page.path === newPage.path) {
        pages[index] = newPage;
      }
    });
    setPage(pages);
    // setLoadMap(false);
    console.log('is not between');
  }
};
