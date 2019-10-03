import { Page } from '../types/Page';
const Pages: Page[] = [{ pageId: 1, isActive: true, weight: 100 }];
import moment from 'moment';
export const Weight = () => {};

const googleMapsWeight = () => {
  const format: string = 'hh:mm:ss';
  const time = moment(),
    beforeTime = moment('07:00:00', format),
    afterTime = moment('19:00:00', format);
  if (time.isBetween(beforeTime, afterTime)) {
    console.log('is between');
  } else {
    // setLoadMap(false);
    console.log('is not between');
  }
};
