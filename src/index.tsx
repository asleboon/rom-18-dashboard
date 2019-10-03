import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTransition, animated } from 'react-spring'
import { client } from './graphql/client';
import Header from './components/organisms/Header';
import Layout from './components/organisms/Layout';
import Animal from './components/organisms/Animal';
import Map from './components/organisms/Map';
import PublicTransport from './components/organisms/PublicTransport';
import './index.css';

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
}

// Add weighting in pages objects
const pages: IPage[] = [
  { path: '/' },
  { path: '/kollektiv' },
  { path: '/kart' },
];

const App: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (seconds === 100) {
      reset();
    }
    interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 200);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const reset = () => {
    setSeconds(0);
  };

  const changePage = (history: any, path: string) => {
    let idx = pages.findIndex(page => page.path === path);
    if (idx !== -1) {
      if (idx === (pages.length - 1)) {
        history.push(pages[0].path)
      } else {
        history.push(pages[idx + 1].path)
      }
    }
  }

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Circle>
            <AnimatedDonut value={seconds} variant="static" size="30px" />
          </Circle>
          <Header />
          <Switch>
            <Route exact path="/"><Animal changePage={changePage} seconds={seconds} pageNumber={1} /></Route>
            <Route exact path="/kollektiv"><PublicTransport changePage={changePage} seconds={seconds} pageNumber={2} /></Route>
            <Route exact path="/kart"><Map changePage={changePage} seconds={seconds} pageNumber={3} /></Route>
            {/* <Route exact path="/kantine" component={} /> */}
          </Switch>
        </Router>
      </Layout>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
