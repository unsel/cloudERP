import React from 'react';

import classes from './Sidebar1.module.css';


const Sidebar1 = props => {
    
    return (
        <div className={classes.Sidebar} >
            <ul>
                <li>VIEWS (NA)</li>
                <li>Report (NA)</li>
                <li>Dashboard (NA)</li>
                <li>Images (NA)</li>
            </ul>
            <ul>
                <li>FILTER BY (NA)</li>
                <li>Assigned To (NA)</li>
                <li>Created By (NA)</li>
                <li>Add Fields + (NA)</li>
            </ul>
            <ul>
                <li>TAGS (NA)</li>
                <li>Tags (NA)</li>
                <li>Show Tags (NA)</li>
            </ul>
        </div>
    )
}

export default Sidebar1;