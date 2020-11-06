import React from 'react';
import './form.scss';
import axios from 'axios';
import PropTypes from 'prop-types';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      request: {
        url: '',
        method: 'get',
      },
    };
  }

  handleChangeUrl = (e)=>{
    let url = e.target.value;
    this.setState({ request: { ...this.state.request, url } });
  }

  handleChangeMethod = (method) =>{
    this.setState({ request: { ...this.state.request, method } });
  }

  handleRequest = async (e)=>{
    e.preventDefault();
    const request = {
      url: this.state.request.url,
      method: this.state.request.method,
    };
    try {
      const result = await axios(request);
      this.props.getRequest(result);
    }
    catch (err){
      this.props.getRequest(err);
    }
  };

  MethodButton = (method)=>{
    return (
      <span className={`method ${this.state.request.method === method}`} onClick={() => this.handleChangeMethod(method)}>
        {method.toUpperCase()}
      </span>
    );
  }

  JsonArea = (method)=>{
    return (
      <textarea name="data" spellCheck="false" placeholder="Please use strignified JSON data, text area disabled for GET and DELETE methods" disabled={method==='get' || method==='delete'}></textarea>
    );
  }


  render(){
    return (
      <>
        <form id = 'api' onSubmit = {this.handleRequest}>
          <div>
            <label htmlFor="url">URL:</label>
            <input type="text" name="url" placeholder="http://api.url.here"  onChange={this.handleChangeUrl}/>
            <button type='submit' >GO!</button>
          </div>
          <div className="methods">
            {this.MethodButton('get')}
            {this.MethodButton('post')}
            {this.MethodButton('put')}
            {this.MethodButton('delete')}
            <label htmlFor="data"></label>
            {this.JsonArea(this.state.request.method)}
          </div>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  getRequest: PropTypes.obj,

};

export default Form;