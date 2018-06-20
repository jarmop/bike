import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './App.css';
import List from './List';
import Map from './Map';

const PATH_LIST = '/';
const PATH_MAP = '/map';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            <Link to={PATH_LIST}>List</Link>
            {' | '}
            <Link to={PATH_MAP}>Map</Link>
          </div>
          <div>
            <Route exact path={PATH_LIST} component={List}/>
            <Route path={PATH_MAP} component={Map}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;