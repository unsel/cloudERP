import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Rootpage.module.css';




const Rootpage = props => {


    return (
        <div className={classes.Shortcuts}>
            <Link to="/customers"><div><strong>Flats</strong></div></Link>
            <Link to="/customers"><div><strong>Customers</strong></div></Link>
            <Link to="/customers"><div><strong>Invoices</strong></div></Link>
            <Link to="/customers"><div><strong>NoContext</strong></div></Link>
        </div>
    )
}

export default Rootpage;