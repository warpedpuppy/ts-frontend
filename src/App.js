import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import CSS from './pages/css/CSS';
import DBS from './pages/dbs/DBS';
import JS from './pages/js/JS';
import Games from './pages/games/Games';
import AppContext from './AppContext';
import About from './pages/about/About';
import TokenService from './services/TokenService';
import APIService from './services/APIServices';
import MongoServices from './services/mongo-services';
import PosgresServices from './services/postgresql-services';
import AWSServices from './services/aws-services';
import GraphQLServices from './services/graphql-services';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {

   state = {
      browserWidth: 0,
      browserHeight: 0,
      loggedIn: false,
      userID: uuidv4(),
      logPermit: true
   }
   componentDidMount = () => {
      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler);
      this.checkToken();
   }
   checkToken = async () => {
      let token = TokenService.getToken();
      let result = await APIService.post('/admin/check-token', {token, token1:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InRydWUiLCJpYXQiOjE2MTYxNzEwOTN9.OlJgRnsd2HS7dIabB9cdLYilUmZhHlIY7c1pClZGzQ"});
      if (result.success) {
         this.setState({loggedIn: true})
      } else {
         TokenService.deleteToken();
      }
   }
   componentWillUnmount = () => {
      //mongo
      MongoServices.deleteAllCharacters(this.state.userID);
      //postgresql
      PosgresServices.deleteAllCharacters(this.state.userID);
      //AWS
      AWSServices.deleteAllCharacters(this.context.userID);
      //GraphQL
      GraphQLServices.deleteAllCharacters(this.context.userID)
      //empty dbs
      window.removeEventListener('resize', this.resizeHandler)
   }
   resizeHandler = () => {
      this.setState({
         browserWidth: document.documentElement.clientWidth,
         browserHeight: document.documentElement.clientHeight
      })
      return {
         browserWidth: document.documentElement.clientWidth,
         browserHeight: document.documentElement.clientHeight
      }
   }

   logInOut = (e, loggedIn) => {
      if (e) e.preventDefault();
      this.setState({loggedIn})
      if (!loggedIn) TokenService.deleteToken();
   }
   log = (args) => {
      if (this.state.logPermit) {
         console.log(args.join(','))
      }
   }

   
  render () {
   const contextValue = { 
      browserWidth: this.state.browserWidth, 
      browserHeight: this.state.browserHeight, 
      loggedIn: this.state.loggedIn,
      userID: this.state.userID,
      logInOut: this.logInOut, 
      updateContext: this.resizeHandler,
      log: this.log
    }
     return (
        <AppContext.Provider value={contextValue}>
         <BrowserRouter>
            <header><Menu /></header>
            <main>
				<Routes>
					<Route index element={ Home } />
					<Route path="css/*" element={ <CSS /> } />
					<Route path="js/*" element={ <JS /> } />
					<Route path="dbs/*" element={ <DBS /> } />
					<Route path="games/*" element={ <Games /> } />
					<Route path="about" element={ <About /> } />
					<Route path="*" element={ NotFound } />  
				</Routes>
            </main>
            <footer></footer>
         </BrowserRouter>
        </AppContext.Provider>
      );
  }
 
}

export default App;
