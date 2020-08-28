import React,{useState} from 'react';
import classes from './Rootpage.module.css';
import {Link} from 'react-router-dom';

import Home from '../../components/RootComponents/Home';
import HR from '../../components/RootComponents/HR';

const Rootpage = props => {
    // const HR = React.lazy(() => { return import('../../components/RootComponents/HR');});   for less-active components
    const [page,setPage] = useState('Home');
    const Components = {
        Home:Home,
        HR:HR,
        Accounting:Home,Assets:Home,Buying:Home,CRM:Home,Loan:Home,Payroll:Home,Projects:Home,Quality:Home,Selling:Home,Settings:Home
    }
    let MyComponent= Components[page];
    const data = ["Home","Accounting","Assets","Buying","CRM","HR","Loan","Payroll","Projects","Quality","Selling","Settings" ]

    const sideBarItems= [...data].map(item=>(
        <Link to={item}><li onClick={()=>setPage(item)}>{item}</li></Link>
    ))
    const sideBar = (
        <div className={classes.Sidebar} >
          <ul>
              {sideBarItems}
          </ul>
        </div>
    )
    return (
        <div>
            {sideBar}
            <div>
                <div className={classes.SidebarTemp}></div>  
                <MyComponent/>
            </div>
        </div>
    )
}

export default Rootpage;