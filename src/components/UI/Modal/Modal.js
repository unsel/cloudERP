import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {

  const modalClass = [props.modalType === 'Modal1'? classes.Modal : classes.Modal2]

  return (
    <div>
      <Backdrop show={props.show} clicked={props.modalClosed} modalType={props.modalType}/>
      <div
        className={modalClass.join(' ')}
        style={{
          transform: props.show ? 'translateY(200px)' : 'translateY(-50vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
