import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import CSS from './pages/css/CSS';
import DBS from './pages/dbs/DBS';
import JS from './pages/js/JS';
import AppContext from './AppContext';

class App extends React.Component {

   state = {
      browserWidth: 0,
      browserHeight: 0
   }
   componentDidMount = () => {
      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler)
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
   
  render () {
   const contextValue = { 
      browserWidth: this.state.browserWidth, 
      browserHeight: this.state.browserHeight, 
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
