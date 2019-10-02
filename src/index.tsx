import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import styled from 'styled-components';
import Layout from './components/organisms/Layout';
import Animal from './components/organisms/Map';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/organisms/Header';

const App: React.FC = () => {
  return (
    <Layout>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Animal} />
          {/* <Route exact path="/kollektiv" component={} /> */}
          {/* <Route exact path="/kantine" component={} /> */}
        </Switch>
      </Router>
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
