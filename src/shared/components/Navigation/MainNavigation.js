import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLikns from "./NavLinks";
import SideDraw from "./SideDraw";
import Backdrop from "../UiElements/Backdrop";

import "./MainNavigation.css";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDraw = () => {
    setDrawerIsOpen(false);
  };

  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDraw} />}
      <SideDraw show={drawerIsOpen} onClick={closeDraw}>
        <nav className='main-navigation__drawer-nav'>
          <NavLikns />
        </nav>
      </SideDraw>
      <MainHeader>
        <button className='main-navigation__menu-btn' onClick={openDrawer}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className='main-navigation__title'>
          <Link to='/'>Your Places</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLikns />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
