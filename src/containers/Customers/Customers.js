import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Customer from '../../components/Customer/Customer';
import AddCustomer from '../../components/Customer/AddCustomer/AddCustomer';
import EditCustomer from '../../components/Customer/EditCustomer/EditCustomer';
import EditMultiple from '../../components/EditMultiple/EditMultiple';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import NotFound from '../../components/UI/NotFound/NotFound';
import classes from './Customers.module.css';
import Header from '../../components/Header/Header';
import Modal from '../../components/UI/Modal/Modal';

import {Dropdown,DropdownButton} from 'react-bootstrap';



const Customers = props => {
  const { onFetchCustomers } = props;
  const [nameFilter,setNameFilter] = useState(""); const[tempNameFilter,setTempNameFilter]=useState("");
  const [workerFilter,setWorkerFilter] = useState(""); const[tempWorkerFilter,setTempWorkerFilter]=useState("");
  const [addingNew,setAddingNew] = useState(false);
  const [editing,setEditing] = useState(false);
  const [editingMultiple,setEditingMultiple] = useState(false);
  const [editForm,setEditForm] = useState('initial')
  const [sortFilter,setSortFilter] = useState("");
  const [sortOrder,setSortOrder] = useState(1);
  const [selectedItems,setSelectedItems] = useState([])
  const [checkAll,setCheckAll] = useState(false)
  const [formModalOpen,setFormModalOpen] = useState(false)   // Form Warning
  const [formMissingInfo,setFormMissingInfo]= useState([]);
  const [formInvalidInfo,setFormInvalidInfo]= useState([]);
  const [itemCount,setItemCount] = useState([true,false,false])

  useEffect(()=>{
    const escFunction =(event)=>{
      if(event.keyCode === 27) {
        if(formModalOpen){setFormModalOpen(false); return}
        if(addingNew){setAddingNew(false); return}
        if(editing){setEditing(false); return}
      }
    }
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  })
  useEffect(() => {
    onFetchCustomers(/*props.token, props.userId*/);
  }, [onFetchCustomers]);
 
    const sortBy = (a,b) => {
      if(sortFilter === "name"){
      return a[sortFilter] > b[sortFilter] ? sortOrder:-sortOrder;
      } else if (sortFilter ==="workers" || sortFilter ==="revenue"){
        return +a[sortFilter] > +b[sortFilter] ? sortOrder:-sortOrder;
      }
    }

  let dropdown = <DropdownButton
                  alignRight
                  title="Actions"
                  id="dropdown-menu-align-right"
                  size="sm"
                  variant="primary"
                >
                  <Dropdown.Item eventKey="1" onClick={()=>deleteSelected()}>Delete</Dropdown.Item>
                  <Dropdown.Item onClick={()=>editingMultipleHandler()} eventKey="2">Edit (NA)</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Print</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
  let customers = <Spinner />;
  if (!props.loading) {
    customers= !props.customers.length ? <NotFound create={()=>addingNewHandler()}  elementName='Customer'/> :[...props.customers].slice(0,itemCount[0]?20:(itemCount[1]?50:100)).sort(sortBy)
            .filter(customer => (customer.name.includes(nameFilter) || +customer.workers < workerFilter) )
            .map(customer => (
      <Customer
        key={customer.id}
        name={customer.name}
        revenue={customer.revenue}
        workers={customer.workers}
        id={customer.id}
        type={customer.type}
        status={customer.status}
        mail={customer.mail}
        phoneNumber={customer.phoneNumber}
        editingHandler={(customerData)=>editingHandler(customerData)}
        handleCheckbox={(value,id)=>handleCheckbox(value,id)}
        checked = {checkAll?true:null}
        deleteItem = {(id)=>deleteItem(id)}
        // products={(Object.keys(customer.products)).map((item,i)=>{return <p>{item}</p>})}
      />
    ));
  }
 
  const clearChecked = () => {
    setCheckAll(false);
    setSelectedItems([]);
  }

  const handleCheckbox = (value,id) =>{
    if(value){
      setSelectedItems(selectedItems => [...selectedItems,id]);
    } else {
      let array = [...selectedItems];
      let index = array.indexOf(id);
      if (index !== -1){
        array.splice(index,1);
        setSelectedItems(array)
      }
    }
    if(selectedItems.length === 1){
      setCheckAll(false)
    }
    if(selectedItems.length === [...props.customers].filter(customer => (customer.name.includes(nameFilter) || +customer.workers < workerFilter) ).length-1){
      setCheckAll(true)
    }
  }

  const deleteSelected = () => {
    [...selectedItems].forEach(id=>{
      props.onRemoveCustomer(id)
    });
    clearChecked();
  }

  const editingHandler = ( customerData ) => {
    setEditForm(customerData)
    setEditing(true);
  }
  const editingClosedHandler = (e) => {
    setEditing(false)
  }
  const editingFinishedHandler = (e) => {
    setEditing(false)
    clearChecked();
  }
  const refreshHandler = () => {
    clearChecked();
    onFetchCustomers();
  }

  const checkAllHandler = () =>{
    if(checkAll){
      setSelectedItems([]);
      setCheckAll(!checkAll);
    } else {
      setSelectedItems([]);
      [...props.customers].filter(customer => (customer.name.includes(nameFilter) || +customer.workers < workerFilter) ).forEach(customer=>setSelectedItems(selectedItems => [...selectedItems,customer.id]));
      
      setCheckAll(!checkAll);
    }
  }

  const deleteItem = (id) =>{
    props.onRemoveCustomer(id);
    clearChecked();
  }

  const resetFilters = () => {
    setNameFilter(""); setWorkerFilter("tempWorkerFilter");
    setTempNameFilter(""); setTempWorkerFilter("");
    setSortFilter("");
  }
  const applyFilters = () => {
    setNameFilter(tempNameFilter);
    setWorkerFilter(tempWorkerFilter);
    refreshHandler();
  }
  const nameFilterChangedHandler= (e) => {
    setTempNameFilter(e.target.value)
  }
  const searchNameFilter = (e) => {
    if(e.key === 'Enter'){
      setNameFilter(e.target.value)
      refreshHandler()    // bad practice ?
    }  
  }
  const workerFilterChangedHandler= (e) => {
    setTempWorkerFilter(e.target.value)
  }
  const searchWorkerFilter = (e) => {
    if(e.key === 'Enter'){
      setWorkerFilter(e.target.value)
      refreshHandler()
    }
  }
  
  
  
  const addingNewHandler = (e) => {
    setAddingNew(true)
  }
  const addingClosedHandler = (e) => {
    setAddingNew(false)
  }
  const addedNewHandler = (e) => {
    setAddingNew(false)
    // setFormMissingInfo([]);
    // setFormInvalidInfo([]);
  }
  const editingMultipleHandler = (e) => {
      setEditingMultiple(true)
  }
  const editingMultipleClosedHandler = (e) => {
      setEditingMultiple(false)
  }
  const editedMultipleHandler = () => {
      setEditingMultiple(false)
      clearChecked();
  }
  

  
  const sortOrderToggleHandler = () => {
    setSortOrder(-sortOrder);
  }
  const formModalOpener = (a,b) => {
    setFormMissingInfo(a);
    setFormInvalidInfo(b);
    setFormModalOpen(true);
  }
  let icon = (sortOrder === -1) ? <FontAwesomeIcon icon="arrow-down" onClick={()=>{sortOrderToggleHandler()}}/>:<FontAwesomeIcon icon="arrow-up" onClick={()=>{sortOrderToggleHandler()}}/>;
  let filterForm = (
    <div className={classes.FilterForm}>
        <input className={classes.NameFilter} placeholder="Name" value={tempNameFilter} type="text" onChange={nameFilterChangedHandler} onKeyDown={searchNameFilter}/>
        <input className={classes.WorkerFilter} placeholder="Worker" value={tempWorkerFilter} type="number" onChange={workerFilterChangedHandler} onKeyDown={searchWorkerFilter}/>
        <div className={classes.WidthMaker1}></div>
        <span className={classes.FilterDiv}>
          <button onClick={()=>{applyFilters()}}>ApplyFilters</button>
          <button onClick={()=>{resetFilters()}}>ResetFilters</button>
          {icon}
        </span>
    </div>
  )
  const headDiv = (
    <div className={classes.HeadDiv}>
          <input checked={checkAll && (selectedItems.length)} type="checkbox" onClick={()=>checkAllHandler()}/>
      {selectedItems.length === 0 ? 
          <div>
            <p className={classes.Name} onClick={()=>{setSortFilter("name")}}> <strong>Full Name</strong></p> 
            <p className={classes.Others} > <strong>Status </strong></p>
            <p className={classes.Workers} onClick={()=>{setSortFilter("workers")}}> <strong>Workers</strong></p>
            <p className={classes.Others} > <strong>Type </strong></p>
            <span className={classes.Rate}>
               {props.loading ? '?' : !customers[0] ? 0 :customers.length<=20 ? customers.length: (itemCount[0]) ? 20 :( customers.length <= 50 ? customers.length : (itemCount[1]? 50 :(customers.length <= 100 ? customers.length :100)))}  of {props.customers.length}
            </span> 
            
            </div>
            : <div><p className={classes.ItemCount}>{selectedItems.length + ' items selected'}</p>
            <span className={classes.Rate}>
              {props.loading ? '?' : !customers[0] ? 0 : customers.length<=20 ? customers.length: (itemCount[0]) ? 20 :( customers.length <= 50 ? customers.length : (itemCount[1]? 50 :(customers.length <= 100 ? customers.length :100)))}  of {props.customers.length}</span>  
            </div>
                        }
        </div>
  )
  const countDiv = (
    <div className={classes.countDiv}>
      <button onClick={()=>setItemCount([true,false,false])} className={itemCount[0]?classes.MyFocus:classes.MyNormal}>20</button>
      <button onClick={()=>setItemCount([false,true,false])} className={itemCount[1]?classes.MyFocus:classes.MyNormal}>50</button>
      <button onClick={()=>setItemCount([false,false,true])} className={itemCount[2]?classes.MyFocus:classes.MyNormal}>100</button>
    </div>
  )
 
  const sideBar = (
    <div className={classes.Sidebar} >
      <ul>
        <li>VIEWS</li>
        <li>Dashboard</li>
        <li>Images</li>
      </ul>
      <ul>
        <li>FILTER BY</li>
        <li>Assigned To</li>
        <li>Created By</li>
      </ul>
      <ul>
        <li>TAGS</li>
        <li>Tags</li>
        <li>Show Tags</li>
      </ul>
    </div>
  )
  const errorModal = (
            <Modal show={formModalOpen} modalClosed={()=>{setFormModalOpen(false)}} modalType='Modal2'>
              <div className={classes.FormModal}>
                <div className={classes.ModalHeadDiv}>
                  <span className={classes.Text1}>
                    {formMissingInfo[0] ? <strong><FontAwesomeIcon icon="circle" color="orange" size='xs'/> Missing Values Required</strong>
                                      : <strong><FontAwesomeIcon icon="circle" color="red" size='xs'/> Message</strong>}
                      
                    </span>
                      
                  <button className={classes.CloseBtn} onClick={()=>{setFormModalOpen(false)}}>Close</button>
                </div>
                <div className={classes.Missing}>
                  {formMissingInfo[0] ? <p>Following fields have missing values:</p> : <p>Following fields have invalid information:</p>}
                  <ul>
                  {formMissingInfo[0]  ? formMissingInfo.map((el,i)=>{return <li>{el}</li>})  
                                       : formInvalidInfo.map((el,i)=>{return <li>{el}</li>}) }
                  
                  </ul>
                </div>
              </div>
          </Modal>
  )
  const editMultipleModal = (
    <Modal show={editingMultiple} modalClosed={()=>editingMultipleClosedHandler() } modalType='Modal1'>
            <EditMultiple
              idArray={selectedItems}
              editedMultipleHandler={()=>editedMultipleHandler()}
              editingMultipleClosed={()=>editingMultipleClosedHandler()}
              clearChecked={()=>clearChecked()}
              formModalOpener={(a,b)=>formModalOpener(a,b)}/>
          </Modal>
  )
  const addCustomerModal = (
    <Modal show={addingNew} modalClosed={()=>addingClosedHandler() } modalType='Modal1'>
      <AddCustomer
        addedNew={()=>addedNewHandler()}
        closeNew={()=>addingClosedHandler()}
        clearChecked={()=>clearChecked()}
        formModalOpener={(a,b)=>formModalOpener(a,b)}/>
    </Modal>
  )
  const editCustomerModal = (
    <Modal show={editing} modalClosed={()=>editingClosedHandler()} modalType='Modal1'>
      <EditCustomer
        customerData={editForm}
        editingFinished={()=>editingFinishedHandler()}
        editingClosed={()=>editingClosedHandler()}
        formModalOpener={(a,b)=>formModalOpener(a,b)}
        />
    </Modal>
  )
  const header = (
    <Header
      name = {"Customers"}
      addingHandler = {()=>addingNewHandler()} 
      refreshHandler={()=>refreshHandler()}
      dropdown={selectedItems.length?dropdown:null}/>
  )
  
  return (
      <div >
          {errorModal}
          {editMultipleModal}
          {addCustomerModal}
          {editCustomerModal}
          {header}
          {sideBar}
          <div className={classes.Content}>
            <div className={classes.SidebarTemp}></div>
            <div className={classes.Customers}>
            
              {filterForm}
              {headDiv}
              <div className={classes.CustomersHeight}>{customers}</div>
              {countDiv}
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
    onFetchCustomers: (/*token, userId*/) =>dispatch(actions.fetchCustomers(/*token, userId*/)),
    onRemoveCustomer: (id) => dispatch(actions.removeCustomer(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Customers, axios));
