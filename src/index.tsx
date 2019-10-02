import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { client } from './graphql/client';
import Header from './components/organisms/Header';
import Layout from './components/organisms/Layout';
import Animal from './components/organisms/Animal';
import Map from './components/organisms/Map';
import PublicTransport from './components/organisms/PublicTransport';
import './index.css';

const App: React.FC = () => {
  // const transitions = useTransition(index, p => p, {
  //   from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
  //   enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
  //   leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  // })



  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Animal} />
            <Route exact path="/kollektiv" component={PublicTransport} />
            <Route exact path="/Map" component={Map} />
            {/* <Route exact path="/kantine" component={} /> */}
          </Switch>
        </Router>
      </Layout>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
