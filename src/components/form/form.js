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
      this.props.getRequest(result.data);
    }
    catch (err){console.error(err);}

  };

  render(){
    return (
      <>
        <form id = 'api' onSubmit = {this.handleRequest}>
          <div>
            <label htmlFor="url">URL:
              <input type="text" name="url" placeholder="http://api.url.here"  onChange={this.handleChangeUrl}/>
            </label>

            <button type='submit' >GO!</button>
          </div>
          <div className="methods">
            <span className={`method ${this.state.request.method === 'get'}`} onClick={() => this.handleChangeMethod('get')}>
              GET
            </span>
            <span className={`method ${this.state.request.method === 'post'}`} onClick={() => this.handleChangeMethod('post')}>
              POST
            </span>
            <span className={`method ${this.state.request.method === 'put'}`} onClick={() => this.handleChangeMethod('put')}>
              PUT
            </span>
            <span className={`method ${this.state.request.method === 'delete'}`} onClick={() => this.handleChangeMethod('delete')}>
              DELETE
            </span>
          </div>
          <div>
            <label htmlFor="data">
              <textarea name="data" spellCheck="false" placeholder="Please use pure JSON string"></textarea>
            </label>
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