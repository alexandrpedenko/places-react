import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Button from '../../components/FormElements/Button';
import './NavLinks.css';

const NavLinks = () => {
  const { userId, isAuthenticated, logOut } = useAuthContext();
  let links = isAuthenticated() ? (
    <ul className='nav-links'>
      <li>
        <NavLink to='/users' exact>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to={`/${userId}/places`} exact>
          My Places
        </NavLink>
      </li>
      <li>
        <NavLink to='/places/new' exact>
          Add Place
        </NavLink>
      </li>
      <li>
        <Button onClick={logOut}>Log Out</Button>
      </li>
    </ul>
  ) : (
    <ul className='nav-links'>
      <li>
        <NavLink to='/users' exact>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to='/auth' exact>
          Log In
        </NavLink>
      </li>
    </ul>
  );

  return links;
};

export default NavLinks;
