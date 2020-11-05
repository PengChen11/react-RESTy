'use strict';
import React from 'react';
import './App.scss';
import Header from './components/header/header';
import Form from './components/form/form';
import Results from './components/results/results';
import History from './components/history/history';
import Footer from './components/footer/footer';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      request: {},
    };
  }

  getRequest = (result)=>{
    this.setState({request: result});
  };

  render(){
    return (
      <>
        <Header />
        <Form getRequest={this.getRequest}/>
        <main>
          <History />
          <Results result={this.state.request}/>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
