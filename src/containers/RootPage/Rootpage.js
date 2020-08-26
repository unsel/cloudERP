import React,{useState} from 'react';
import classes from './Rootpage.module.css';

import Home from '../../components/RootComponents/Home/Home';
import HR from '../../components/RootComponents/HR/HR';

const Rootpage = props => {

    const [page,setPage] = useState('home')

    
    const sideBar = (
        <div className={classes.Sidebar} >
          <ul>
              <li>Modules</li>
              <li onClick={()=>{setPage('home')}}>Home</li>
              <li>Accounting</li>
              <li>Assets</li>
              <li>Buying</li>
              <li>CRM</li>
              <li onClick={()=>{setPage('HR')}}>HR</li>
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
                {page === 'home' ? <Home/> : <HR/>}
            </div>
        </div>
    )
}

export default Rootpage;