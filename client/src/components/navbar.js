import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "./navbar.css"
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import { logout } from "../actions/userActions";


// Here, we display our Navbar
export default function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;  
  // console.log(userInfo);
  const greeting = (userInfo && typeof userInfo.name !=='undefined') ?
  <div className="greeting"> Hi  {userInfo.name}</div> : <div> Not Logged in </div>
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout())
  }

  const loginButton = (userInfo && userInfo.name) ? <div><div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={logoutHandler}>
                  Log Out
                </NavLink>
              </li>
            </ul>
          </div></div>
        : <div><div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Log in
              </NavLink>
            </li>
          </ul>
        </div></div>;

  const viewProfileButton = (userInfo && userInfo._id) ? <><div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <NavLink className="nav-link"  to={`/user_profile/${userInfo._id}`}>
       View my profile
      </NavLink>
    </li>
  </ul>
</div></> : <></>;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
        <img style={{"width" : 50 + '%'}} src="https://m.timesofindia.com/thumb/68581755.cms?resizemode=4&width=400"></img>
        </NavLink>

        <Col>
        {greeting}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Book
              </NavLink>
            </li>
          </ul>
        </div>


        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {viewProfileButton}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {loginButton}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </Col>
        
      </nav>
    </div>
  );
}
