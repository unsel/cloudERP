import React from 'react';

import classes from './Sidebar1.module.css';


const Sidebar1 = props => {
    
    return (
        <div className={classes.Sidebar} >
            <ul>
                <li>VIEWS</li>
                <li>Report</li>
                <li>Dashboard</li>
                <li>Images</li>
            </ul>
            <ul>
                <li>FILTER BY</li>
                <li>Assigned To</li>
                <li>Created By</li>
                <li>Add Fields +</li>
            </ul>
            <ul>
                <li>TAGS</li>
                <li>Tags</li>
                <li>Show Tags</li>
            </ul>
        </div>
    )
}

export default Sidebar1;