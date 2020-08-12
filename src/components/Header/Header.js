import React from 'react';
import classes from './Header.module.css'

const Header = props => {

    return (
        <div className={classes.Header}>
          <div className={classes.TempDiv}></div>
          <div className={classes.First}><h2>{props.name}</h2></div> 
          <div className={classes.Buttons}>
                <button>Menu</button>
                <button onClick={()=>{props.refreshHandler()}}>Refresh</button>
                <button className={classes.NewBtn} onClick={props.addingHandler}>New</button>
          </div>    
        </div>
    )
}

export default Header;