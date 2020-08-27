import React, { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import classes from './AddItem.module.css';
import axios from '../../../axios';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AddItem = props => {
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
  
  const [formIsValid, setFormIsValid] = useState(false);


  const clearForm = () =>{
    const updatedForm = updateObject(itemForm,{
      itemName: updateObject(itemForm.itemName,{value:"",valid:false,touched:false}),
      itemCode:updateObject(itemForm.itemCode,{value:'',valid:false,touched:false}),
      itemGroup:updateObject(itemForm.itemGroup,{value:'Consumables',valid:true,touched:false}),
      unit:updateObject(itemForm.unit,{value:'Unit',valid:true,touched:false}),
      // type:updateObject(itemForm.type,{value:'company'})
    })
    setItemForm(updatedForm)
  }
  
  const addItemHandler = event => {
    // event.preventDefault();
    if(!(formIsValid)){
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

    props.onAddItem(item /*, props.token*/);
    props.addedNew();
    props.clearChecked();
    clearForm();
    setFormIsValid(false);
  };
  const addExamplesHandler = event => {
    // event.preventDefault();

    const info=[
                  {itemName:'Apple',itemCode:'101ul',unit:'Kg',itemGroup:'Consumables',status:'Enabled'},
                  {itemName:'Software',itemCode:'3qTTkO',unit:'Unit',itemGroup:'Product',status:'Enabled'},
                  {itemName:'Sugar',itemCode:'QKMYuhG43',unit:'Kg',itemGroup:'Raw',status:'Enabled'},
                  {itemName:'Idea',itemCode:'kLxiqjH4',unit:'Unit',itemGroup:'Consumables',status:'Enabled'},
                  {itemName:'Metal',itemCode:'rnDoM92',unit:'Kg',itemGroup:'Raw',status:'Enabled'},
                ]
    info.forEach(i=>{
      props.onAddItem(i);
    })
    props.addedNew();
    clearForm();
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
    setFormIsValid(formIsValid)
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
    <form onSubmit={addItemHandler}>
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
          changed={event => inputChangedHandler(event, formElement.id)}
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
          <span className={classes.Text1}><strong>New Item</strong></span>
          <button className={classes.SaveBtn} onClick={()=>addItemHandler()}>Save</button>
          <button className={classes.CloseBtn} onClick={()=> props.closeNew()}>Close</button>
          <button className={classes.CloseBtnSmall} onClick={()=> props.closeNew()}><FontAwesomeIcon icon="times" size="4px" color="#696969"/></button>
          <button className={classes.ResetBtn} onClick={()=>clearForm()} >Reset</button>
          <button className={classes.ExamplesBtn} onClick={()=>addExamplesHandler()}>AddExamples</button>
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
    onAddItem: (itemData) =>
      dispatch(actions.addItem(itemData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(AddItem, axios));
