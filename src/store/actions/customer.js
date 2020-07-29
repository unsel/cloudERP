import * as actionTypes from './actionTypes';
import axios from '../../axios-customers';


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
    console.log("reached here")
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