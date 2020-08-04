import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    customers: [],
    loading: false,
    added: false
};

const addCustomerInit = ( state, action ) => {
    return updateObject( state, { added: false } );
};

const addCustomerStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const addCustomerSuccess = ( state, action ) => {
    const newCustomer = updateObject( action.customerData, { id: action.customerId } );
    return updateObject( state, {
        loading: false,
        added: true,
        customers: state.customers.concat( newCustomer )
    } );
};

const addCustomerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};
const removeCustomerInit = ( state, action ) => {
    return updateObject( state, { added: false } );
};

const removeCustomerStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const removeCustomerSuccess = ( state, action ) => {
    console.log("ActionRemovis => "+JSON.stringify(action))
    return updateObject( state, {
        loading: false,
        added: true,
        customers: state.customers.filter(function(el) { return el.id != action.customerId })
    } );
};

const removeCustomerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const fetchCustomersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchCustomersSuccess = ( state, action ) => {
    return updateObject( state, {
        customers: action.customers,
        loading: false
    } );
};

const fetchCustomersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_CUSTOMER_INIT: return addCustomerInit( state, action );
        case actionTypes.ADD_CUSTOMER_START: return addCustomerStart( state, action );
        case actionTypes.ADD_CUSTOMER_SUCCESS: return addCustomerSuccess( state, action )
        case actionTypes.ADD_CUSTOMER_FAIL: return addCustomerFail( state, action );
        case actionTypes.REMOVE_CUSTOMER_INIT: return removeCustomerInit( state, action );
        case actionTypes.REMOVE_CUSTOMER_START: return removeCustomerStart( state, action );
        case actionTypes.REMOVE_CUSTOMER_SUCCESS: return removeCustomerSuccess( state, action )
        case actionTypes.REMOVE_CUSTOMER_FAIL: return removeCustomerFail( state, action );
        case actionTypes.FETCH_CUSTOMERS_START: return fetchCustomersStart( state, action );
        case actionTypes.FETCH_CUSTOMERS_SUCCESS: return fetchCustomersSuccess( state, action );
        case actionTypes.FETCH_CUSTOMERS_FAIL: return fetchCustomersFail( state, action );
        default: return state;
    }
};

export default reducer;