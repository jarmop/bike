import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './App.css';
import List from './List';
import Map from './Map';

const PATH_LIST = '/';
const PATH_MAP = '/map';

// Make relative url absolute to fix routing on Github pages.
const getUrl = (path) => {
  // Homepage set in package.json is exposed as process.env.PUBLIC_URL.
  return process.env.PUBLIC_URL + path;
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            <Link to={getUrl(PATH_LIST)}>List</Link>
            {' | '}
            <Link to={getUrl(PATH_MAP)}>Map</Link>
          </div>
          <div>
            <Route exact path={getUrl(PATH_LIST)} component={List}/>
            <Route path={getUrl(PATH_MAP)} component={Map}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;