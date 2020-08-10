import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';

import Customer from '../../components/Customer/Customer';
import AddCustomer from '../../components/Customer/AddCustomer/AddCustomer';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Customers.module.css';
import Header from '../../components/Header/Header';
import Modal from '../../components/UI/Modal/Modal';


const Customers = props => {
  const { onFetchCustomers } = props;
  const [nameFilter,setNameFilter] = useState("")
  const [workerFilter,setWorkerFilter] = useState()
  const [addingNew,setAddingNew] = useState(false);

  useEffect(() => {
    onFetchCustomers(/*props.token, props.userId*/);
  }, [onFetchCustomers]);

  let customers = <Spinner />;
  if (!props.loading) {
    customers= props.customers.filter(customer => (customer.name.includes(nameFilter) || +customer.workers < workerFilter) )
    .map(customer => (
      <Customer
        key={customer.id}
        name={customer.name}
        revenue={customer.revenue}
        workers={customer.workers}
        id={customer.id}
        // products={(Object.keys(customer.products)).map((item,i)=>{
        //   return <p>{item}</p>
        // })}
      />
    ));
  }
  const nameFilterChangedHandler= (e) => {
    setNameFilter(e.target.value)
  }
  const workerFilterChangedHandler= (e) => {
    setWorkerFilter(e.target.value)
  }
  const addingNewHandler = (e) => {
    setAddingNew(true)
  }
  const addingClosedHandler = (e) => {
    setAddingNew(false)
  }
  
  let filterForm = (
    <div className={classes.FilterForm}>
        <input placeholder="Name" value={nameFilter} type="text" onChange={nameFilterChangedHandler}/>
        <input placeholder="Worker" value={workerFilter} type="number" onChange={workerFilterChangedHandler}/>
    </div>
  )
  const headDiv = (
    <div className={classes.HeadDiv}>
            <p> <strong>Full Name</strong></p> 
            <p> <strong>Revenue </strong></p>
            <p> <strong>Workers</strong></p>
          {/* <p>{props.products.map((item,i)=>{ 
            return <p>Product {i} - {item.product1}</p>
          })}</p> */}
          {/* <p>{props.products}</p> */}
        </div>
  )
  return (
      <div >
          <Modal show={addingNew} modalClosed={()=>addingClosedHandler()}>
            <AddCustomer
              addedNew={()=>addingClosedHandler()}
              closeNew={()=>addingClosedHandler()}/>
          </Modal>
          <Header
            name = {"Customers"}
            addingHandler = {()=>addingNewHandler()} 
            refreshHandler={()=>onFetchCustomers()}/>
          <div className={classes.Content}>
            <div className={classes.Sidebar}>
               
            </div>
            <div className={classes.Customers}>
            {filterForm}
            {headDiv}
            {customers}
            </div>
            
          </div>
          
      </div>
  )
};

const mapStateToProps = state => {
  return {
    customers: state.customer.customers,
    loading: state.customer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCustomers: (/*token, userId*/) =>
      dispatch(actions.fetchCustomers(/*token, userId*/))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Customers, axios));
