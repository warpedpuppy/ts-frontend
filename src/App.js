import React from 'react';
import './App.css';
import GraphQL from './components/graphql/GraphQL';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';

import Hexidecimal from './pages/css/color/hexidecimal/Hexidecimal';
import HSL from './pages/css/color/hsl/HSL';
import CSS from './pages/css/CSS';
class App extends React.Component {


  render () {
    
     return (
        <BrowserRouter>
        <header><Menu /></header>
        <main>
           <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/css" component={CSS} />
              {/* <Route exact path="/css/color/hexidecimal" component={Hexidecimal} />
              <Route exact path="/css/color/hsl" component={HSL} /> */}
              <Route path="*" component={NotFound} />
{/*               
                <div className="App">
                  <h1>hello</h1>
                  <GraphQL />
               </div> */}
           </Switch>
        </main>
        
        
        <footer></footer>
        </BrowserRouter>
      
      );
  }
 
}

export default App;
