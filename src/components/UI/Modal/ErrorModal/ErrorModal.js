import React from 'react';
import Modal from '../Modal';
import classes from './ErrorModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const errorModal = props => {


    return (
        <Modal show={props.formModalOpen} modalClosed={()=>{props.setFormModalOpen(false)}} modalType='Modal2'>
          <div className={classes.FormModal}>
            <div className={classes.ModalHeadDiv}>
              <span className={classes.Text1}>
                {props.formMissingInfo[0] ? <strong><FontAwesomeIcon icon="circle" color="orange" size='xs'/> Missing Values Required</strong>
                                  : <strong><FontAwesomeIcon icon="circle" color="red" size='xs'/> Message</strong>}
                  
                </span>
                  
              <button className={classes.CloseBtn} onClick={()=>{props.setFormModalOpen(false)}}>Close</button>
            </div>
            <div className={classes.Missing}>
              {props.formMissingInfo[0] ? <p>Following fields have missing values:</p> : <p>Following fields have invalid information:</p>}
              <ul>
              {props.formMissingInfo[0]  ? props.formMissingInfo.map((el,i)=>{return <li>{el}</li>})  
                                   : props.formInvalidInfo.map((el,i)=>{return <li>{el}</li>}) }
              
              </ul>
            </div>
          </div>
      </Modal>
    )
} 

export default errorModal;