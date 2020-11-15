import React from 'react';
import History from '../components/history/history';
import Result from '../components/results/results';
const { If, Then, Else, When } = require('react-if');

export default class HistoryPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      history: [],
    };
  }

  componentDidMount(){

    console.log('history array:', Object.keys(sessionStorage));
    let historyArr = [];
    Object.keys(sessionStorage).forEach((req)=>{
      let reqObj = JSON.parse(req);
      console.log('reqObj is ', reqObj);
      historyArr.push(reqObj);
    });
    this.setState({history: historyArr});
  
  }
  
  getHistory = (reqObj) =>{
    const reqKey = JSON.stringify(reqObj);
    const result = sessionStorage.getItem(reqKey);
    const resultObj = JSON.parse(result);
    this.setState({result: resultObj});
  }


  render(){
    return(
      <main>
        <If condition={this.state.history.length > 0}>
          <Then>
            <History history={this.state.history} page='history' getHistory={this.getHistory} />
            <When condition={this.state.result}>
              <Result result={this.state.result}></Result>
            </When>
          </Then>
          <Else>
            <h2>You have no request history in this session.</h2>
          </Else>
        </If>

      </main>
    );
  }
}