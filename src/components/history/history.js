import React from 'react';
import './history.scss';

class History extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [],
    };
  }

  render(){
    return (
      <aside className="history">
        <h2>History</h2>
        <ul></ul>
      </aside>
    );
  }
}

export default History;