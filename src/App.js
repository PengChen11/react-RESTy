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
      result: {},
    };
  }

  getRequest = (replyData)=>{
    let resultData = {
      headers: replyData.result.headers || {error: 'no headers found'},
      data: replyData.result.data || {error: replyData.result.message || 'Unknown Error'},
    };
    this.setState({
      request: replyData.request,
      result: resultData,
    });
    if (replyData.result.status ===200){
      this.saveSucessfulRequestHistory(replyData);
    }
  };

  saveSucessfulRequestHistory = (replyData) =>{
    sessionStorage.setItem(JSON.stringify(replyData.request), JSON.stringify(replyData.result));
  }

  updateResult = (result) =>{
    this.setState({
      result: result,
    });
  }



  render(){
    return (
      <>
        <Header />
        <Form getRequest={this.getRequest}/>
        <main>
          <History history={this.state} updateResult={this.updateResult}/>
          <Results result={this.state.result}/>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
