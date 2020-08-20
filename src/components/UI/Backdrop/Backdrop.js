import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = (props) => {

    const modalClass = [props.modalType === 'Modal1'? classes.Backdrop : classes.Backdrop2]


    return (
     props.show ? <div className={modalClass.join(' ')} onClick={props.clicked}></div> : null
    );
}

export default Backdrop;