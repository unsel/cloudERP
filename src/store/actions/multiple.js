import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const editMultipleSuccess = ( ) => {
    return {
        type: actionTypes.EDIT_MULTIPLE_SUCCESS,
    };
};

export const editMultipleFail = ( error ) => {
    return {
        type: actionTypes.EDIT_MULTIPLE_FAIL,
        error: error
    };
}

export const editMultipleStart = () => {
    return {
        type: actionTypes.EDIT_MULTIPLE_START
    };
};

export const editMultiple = ( idArray,property,value) => {
    return dispatch => {
        dispatch( editMultipleStart() );
       for (let id in idArray){
            axios.put(`/Customers/${id}/${property}.json`,value)
            .then( response => {
                dispatch(editMultipleSuccess() );
            } )
            .catch( error => {
                dispatch(editMultipleFail( error ) );
            } );
       }
        
    };
};

export const editMultipleInit = () => {
    return {
        type: actionTypes.EDIT_MULTIPLE_INIT
    };
};
