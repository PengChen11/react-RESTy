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
        <ReactJson src={this.props.result.headers} name='Headers' />
        <ReactJson src={this.props.result.data} name='data' />
      </section>
    );
  }
}

Results.propTypes = {
  result: PropTypes.object,
};

export default Results;
