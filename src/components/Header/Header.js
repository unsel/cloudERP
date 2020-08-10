import React from 'react';
import classes from './Header.module.css'

const Header = props => {

    return (
        <div className={classes.Header}>
          <span className={classes.first}><h2>{props.name}</h2></span> 
          <div className={classes.Buttons}>
                <button>Menu</button>
                <button onClick={props.refreshHandler}>Refresh</button>
                <button className={classes.NewBtn} onClick={props.addingHandler}>New</button>
          </div>    
        </div>
    )
}

export default Header;