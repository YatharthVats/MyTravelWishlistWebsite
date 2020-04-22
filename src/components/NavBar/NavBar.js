import React from "react";
import "./NavBar.css";
import { NavLink, Route, Switch } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import HomePage from "../HomePage/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import Login from "../Login/Login";
import AboutUs from "../About-Us/About-Us";

const NavBar = () => {
  let val = null;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuthenticated);
  const logout = () => {
    dispatch({ type: "HAS_LOGGED_OUT" });
  };
  if (isAuth === false) {
    val = (
      <>
        <nav id="navigation">
          <NavLink className="link" exact to={"/"} activeClassName="selected">
            Home
          </NavLink>
          <NavLink to={"/about-us"} className="link" activeClassName="selected">
            About Us
          </NavLink>
          <NavLink to={"/login"} className="link" activeClassName="selected">
            Login
          </NavLink>
          <NavLink className="link" to={"/signup"} activeClassName="selected">
            Sign Up
          </NavLink>
        </nav>
      </>
    );
  } else {
    val = (
      <>
        <nav id="navigation">
          <NavLink className="link" exact to={"/"} activeClassName="selected">
            Home
          </NavLink>
          <NavLink to={"/about-us"} className="link" activeClassName="selected">
            About Us
          </NavLink>
          <Button onClick={logout} className="link logout-button">
            Logout{" "}
          </Button>
        </nav>
      </>
    );
  }
  return (
    <div>
      {val}
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <div className="mainBar">
              <SignUp />
            </div>
          </Route>
          <Route path="/login">
            <div className="mainBar">
              <Login />
            </div>
          </Route>
          <Route path="/about-us">
            <AboutUs />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default NavBar;
