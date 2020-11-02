import React from 'react';
import './form.scss';

class Form extends React.Component{
  constructor(){
    super();
    this.state = {
      request: {},
    };
  }

  handleChangeUrl = (e)=>{
    let url = e.target.value;
    this.setState({ request: { ...this.state.request, url } });
  }

  handleChangeMethod = (method) =>{
    this.setState({ request: { ...this.state.request, method } });
  }

  handleClick = (e)=>{
    e.preventDefault();
    let urlInput = e.target.value;
    this.setState({ urlInput });
    this.displayResult();

  };

  displayResult = ()=>{
    let dev = document.getElementById('requestHistory');
    let newText = document.createElement('li');
    newText.textContent = `${this.state.request.method.toUpperCase()} : ${this.state.request.url}`;
    dev.appendChild(newText);
  }

  render(){
    return (
      <form id = 'api'>
        <div>
          <label for="url">URL:</label>
          <input type="text" name="url" placeholder="http://api.url.here" onChange={this.handleChangeUrl}/>

          <button onClick = {this.handleClick}>GO!</button>
        </div>
        <div class="methods">
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
          {/* <textarea name="data" spellcheck="false">
          </textarea> */}
        </div>
        <div id = 'tempResult'>
          <ul id='requestHistory'>
          </ul>
        </div>
      </form>
    );
  }
}

export default Form;