import React, { useState } from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


const Layout = props => {

    return (
        <div>
            <Toolbar 
                isAuth={false}
            />
           
        </div>
    )
}

export default Layout;