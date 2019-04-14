import React, { Component } from 'react';

//used for routing purposes to render different
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//IMPORT COMPONENTS
import NavBar from "./components/navbar";
import TruckStatus from "./components/truckStats";
import MechanicFix from "./components/mechanicFix";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <Route path = "/" component = {NavBar}/>  
            <div className = "container">
              <Route exact path = {["/", "/status"]} component = {TruckStatus}/>  
              <Route path = "/mechanic" component = {MechanicFix}/> 
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
