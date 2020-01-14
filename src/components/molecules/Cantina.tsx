import React from 'react';
import { IPage } from '../../types/Page';
import { useHistory } from 'react-router';
import axios from 'axios';
import { MENU_URL } from '../../constants/api';
import moment from 'moment';
import styled from 'styled-components';

const MenuEntry = styled.div`
  font-weight: ${(props: ContainerProps) => props.currentDay ? 'bold' : 'normal'};

  h1 {
    font-size: 1.35em;
  }
`;

const Container = styled.div`
  margin-top: -85px;
  margin-left: 100px;
  animation-delay: .5s;
  animation-duration: 1s;
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
}

const Cantina: React.FC<IPage> = ({ changePage, seconds, pageNumber }) => {
  const [menu, setMenu] = React.useState<IMenu>()
  const history = useHistory();

  React.useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    let res = await axios.get(MENU_URL);
    setMenu(res.data);
  }
  
  React.useEffect(() => {
    if (seconds === 100) {
      changePage(history, '/weather');
    }
  }, [seconds, changePage, history]);

  return(
    <Container>
      {menu && menu.days.map((entry: Day, index: number) => (
        <MenuEntry key={entry.day} currentDay={index+1 === moment().day()}>
          <h1>{entry.day}</h1>
          {entry.dishes.map((dish: any, index: number) => (
            <p key={index}>{dish}</p>
          ))}
        </MenuEntry>
        )
      )}
    </Container>
  )
}

export default Cantina;