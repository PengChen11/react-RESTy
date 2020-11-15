import React from 'react';
import './history.scss';
import PropTypes from 'prop-types';

class History extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: '',
      result: null,
    };
  }

  componentDidMount(){
    this.setState({page: this.props.page});
  }
  
  

  handleHistoryRequest=(reqObj)=>{
    if (this.state.page === 'home'){
      this.homePageList(reqObj);
      return;
    } else if (this.state.page === 'history'){
      this.historyPageList(reqObj);
      return;
    }
  }

  historyPageList=(reqObj)=>{
    this.props.getHistory(reqObj);
  }

  homePageList=(reqObj)=>{
    let id = `${reqObj.method}Button`;
    document.getElementById(id).click();
    let urlVal = document.getElementById('urlInput');
    const e = new Event('input', { bubbles: true });
    this.setNativeValue(urlVal, reqObj.url);
    urlVal.dispatchEvent(e);

    if (reqObj.data){
      document.getElementById('jsonBody').value = JSON.stringify(reqObj.data) ;
    }
  }

  setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    
    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
  }

  renderQueryHistory=()=>{

    const history=this.props.history;
    const historyReqests = history.map((historyReq, index) =>
      <li key={index}>
        <span className={`method ${historyReq.method}`}>{historyReq.method}</span>
        <button className='url' onClick={()=>this.handleHistoryRequest(historyReq)}>{historyReq.url}</button>
      </li>
    );

    return (
      <ul id='history'>
        {historyReqests}
      </ul>
    );
  }


  render(){
    return (
      <aside className="history">
        <h2>History</h2>
        {this.renderQueryHistory()}
      </aside>
    );
  }
}

History.propTypes = {
  history: PropTypes.array,
  page: PropTypes.string,
  getHistory: PropTypes.func,
};

export default History;