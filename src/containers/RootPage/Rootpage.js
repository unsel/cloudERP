import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Rootpage.module.css';

import Home from '../../components/RootComponents/Home/Home';


const Rootpage = props => {

    
    const sideBar = (
        <div className={classes.Sidebar} >
          <ul>
              <li>Modules</li>
              <li>Home</li>
              <li>Accounting</li>
              <li>Assets</li>
              <li>Buying</li>
              <li>CRM</li>
              <li>HR</li>
              <li>Loan</li>
              <li>Payroll</li>
              <li>Projects</li>
              <li>Quality</li>
              <li>Selling</li>
              <li>Settings</li>
          </ul>
        </div>
      )
    return (
        <div>
            {sideBar}
            <div>
                <div className={classes.SidebarTemp}></div>   
                <Home/>
            </div>
        </div>
    )
}

export default Rootpage;