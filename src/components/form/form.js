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
        data: '',
      },
    };
  }

  handleChangeUrl = (e)=>{
    let url = e.target.value;
    this.setState({ request: { ...this.state.request, url } });
  }

  handleChangeMethod = (method) =>{
    this.setState({ request: { 
      ...this.state.request, 
      method,
      data: '',
    } });
  }

  handleChangeData = (e)=>{
    let data = e.target.value;
    this.setState({ request: { ...this.state.request, data}});
  }

  handleRequest = async (e)=>{
    e.preventDefault();
    let requestWithBodyData;
    if (this.state.request.data){
      try {
        requestWithBodyData = JSON.parse(this.state.request.data);
      }
      catch (err){
        const error = {
          message: 'JSON data validation failed, please double check your JSON input. Quotes needed for both keys and values',
        };
        this.props.getRequest({result: error});
        return;
      }
    }

    const request = {
      url: this.state.request.url,
      method: this.state.request.method,
      data: requestWithBodyData || {},
    };

    let data = {
      request,
      result: {},
    };

    if (!this.isValidUrl(request.url)){
      const error = {
        message: 'Url validation failed, please double check your url input. Full url requested, like http(s)://xxx.xxx ',
      };
      data = {
        ...data,
        result:error,
      };
      this.props.getRequest(data);
      return;
    } else {
      try {
        const result = await axios(request);
        data = {
          request,
          result,
        };
        this.props.getRequest(data);
      }
      catch (error){
        data = {
          ...data,
          result:error,
        };
        this.props.getRequest(data);
      }
    }
  };

  isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (_) {
      return false;  
    }
  
    return true;
  }

  MethodButton = (method)=>{
    let testID = `${method}Button`;

    return (
      <span data-testid = {testID} className={`method ${this.state.request.method === method}`} onClick={() => this.handleChangeMethod(method)}>
        {method.toUpperCase()}
      </span>
    );
  }

  JsonArea = (method)=>{
    return (
      <textarea data-testid='jsonBody' name="data" spellCheck="false" placeholder="Please use strignified JSON data, text area disabled for GET and DELETE methods" disabled={method==='get' || method==='delete'} value={this.state.request.data} onChange = {this.handleChangeData}></textarea>
    );
  }


  render(){
    return (
      <>
        <form id = 'api' onSubmit = {this.handleRequest}>
          <div>
            <label htmlFor="url">URL:</label>
            <input data-testid='urlInput' type="text" name="url" placeholder="http://api.url.here"  onChange={this.handleChangeUrl}/>
            <button type='submit' disabled={!this.state.request.url}>GO!</button>
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
  getRequest: PropTypes.func,
};

export default Form;