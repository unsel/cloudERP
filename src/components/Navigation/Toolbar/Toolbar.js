import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
// import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <div className={classes.Random0}></div>
            
        <div className={classes.Logo}> <Logo /> </div>  &emsp;
        <span className={classes.ToolbarText0}>  AYZ Yonetim Bilisim</span>
        
        <div className={classes.Bars}><FontAwesomeIcon  icon="bars" color="#8D99A6"/></div>

        <div className={classes.Searchbar}>
            <input type="search" placeholder=" Search or type a command"></input>
            
        </div>

        <div className={classes.ToolbarText}>
            Settings <FontAwesomeIcon icon="caret-down"/>&emsp;
            Help <FontAwesomeIcon icon="caret-down"/> &emsp;
        </div>
        <FontAwesomeIcon icon="comments" color="gray" size='sm'/>&nbsp;&nbsp;
        <FontAwesomeIcon icon="bell" color="gray" size='sm'/>&nbsp;&nbsp;
        {/* <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav> */}
        <div className={classes.Random1}></div>
    </header>
);

export default toolbar;