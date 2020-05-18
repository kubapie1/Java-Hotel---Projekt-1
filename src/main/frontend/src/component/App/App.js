import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import Home from '../Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from "../Login/Login";
import Register from "../Register";
import Profile from "../Profile";
import BoardUser from "../Board/BoardUser";
import BoardModerator from "../Board/BoardModerator";
import BoardAdmin from "../Board/BoardAdmin";
import ItemStorage from "../Storage/ItemStorage";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from '../User/ChangePassword';


toast.configure();

class App extends Component {

  render() {

    return (
      <Router>
        <AppNavbar/>
        <div className="new-container">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/itemstorage" component={ItemStorage} />
          <Route path="/changepassword" component={ChangePassword} />
        </Switch>
        </div>

      </Router>
    )
  }
}

export default App;