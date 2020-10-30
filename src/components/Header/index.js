import React from "react";
import { useSelector } from 'react-redux';
import Logo from "./../../assets/logo.png"
import "./styles.scss";
import { auth } from './../../firebase/utils'
import { Link } from 'react-router-dom';


const mapState = ({user}) =>({
  currentUser: user.currentUser
});

const Header = (props) => {

  const {currentUser} = useSelector(mapState); 

  return (
  <header className="header">
      <div className="wrap">
          <div className="logo">
             <Link to="/">  
                <img src={Logo} alt = "LOGO"/>
              </Link>  
          </div>
          
          <div className="callToActions">
          {currentUser &&(
            <ul>
              <li>
                <span onClick={() => auth.signOut()}>Logout</span>
              </li>
              <li>
                <Link to="/dashboard">
                  My Account
                </Link>
              </li>
            </ul>

          )}
          {!currentUser && (  <ul>
              <li>
                <Link to="/registration">
                Register
                </Link>
              </li>
              <li>
                <Link to="/login">
                Login
                </Link>
              </li>
            </ul>)}
          </div>
      </div>
  </header>
  );
};

Header.defaultProps= {
  currentUser: null
};

export default Header;
