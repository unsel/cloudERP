import * as actionTypes from './actionTypes';
import axios from '../../axios-customers';

export const addCustomerSuccess = ( id, customerData ) => {
    return {
        type: actionTypes.ADD_CUSTOMER_SUCCESS,
        customerId: id,
        customerData: customerData
    };
};

export const addCustomerFail = ( error ) => {
    return {
        type: actionTypes.ADD_CUSTOMER_FAIL,
        error: error
    };
}

export const addCustomerStart = () => {
    return {
        type: actionTypes.ADD_CUSTOMER_START
    };
};

export const addCustomer = ( customerData/*, token*/) => {
    return dispatch => {
        dispatch( addCustomerStart() );
        axios.post( '/Customers.json',customerData)
            .then( response => {
                dispatch( addCustomerSuccess( response.data.name, customerData ) );
            } )
            .catch( error => {
                dispatch( addCustomerFail( error ) );
            } );
    };
};

export const addCustomerInit = () => {
    return {
        type: actionTypes.ADD_CUSTOMER_INIT
    };
};


export const fetchCustomersSuccess = ( customers ) => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_SUCCESS,
        customers: customers
    };
};

export const fetchCustomersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_FAIL,
        error: error
    };
};

export const fetchCustomersStart = () => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_START
    };
};

export const fetchCustomers = (/*token, userId*/) => {
    return dispatch => {
        dispatch(fetchCustomersStart());
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/Customers.json')
            .then( res => {
                const fetchedCustomers = [];
                for ( let key in res.data ) {
                    fetchedCustomers.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchCustomersSuccess(fetchedCustomers));
            } )
            .catch( err => {
                dispatch(fetchCustomersFail(err));
            } );
    };
};