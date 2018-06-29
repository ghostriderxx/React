import {createStore} from "redux";

const initialState = {
    count: 0,
    increment: 1,
    maximum: 20,
};

function counterReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case "SET_INCREMENT":
            return {
                ...state,
                increment: payload,
            };
        case "SET_MAXIMUM":
            return {
                ...state,
                maximum: payload,
            };
        case "INC":
            return {
                ...state,
                count: state.count >= state.maximum ? state.maximum : state.count+1,
            };
        case "DEC":
            return {
                ...state,
                count: state.count-1,
            };
        default:
            return state;
    }
}

// Create Store
const store = createStore(counterReducer);

// Add State Change Listener
store.subscribe(function(){
    console.log(store.getState());
})

store.dispatch({
    type: "INC"
});
store.dispatch({
    type: "INC"
});




