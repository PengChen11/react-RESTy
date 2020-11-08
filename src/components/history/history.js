import React from 'react';
import './history.scss';
import PropTypes from 'prop-types';

class History extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      requestStr: '',
      resultStr:'',
    };
  }

  renderQueryHistory=()=>{

    let classes = `method ${this.props.history.request.method}`;
    let newElement = <li ><button className = {classes} >{this.props.history.request.method}</button>{this.props.history.request.url}</li>;
    return newElement;
  }

  handleState = ()=>{
    this.setState({
      requestStr: JSON.stringify(this.props.history.request),
    });
  }

  reRenderResult=()=>{
    let result = sessionStorage.getItem(this.state.requestStr);

    this.props.updateResult(JSON.parse(result));
  }

  render(){
    return (
      <aside className="history">
        <h2>History</h2>
        <ul id='history'>
          {this.renderQueryHistory()}
        </ul>
      </aside>
    );
  }
}

History.propTypes = {
  history: PropTypes.object,
  updateResult: PropTypes.func,
};

export default History;