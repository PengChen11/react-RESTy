import React from 'react';
import './results.scss';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

class Results extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <section className="results">
        <h2>Headers:</h2>
        <ReactJson src={this.props.result.headers} name='Headers' />
        <h2>Results:</h2>
        <ReactJson src={this.props.result.data} name='data' />
      </section>
    );
  }
}

Results.propTypes = {
  result: PropTypes.object,
};

export default Results;
