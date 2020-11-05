import React from 'react';
import './results.scss';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

class Results extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: '',
    };
  }
  render(){
    return (
      <section className="results">
        <ReactJson src={this.props.result} />
      </section>
    );
  }
}

Results.propTypes = {
  result: PropTypes.funobject,
};

export default Results;
