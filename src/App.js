import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { Route, Switch } from 'react-router-dom'
// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { gql } from '@apollo/client';


class App extends React.Component {


  componentDidMount() {

    try {
      //  this.client = new ApolloClient({
      //   uri: 'http://localhost:8000/graphql',
      //   cache: new InMemoryCache()
      // });

      // this.client
      //   .query({
      //     query: gql`
      //       query GetCharacters {
      //         characters {
      //           id
      //           name
      //           color
      //         }
      //       }
      //     `
      //   })
      // .then(result => console.log(result));
    } catch (e) {
      console.error(e)
    }
   

  }
  




  render () {
     return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
  }
 
}

export default App;
