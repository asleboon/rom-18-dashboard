import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { client } from './graphql/client';
import Header from './components/organisms/Header';
import Layout from './components/organisms/Layout';
import Animal from './components/organisms/Image';
import Map from './components/organisms/Map';
import PublicTransport from './components/organisms/PublicTransport';
import FagKaffe from './components/molecules/FagKaffe';
import { googleMapsWeight, fagKaffeReminder } from './util/weightFunction';
import './index.css';
import { valueFromAST } from 'graphql';
import './index.css';
import Comic from './components/organisms/ComicStrip';
import Weather from './components/molecules/Weather';
import Temperature from './components/organisms/Temperature'

const AnimatedDonut = styled(CircularProgress)`
  height: 25px;
  width: 25px;
  background: transparent;
  border-radius: 50%;
  display: inline-block;
`;

const Circle = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

interface IPage {
  path: string;
  weight: number;
  isActive: boolean;
}

// Add weighting in pages objects
//const pages: IPage[] = [{ path: '/', weight: 1 }, { path: '/kollektiv', weight: 1 }, { path: '/trafikk', weight: 1 }];

const App: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [lastPage, setLastPage] = useState({ path: '', weight: 0 });
  const [pages, setPages] = useState([
    { path: '/', weight: 1, isActive: true },
    { path: '/kollektiv', weight: 1, isActive: true },
    { path: '/trafikk', weight: 1, isActive: true },
    { path: '/tegneserie', weight: 1, isActive: true },
    { path: '/weather', weight: 1, isActive: true },
    { path: '/temp', weight: 1, isActive: true },
  ]);

  useEffect(() => {
    let interval: any = null;
    if (seconds === 100) {
      resetTimer();
    }
    interval = setInterval(() => {
      setSeconds((seconds: number) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setSeconds(0);
  };

  const nextPageCalculations = (newPages: IPage[]) => {
    let currentTotalWeight = 0;
    newPages.map(page => {
      currentTotalWeight += page.weight;
    });
    const nextPage = Math.round(Math.random() * currentTotalWeight);
    let tempWeight = 0;
    let showPage: IPage = { path: '', weight: 0, isActive: false };
    newPages.map(page => {
      const currWeight = tempWeight;
      tempWeight += page.weight;

      if (nextPage <= tempWeight && nextPage >= currWeight) {
        if (page.path === lastPage.path) {
          showPage = nextPageCalculations(newPages);
        } else {
          setLastPage(page);
          showPage = page;
        }
      }
    });

    return showPage;
  };
  const weightChecker = (newPages: IPage[]) => {
    let weight = 0;
    let value = true;
    newPages.map((page, index) => {
      if (index === 0) {
        weight = page.weight;
      } else if (page.weight === weight || page.isActive === false) {
        return true;
      } else {
        value = false;
      }
    });
    return value;
  };

  const currentlyShowingPages = () => {
    let showingPages: IPage[] = [];
    pages.map((page: IPage) => {
      if (page.isActive) {
        showingPages.push(page);
      }
    });
    return showingPages;
  };

  const changePage = (history: any, path: string) => {
    fagKaffeReminder(pages, setPages);
    googleMapsWeight(pages, setPages);
    const newPages = currentlyShowingPages();
    let idx = newPages.findIndex(newPages => newPages.path === path);
    if (weightChecker(newPages)) {
      if (idx !== -1) {
        if (idx === newPages.length - 1) {
          history.push(newPages[0].path);
        } else {
          if (newPages[idx + 1].isActive) {
            history.push(newPages[idx + 1].path);
          } else {
            history.push(newPages[0].path);
          }
        }
      } else {
        history.push(newPages[0].path);
      }
    } else {
      const nextPage = nextPageCalculations(newPages);
      history.push(nextPage.path);
    }
  };

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Header seconds={seconds} resetTimer={resetTimer} />
          <Switch>
            <Route exact path="/">
              <Animal changePage={changePage} seconds={seconds} pageNumber={1} />
            </Route>
            <Route exact path="/kollektiv">
              <PublicTransport changePage={changePage} seconds={seconds} pageNumber={2} />
            </Route>
            <Route exact path="/trafikk">
              <Map changePage={changePage} seconds={seconds} pageNumber={3} />
            </Route>
            {
              //      <Route exact path="/fagKaffe">
              //<FagKaffe changePage={changePage} seconds={seconds} pageNumber={3} />
              // </Route>
            }
            {/* <Route exact path="/kantine" component={} /> */}
            <Route exact path="/tegneserie">
              <Comic changePage={changePage} seconds={seconds} pageNumber={4} />
            </Route>
            <Route exact path="/weather">
              <Weather changePage={changePage} seconds={seconds} pageNumber={5} />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
