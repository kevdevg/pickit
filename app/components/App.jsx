import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import About from './About/About';
import Home from './Home/Home';
import Nav from './Nav/container';
import Posts from './PostsApp/container';
import PageNotFound from './PageNotFound/PageNotFound';
import EntrancesFromApi from './EntriesApp/EntriesFromApi/container';
import MyEntries from './EntriesApp/MyEntries/container';

const App = () => (
  <Provider store={store}>
    <div>
      <Nav />
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
          <Route path='/posts' exact component={Posts} />
          <Route path='/entries-nasa' exact component={EntrancesFromApi} />
          <Route path='/my-entries' exact component={MyEntries} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default App;
