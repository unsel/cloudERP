import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    customers: [],
    loading: false,
    // purchased: false
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
        case actionTypes.FETCH_CUSTOMERS_START: return fetchCustomersStart( state, action );
        case actionTypes.FETCH_CUSTOMERS_SUCCESS: return fetchCustomersSuccess( state, action );
        case actionTypes.FETCH_CUSTOMERS_FAIL: return fetchCustomersFail( state, action );
        default: return state;
    }
};

export default reducer;