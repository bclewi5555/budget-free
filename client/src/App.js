import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ''
    };
  }
  
  componentDidMount() {
    axios.get(`/user/name`)
      .then(res => {
        this.setState({ currentUser: res.data.currentUser });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
  

  render() {
    return (
      <div className="App">
        <h1>Hello {this.state.currentUser}!</h1>
      </div>
    );
  }

}

export default App;
