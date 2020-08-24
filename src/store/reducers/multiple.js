import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    editing:false,
    edited:false
};


const editMultipleInit = ( state, action ) => {
    return updateObject( state, { edited: false } );
};

const editMultipleStart = ( state, action ) => {
    return updateObject( state, { editing: true } );
};

const editMultipleSuccess = ( state, action ) => {
    return updateObject( state, {
        editing:false,
        edited:true
    } );
};

const editMultipleFail = ( state, action ) => {
    return updateObject( state, { editing: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.EDIT_MULTIPLE_INIT: return editMultipleInit( state, action );
        case actionTypes.EDIT_MULTIPLE_START: return editMultipleStart( state, action );
        case actionTypes.EDIT_MULTIPLE_SUCCESS: return editMultipleSuccess( state, action )
        case actionTypes.EDIT_MULTIPLE_FAIL: return editMultipleFail( state, action );
       
        default: return state;
    }
};

export default reducer;