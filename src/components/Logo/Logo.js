import React from 'react';

import cloudLogo from '../../assets/images/cloud.jpg';
import classes from './Logo.module.css';
import { NavLink } from 'react-router-dom';
const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
       <NavLink to="/"> <img  src={cloudLogo} alt="MyBurger" /></NavLink>
    </div>
);

export default logo;