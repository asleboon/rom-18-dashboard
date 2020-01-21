import React, { Fragment } from 'react';
import { IPage } from '../../types/Page';
import { useHistory } from 'react-router';
import axios from 'axios';
import { MENU_URL } from '../../constants/api';
import moment from 'moment';
import styled from 'styled-components';

const MenuEntry = styled.div`
  font-weight: ${(props: ContainerProps) => (props.currentDay ? 'bold' : 'normal')};

  h1 {
    font-size: 1.35em;
  }
`;

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: 40% auto;
  margin-left: 100px;
  animation-delay: 0.5s;
  animation-duration: 1s;
`;

const TodaysMeal = styled.div`
  font-size: 40px;
  margin-left: 5%;
  margin-right: 30%;
`;

const WeeklyMenu = styled.div`
  font-size: 25px;
  margin-right: 40%;
`;

interface ContainerProps {
  currentDay: boolean;
}

interface IMenu {
  weekNumber: number;
  days: Day[];
}

interface Day {
  day: string;
  dishes: string[];
  image: string;
}

const Cantina: React.FC<IPage> = ({ changePage, seconds, pageNumber }) => {
  const [menu, setMenu] = React.useState<IMenu>();
  const history = useHistory();

  React.useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    let res = await axios.get(MENU_URL);
    setMenu(res.data);
  };

  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/weather');
    }
  }, [seconds, changePage, history]);

  return (
    <Fragment>
      <Container>
        <WeeklyMenu>
          {menu &&
            menu.days.map(
              (entry: Day, index: number) =>
                index !== moment().day() - 1 && (
                  <MenuEntry key={entry.day} currentDay={index + 1 === moment().day()}>
                    <h1>{entry.day}</h1>
                    {entry.dishes.map((dish: any, index: number) => (
                      <p key={index}>{dish}</p>
                    ))}
                  </MenuEntry>
                )
            )}
        </WeeklyMenu>
        <TodaysMeal>
          <h1>Dagens</h1>
          {menu &&
            menu.days.length >= moment().day() - 1 &&
            menu.days[moment().day() - 1].dishes.map((dish: any, index: number) => (
              <div>
                <p key={index}>{dish}</p>
              </div>
            ))}
          {menu && menu.days.length >= moment().day() - 1 && menu.days[moment().day() - 1] && (
            <img src={menu.days[moment().day() - 1].image} width="80%" />
          )}
          {menu && menu.days.length < moment().day() && <p>Det e helg!</p>}
        </TodaysMeal>
      </Container>
    </Fragment>
  );
};

export default Cantina;
