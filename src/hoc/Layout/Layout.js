import React from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


const Layout = props => {

    return (
        <div>
            <Toolbar 
                isAuth={false}
            />
            
           <main className={classes.Content}>{props.children}</main>
        </div>
    )
}

export default Layout;