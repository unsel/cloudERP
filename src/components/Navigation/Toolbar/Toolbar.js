import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <div className={classes.Random1}></div>
        
            <div className={classes.Logo}>
                <Logo />
            </div>
            &emsp;

            <span className={classes.ToolbarText}>  AYZ Yonetim Bilisim</span>
            <div className={classes.Searchbar}>
                <input type="search" placeholder=" Search or type a command"></input>
                
            </div>

            <div className={classes.ToolbarText}>
                Settings <FontAwesomeIcon icon="caret-down"/>&emsp;
                Help <FontAwesomeIcon icon="caret-down"/> &emsp;
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        <div className={classes.Random1}></div>
    </header>
);

export default toolbar;