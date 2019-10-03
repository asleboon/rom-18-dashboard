import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { client } from './graphql/client';
import Header from './components/organisms/Header';
import Layout from './components/organisms/Layout';
import Animal from './components/organisms/Animal';
import Map from './components/organisms/Map';
import PublicTransport from './components/organisms/PublicTransport';
import './index.css';

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

  const changePage = (history: any, path: string) => {
    // console.log(history)
    let idx = pages.findIndex(page => page.path === path);
    if (idx !== -1) {
      // if index is the last? the push [0]
      history.push(pages[idx + 1])
    }
  }

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/"><Animal changePage={changePage} /></Route>
            <Route exact path="/kollektiv"><PublicTransport changePage={changePage} /></Route>
            <Route exact path="/kart"><Map changePage={changePage} /></Route>
            {/* <Route exact path="/kantine" component={} /> */}
          </Switch>
        </Router>
      </Layout>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
