import React from 'react';
import './form.scss';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
const { If, Then } = require('react-if');

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      request: {
        url: '',
        method: 'get',
        data: '',
      },
      isLoading:false,
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
    if (method != 'post' || method != 'put'){
      document.getElementById('jsonBody').value = null;
    }

  }

  handleChangeData = (e)=>{
    let data = e.target.value;
    this.setState({ request: { ...this.state.request, data}});
  }

  handleRequest = async (e)=>{
    e.preventDefault();
    this.setState({isLoading: true});
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
      data: requestWithBodyData,
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
        this.setState({isLoading: false});
      }
      catch (error){
        data = {
          ...data,
          result:error,
        };
        this.props.getRequest(data);
        this.setState({isLoading: false});
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
    let id = `${method}Button`;

    return (
      <span id = {id} className={`method ${this.state.request.method === method}`} onClick={() => this.handleChangeMethod(method)}>
        {method.toUpperCase()}
      </span>
    );
  }

  JsonArea = (method)=>{
    return (
      <textarea id='jsonBody' name="data" spellCheck="false" placeholder="Please use strignified JSON data, text area disabled for GET and DELETE methods" disabled={method==='get' || method==='delete'}  onChange = {this.handleChangeData} rows="3" cols="90"></textarea> 
    );
  }


  render(){
    return (
      <>
        <form id = 'api' onSubmit = {this.handleRequest}>
          <div>
            <label htmlFor="url">URL:</label>
            <input id='urlInput' type="text" name="url" placeholder="http://api.url.here"  onChange={this.handleChangeUrl}/>
            <button type='submit' disabled={!this.state.request.url}>GO!</button>
          </div>
          <div className="methods">
            {this.MethodButton('get')}
            {this.MethodButton('post')}
            {this.MethodButton('put')}
            {this.MethodButton('delete')}
            {/* <label htmlFor="data"></label> */}
            {this.JsonArea(this.state.request.method)}
          </div>
        </form>
        <If condition={this.state.isLoading}>
          <Then>
            <div id='isLoading'>
              {/* <Loader type="ThreeDots" color="#f5f5f5" height="100" width="200" /> */}
              <ReactLoading type={'bars'} color={'grey'} width={150} />
            </div>
          </Then>
        </If>
      </>
    );
  }
}

Form.propTypes = {
  getRequest: PropTypes.func,
  reRequest: PropTypes.object,
};

export default Form;