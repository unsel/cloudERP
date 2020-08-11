import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './NavigationItems.module.css';
// import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <FontAwesomeIcon icon="bell" color="gray"/>&nbsp;&nbsp;
        {/* {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>} */}
    </ul>
);

export default navigationItems;