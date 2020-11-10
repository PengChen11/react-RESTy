import React from 'react';
import './App.scss';
import Header from './components/header/header';
import Form from './components/form/form';
import Results from './components/results/results';
import History from './components/history/history';
import Footer from './components/footer/footer';
const { If, Then } = require('react-if');
//{ If, Then, Else, When, Unless, Switch, Case, Default }


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [],
    };
  }

  getRequest = (replyData)=>{
    let resultData = {
      headers: replyData.result.headers || {error: 'no headers found'},
      data: replyData.result.data || {error: replyData.result.message || 'Unknown Error'},
    };
    this.setState({
      history: [...this.state.history.concat(replyData.request)],
      result: resultData,
    });
    if (replyData.result.status ===200){
      this.saveSucessfulRequestHistory(replyData);
    }
  };

  saveSucessfulRequestHistory = (replyData) =>{
    sessionStorage.setItem(JSON.stringify(replyData.request), JSON.stringify(replyData.result));
  }


  render(){
    return (
      <>
        <Header />
        <Form getRequest={this.getRequest}/>
        <main>
          
          <If condition={this.state.result}>
            <Then>
              <History history={this.state.history}/>
              <Results result={this.state.result}/>
            </Then>
          </If>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
