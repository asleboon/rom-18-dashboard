import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { client } from './graphql/client';
import Header from './components/organisms/Header';
import Layout from './components/organisms/Layout';
import Animal from './components/organisms/Animal';
import Map from './components/organisms/Map';
import PublicTransport from './components/organisms/PublicTransport';
import './index.css';

const App: React.FC = () => {
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
