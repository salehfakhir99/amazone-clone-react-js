
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router , Switch,Route} 
from "react-router-dom";
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './Firebase';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const promise = loadStripe('pk_test_51IUIaHEn6AdwJXWGa4lLjg7uBUzOhq20EwpHu4vDEloQKroXsuFLzA4Gt0XIXCU53Pqcvg7wr0kUZ1QqaveeZHiJ00X0H1mI7p');

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(()=>{
    ///// will only run once when the app component load....
    auth.onAuthStateChanged(authUser =>{
      console.log('The user is >>>>>', authUser);
      if(authUser){
        //the user just logged in / the user was logged
        dispatch({
          type : 'SET_USER',
          user: authUser
        })
      }else{
        // the user is logged out
        dispatch({
          type : 'SET_USER',
          user: null
        })

      }
     
  
      })

  }, [])
  return (
    <Router>
    <div className="app">
    
      <Switch>
      <Route path="/Login">
        <Login/>
        </Route>
        
        <Route path="/Checkout">
        <Header/>
          <Checkout/>
        </Route>
        <Route path="/payment">
        <Header/>
          <Elements stripe={promise}>
          <Payment/>
          </Elements>
        </Route>
        <Route path="/orders">
        <Header/>
        <Orders/>
        </Route>
        <Route path="/">
        <Header/>
          <Home/>
        </Route>
        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
