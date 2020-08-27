import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import classes from './EditItem.module.css';
import axios from '../../../axios';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const EditItem = props => {
  
  const [itemForm, setItemForm] = useState({
    itemCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placehold: 'Item Code'
      },
      value: '',
      validation: { required: true },
      valid: false, touched: false
    },
    itemName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placehold: 'Item Name'
      },
      value: '',
      validation: { required: true },
      valid: false, touched: false
    },
    itemGroup: {
      elementType:'select',
      elementConfig:{
          options:[{value:'Consumables',displayValue:'Consumables'},
                   {value:'Raw',displayValue:'Raw Material'},
                   {value:'Product',displayValue:'Product'}
                  ],
          placehold:'Unit'
          
      },
      value: 'Consumables',
      validation:{}, valid:true
    }, 
    unit : {
      elementType:'select',
      elementConfig:{
          options:[{value:'Unit',displayValue:'Unit'},
                   {value:'Kg',displayValue:'Kg'},
                   {value:'Meter',displayValue:'Meter'}
                  ],
          placehold:'Unit'
          
      },
      value: 'Unit',
      validation:{}, valid:true
    },
  });
  
  
  const [formIsValid, setFormIsValid] = useState(true);


  useEffect(()=>{
    const updatedForm = updateObject(itemForm,{
        itemName: updateObject(itemForm.itemName,{value:props.itemData.itemName,valid:true,touched:false}),
        itemGroup:updateObject(itemForm.itemGroup,{value:props.itemData.itemGroup,valid:true,touched:false}),
        itemCode:updateObject(itemForm.itemCode,{value:props.itemData.itemCode,valid:true,touched:false}),
        unit:updateObject(itemForm.unit,{value:props.itemData.unit,valid:true,touched:false})
      })
      setItemForm(updatedForm); setFormIsValid(true);
      // eslint-disable-next-line
  },[props.itemData])

  const clearForm = () =>{
    const updatedForm = updateObject(itemForm,{
      itemName: updateObject(itemForm.itemName,{value:"",valid:false,touched:false}),
      itemCode:updateObject(itemForm.itemCode,{value:'',valid:false,touched:false}),
      itemGroup:updateObject(itemForm.itemGroup,{value:'Consumables',valid:false,touched:false}),
      unit:updateObject(itemForm.unit,{value:'Unit',valid:false,touched:false}),
    })
    setItemForm(updatedForm)
  }
  const editItemHandler = event => {
    // event.preventDefault();
    if(!formIsValid){
      let a=[];
      for (const property in itemForm){
        if(itemForm[property].validation.required && itemForm[property].value === ''){
          a.push(itemForm[property].elementConfig.placehold)
        }
      }
      
      let b = [];
      for (const property in itemForm){
        if(!itemForm[property].valid && itemForm[property].value !== ''){
          b.push(itemForm[property].elementConfig.placehold)
        }
      }
      
      props.formModalOpener(a,b)
      return
    }

    let formData = {};
    for (let formElementIdentifier in itemForm) {
      formData[formElementIdentifier] = itemForm[formElementIdentifier].value;
    }
   
    const item = {
       itemName:formData.itemName,
      itemCode:formData.itemCode,
      itemGroup:formData.itemGroup,
      unit:formData.unit,
      status:'Enabled',
    };

    props.onEditItem(props.itemData.id,item);
    props.editingFinished();
    clearForm();
    setFormIsValid(true);
  };

  
  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(itemForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        itemForm[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedItemForm = updateObject(itemForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedItemForm) {
      formIsValid = updatedItemForm[inputIdentifier].valid && formIsValid;
    }
    setItemForm(updatedItemForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  const arrayFiller = (itemForm,formElementsArray) => {
    for (let key in itemForm) {
      formElementsArray.push({
        id: key,
        config: itemForm[key]
      });
    }
  }
  arrayFiller(itemForm,formElementsArray)
  let form = (
    <form onSubmit={editItemHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          label={formElement.config.elementConfig.placehold}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id,itemForm)}
        />
      ))}
    </form>
  );
  
  if (props.loading) {
    form = <Spinner />;
  }
 
  
  return (
    <div className={classes.Form}>
      <div className={classes.HeadDiv}>
        <span className={classes.Text1}><strong>Editing Item</strong></span>
        <button className={classes.SaveBtn} onClick={()=>editItemHandler()}>Save</button>
        <button className={classes.CloseBtn} onClick={()=> props.editingClosed()}>Close</button>
        <button className={classes.ResetBtn} onClick={()=>clearForm()} >Reset</button>
      </div>
      {form}
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
    onEditItem: (itemId,itemData) =>
      dispatch(actions.editItem(itemId,itemData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EditItem, axios));
