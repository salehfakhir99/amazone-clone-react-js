import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from './Firebase';
function Header() {
    const [{basket,user},dispatch] = useStateValue();
    const hadleAuthentication = () =>{
        if(user){
            auth.signOut();
        }
    }
    return (
        <div className='header'>
            <Link to='/'>
            <img alt=""
            className="Header_logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
            </Link>
            
            <div className='Header_search'>
                <input
                className="header_searchInput" 
                type="text"/> 
                <SearchIcon className="Header_searchicone"/>
            </div>
            <div className="Header_nav">
                <Link to={!user &&'/login'}>
                <div className="Header_option" onClick={hadleAuthentication}>
                <span className="header_optionLineOne">Hello {user ? user?.email : 'Guest'}</span>
                <span className="header_optionLinetwo">{user ?'Sign Out' : 'Sign In'}</span>

            </div>
                </Link>
                <Link to='/orders'>
            <div className="Header_option">
                
                    <span className="header_optionLineOne">Returns</span>
                    <span className="header_optionLinetwo">& Orders</span>

              
               
            </div>
            </Link>
            <div className="Header_option">
                <span className="header_optionLineOne">Your</span>
                <span className="header_optionLinetwo">Prime</span>

            </div>

            </div>
            <Link to='/Checkout'>
            <div className="Header_optionBasket">
               <ShoppingBasketIcon/>
               <span className="header_optionLineOne Header_basketCount">{basket?.length}</span>
           </div>
            </Link>
            


        </div>
    )
}

export default Header
