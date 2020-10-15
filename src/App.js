import  React,{Suspense,lazy,useState,Fragment} from 'react';
import {HashRouter as Router,Switch,Route} from 'react-router-dom'

import './App.css';
import Home from './Home'
import Unfd from './404'

function App(){
    return(
        <Fragment>
            <header className="border_bottom">
              <div className="menu">
                <span className="menu_i preload" ></span>
                <span className="menu_i preload" ></span>
                <span className="menu_i preload" ></span>
              </div>
              <h2 className="title"><a href="./index.html">饿包子的实验箱</a></h2>
            </header>
            <div className="home_body ">
                <Router>
                  <Suspense fallback={<div> loading </div>}>
                  <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="*" component={Unfd}></Route>
                  </Switch>
                  </Suspense>
                </Router>
            </div>
        </Fragment>
    )
}

export default App;