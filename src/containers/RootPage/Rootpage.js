import React from 'react';
import classes from './Rootpage.module.css';




const Rootpage = props => {


    return (
        <div className={classes.Shortcuts}>
            <a href="customers"><div><strong>Flats</strong></div></a>
            <a href="customers"><div><strong>Customers</strong></div></a>
            <a href="customers"><div><strong>Invoices</strong></div></a>
            <a href="customers"><div><strong>NoContext</strong></div></a>
        </div>
    )
}

export default Rootpage;