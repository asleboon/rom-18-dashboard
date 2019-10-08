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
    const newPage = { path: '/trafikk', weight: 1, isActive: true };
    pages.map((page, index) => {
      if (page.path === newPage.path) {
        pages[index] = newPage;
      }
    });
    setPage(pages);
  } else {
    const newPage = { path: '/trafikk', weight: 1, isActive: false };
    pages.map((page, index) => {
      if (page.path === newPage.path) {
        pages[index] = newPage;
      }
    });
    setPage(pages);
  }
};

export const fagKaffeReminder = (pages: IPage[], setPage: Function) => {
  const time = moment();
  console.log(time);
  if (time.week() % 2 !== 0) {
    if (time.day() === 5)
      if (time.hour() === 11) {
        if (time.minute() < 60 && time.minute() > 45) {
          const newPage = { path: '/fagKaffe', weight: 2, isActive: true };
          pages.map((page, index) => {
            if (page.path === newPage.path) {
              pages[index] = newPage;
            }
          });
          setPage(pages);
        }
      }
  }
};
