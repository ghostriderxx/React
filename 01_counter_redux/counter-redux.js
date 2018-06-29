import {createStore} from "redux";

const initialState = {
    count: 0,
};

function counterReducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case "INC":
            return {
                ...state,
                count: state.count + 1,
            };
        case "DEC":
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
}

// Create Store
const store = createStore(counterReducer);

// Add State Change Listener
store.subscribe(function () {
    console.log(store.getState());
})

// Dispatch Action
store.dispatch({
    type: "INC"
});
store.dispatch({
    type: "INC"
});
store.dispatch({
    type: "INC"
});
store.dispatch({
    type: "DEC"
});




