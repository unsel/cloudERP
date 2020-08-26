import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    items: [],
    loading: false,
    added: false
};

const addItemInit = ( state, action ) => {
    return updateObject( state, { added: false } );
};

const addItemStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const addItemSuccess = ( state, action ) => {
    const newItem = updateObject( action.itemData, { id: action.itemId } );
    return updateObject( state, {
        loading: false,
        added: true,
        items: state.items.concat( newItem )
    } );
};

const addItemFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};
const editItemInit = ( state, action ) => {
    return updateObject( state, { added: false } );
};

const editItemStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const editItemSuccess = ( state, action ) => {
    const newItem = updateObject( action.itemData, { id: action.itemId } );
    return updateObject( state, {
        loading: false,
        added: true,
        items: state.items.filter(e=>e.id!==action.itemId).concat( newItem )
    } );
};

const editItemFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};
const removeItemInit = ( state, action ) => {
    return updateObject( state, { added: false } );
};

const removeItemStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const removeItemSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        added: true,
        items: state.items.filter(function(el) { return el.id !== action.itemId })
    } );
};

const removeItemFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const fetchItemsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchItemsSuccess = ( state, action ) => {
    return updateObject( state, {
        items: action.items,
        loading: false
    } );
};

const fetchItemsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_ITEM_INIT: return addItemInit( state, action );
        case actionTypes.ADD_ITEM_START: return addItemStart( state, action );
        case actionTypes.ADD_ITEM_SUCCESS: return addItemSuccess( state, action )
        case actionTypes.ADD_ITEM_FAIL: return addItemFail( state, action );
        case actionTypes.EDIT_ITEM_INIT: return editItemInit( state, action );
        case actionTypes.EDIT_ITEM_START: return editItemStart( state, action );
        case actionTypes.EDIT_ITEM_SUCCESS: return editItemSuccess( state, action )
        case actionTypes.EDIT_ITEM_FAIL: return editItemFail( state, action );
        case actionTypes.REMOVE_ITEM_INIT: return removeItemInit( state, action );
        case actionTypes.REMOVE_ITEM_START: return removeItemStart( state, action );
        case actionTypes.REMOVE_ITEM_SUCCESS: return removeItemSuccess( state, action )
        case actionTypes.REMOVE_ITEM_FAIL: return removeItemFail( state, action );
        case actionTypes.FETCH_ITEMS_START: return fetchItemsStart( state, action );
        case actionTypes.FETCH_ITEMS_SUCCESS: return fetchItemsSuccess( state, action );
        case actionTypes.FETCH_ITEMS_FAIL: return fetchItemsFail( state, action );
        default: return state;
    }
};

export default reducer;