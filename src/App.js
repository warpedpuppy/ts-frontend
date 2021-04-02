import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import CSS from './pages/css/CSS';
import DBS from './pages/dbs/DBS';
import JS from './pages/js/JS';
import Games from './pages/games/Games';
import Art from './pages/art/Art';
import AppContext from './AppContext';
import About from './pages/about/About';
import TokenService from './services/TokenService';
import APIService from './services/APIServices';
class App extends React.Component {

   state = {
      browserWidth: 0,
      browserHeight: 0,
      loggedIn: false
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
      window.removeEventListener('resize', this.resizeHandler)
   }
   resizeHandler = () => {
      this.setState({
         browserWidth: document.documentElement.clientWidth,
         browserHeight: document.documentElement.clientHeight
      })
   }
   logInOut = (e, loggedIn) => {
      if (e) e.preventDefault();
      this.setState({loggedIn})
      if (!loggedIn) TokenService.deleteToken();
   }
   
  render () {
   const contextValue = { 
      browserWidth: this.state.browserWidth, 
      browserHeight: this.state.browserHeight, 
      loggedIn: this.state.loggedIn,
      logInOut: this.logInOut
    }
     return (
        <AppContext.Provider value={contextValue}>
         <BrowserRouter>
            <header><Menu /></header>
            <main>
               <Switch>
               <Route exact path="/" component={ Home } />
               <Route exact path="/css" render={ history => <CSS history={history} />} />
               <Route exact path="/dbs" component={ DBS } />
               <Route exact path="/js" component={ JS } />
               <Route exact path="/games" component={ Games } />
               <Route exact path="/art" component={ Art } />
               <Route exact path="/about" component={ About } />
               <Route path="*" component={ NotFound } /> 
               </Switch>
            </main>
            <footer></footer>
         </BrowserRouter>
        </AppContext.Provider>
      );
  }
 
}

export default App;
