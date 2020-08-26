import React,{useState,useEffect} from 'react';

import { connect } from 'react-redux';
import axios from '../../axios';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import classes from './Item.module.css';
  
const Item = ( props ) => {
  const [deneme,setDeneme] = useState();
  useEffect(()=>{
    setDeneme(props.checked)
  },[props.checked])
    return (
        <div className={classes.Item}>
            <input  checked={deneme} onClick={()=>{setDeneme(!deneme)}} onChange={(e)=>props.handleCheckbox(e.target.checked,props.id)} className={classes.Input} type="checkbox"/>
            <p className={classes.Name}> <strong>{props.name}</strong></p> 
            <p className={classes.Others}> <strong><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp;{props.status}</strong></p>
            <p className={classes.Workers}> <strong>{Number.parseFloat( props.workers).toFixed( 0 )}</strong></p>
            <p className={classes.Others}> <strong>{props.type}</strong></p>
            <button className={classes.Buttons} onClick={()=>{props.deleteItem(props.id)}}>DELETE</button>
            <button className={classes.Buttons} onClick={()=>{props.editingHandler(props)}}>EDIT</button>
            <FontAwesomeIcon className={classes.MyIcon} icon="circle" size="xs" color="blue"/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
      loading: state.item.loading,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onRemoveItem: (id) => dispatch(actions.removeItem(id)),
    };
    
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withErrorHandler(Item, axios));

