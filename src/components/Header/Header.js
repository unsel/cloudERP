import React from 'react';
import classes from './Header.module.css'

const Header = props => {

    return (
        <div className={classes.Header}>
          <span className={classes.first}><h2>{props.name}</h2></span> 
          <div className={classes.Buttons}>
                <button>Menu</button>
                <button>New</button>
                <button className={classes.Ref}>Refresh</button>
          </div>    
        </div>
    )
}

export default Header;