import React from 'react';
import './App.scss';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/home';
import HistoryPage from './pages/historyPage';
import Help from './pages/help';


export default function App(){
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/history' component={HistoryPage}></Route>
        <Route exact path='/help' component={Help}></Route>
        <Route ><h2>The route does not exsit</h2></Route>
      </Switch>
      <Footer />
    </>
  );
}

