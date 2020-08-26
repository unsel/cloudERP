import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addItemSuccess = ( id, itemData ) => {
    return {
        type: actionTypes.ADD_ITEM_SUCCESS,
        itemId: id,
        itemData: itemData
    };
};

export const addItemFail = ( error ) => {
    return {
        type: actionTypes.ADD_ITEM_FAIL,
        error: error
    };
}

export const addItemStart = () => {
    return {
        type: actionTypes.ADD_ITEM_START
    };
};

export const addItem = ( itemData) => {
    return dispatch => {
        dispatch( addItemStart() );
        axios.post( '/Items.json',itemData)
            .then( response => {
                dispatch( addItemSuccess( response.data.name, itemData ) );
            } )
            .catch( error => {
                dispatch( addItemFail( error ) );
            } );
    };
};

export const addItemInit = () => {
    return {
        type: actionTypes.ADD_ITEM_INIT
    };
};

export const editItemSuccess = ( id, itemData ) => {
    return {
        type: actionTypes.EDIT_ITEM_SUCCESS,
        itemId: id,
        itemData: itemData
    };
};

export const editItemFail = ( error ) => {
    return {
        type: actionTypes.EDIT_ITEM_FAIL,
        error: error
    };
}

export const editItemStart = () => {
    return {
        type: actionTypes.EDIT_ITEM_START
    };
};

export const editItem = ( itemId,item) => {
    return dispatch => {
        dispatch( editItemStart() );
       
        axios.put(`/Items/${itemId}.json`,item)
            .then( response => {
                dispatch(editItemSuccess(itemId,item) );
            } )
            .catch( error => {
                dispatch(editItemFail( error ) );
            } );
    };
};

export const editItemInit = () => {
    return {
        type: actionTypes.EDIT_ITEM_INIT
    };
};




export const removeItemSuccess = ( id, itemData ) => {
    return {
        type: actionTypes.REMOVE_ITEM_SUCCESS,
        itemId: id,
        itemData: itemData
    };
};

export const removeItemFail = ( error ) => {
    return {
        type: actionTypes.REMOVE_ITEM_FAIL,
        error: error
    };
}

export const removeItemStart = () => {
    return {
        type: actionTypes.REMOVE_ITEM_START
    };
};

export const removeItem = ( itemId/*, token*/) => {
    return dispatch => {
        dispatch( removeItemStart() );
       
        axios.delete(`/Items/${itemId}.json`)
            .then( response => {
                dispatch(removeItemSuccess(itemId) );
            } )
            .catch( error => {
                console.log('error is'+error)
                // dispatch(removeItemFail( error ) );
            } );
    };
};

export const removeItemInit = () => {
    return {
        type: actionTypes.REMOVE_ITEM_INIT
    };
};

export const fetchItemsSuccess = ( items ) => {
    return {
        type: actionTypes.FETCH_ITEMS_SUCCESS,
        items: items
    };
};

export const fetchItemsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ITEMS_FAIL,
        error: error
    };
};

export const fetchItemsStart = () => {
    return {
        type: actionTypes.FETCH_ITEMS_START
    };
};

export const fetchItems = (/*token, userId*/) => {
    return dispatch => {
        dispatch(fetchItemsStart());
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/Items.json')
            .then( res => {
                console.log("resdata=>" + JSON.stringify(res.data))
                const fetchedItems = [];
                for ( let key in res.data ) {
                    fetchedItems.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchItemsSuccess(fetchedItems));
            } )
            .catch( err => {
                dispatch(fetchItemsFail(err));
            } );
    };
};