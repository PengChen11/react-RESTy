import React from 'react';
import './history.scss';
import PropTypes from 'prop-types';

class History extends React.Component{

  handleHistoryRequest=(reqObj)=>{
    let id = `${reqObj.method}Button`;
    document.getElementById(id).click();
    document.getElementById('urlInput').value = reqObj.url;

    if (reqObj.data){
      document.getElementById('jsonBody').value = JSON.stringify(reqObj.data) ;
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
};

export default History;