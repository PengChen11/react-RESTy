import React from 'react';
import Form from '../components/form/form';
import Results from '../components/results/results';
import History from '../components/history/history';
const { When } = require('react-if');


export default class Home extends React.Component{
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
    if (!this.state.history.some(eachReq => eachReq.method === replyData.request.method && eachReq.url===replyData.request.url)){
      this.setState({
        history: [...this.state.history.concat(replyData.request)],
      });
    }

    this.setState({result: resultData});

    if (replyData.result.status ===200){
      this.saveSucessfulRequestHistory(replyData);
    }
  };

  saveSucessfulRequestHistory = (replyData) =>{
    sessionStorage.setItem(JSON.stringify(replyData.request), JSON.stringify(replyData.result));
  }


  render (){
    return (
      <>
        <Form getRequest={this.getRequest}/>
        <main>
          <When condition={this.state.result}>
            <History history={this.state.history} page='home'/>
            <Results result={this.state.result}/>
          </When>
        </main>
      </>
    );
  }
}