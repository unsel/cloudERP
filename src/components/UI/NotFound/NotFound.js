import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './NotFound.module.css';
const notFound = props => {
    return (
        <div className={classes.notFound}>
            <div><FontAwesomeIcon icon="folder-open" size='lg'/></div>
            <p> No {props.elementName} Found </p>
            <button onClick={()=>props.create()}>Create A New {props.elementName}</button>
        </div>
      )
} 

export default notFound;