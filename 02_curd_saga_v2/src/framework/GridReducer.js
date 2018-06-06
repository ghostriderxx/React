const initialState = {
    data: [],
    loading: false,
};

export default function GridReducerFactory(namespace){
    return function userEditReducer(state = initialState, action) {
        switch (action.type) {
            case namespace+"/GRID_FILL_DATA_SUCCESS":
                return {
                    ...state,
                    data: action.payload,
                    loading: false,
                };


            case namespace+"/GRID_SORT_INPROGRESS":
                return {
                    ...state,
                    loading: true,
                };
            case namespace+'/GRID_SORT_SUCCESS':
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    loading: false,
                };

            default:
                return state;
        }
    }
}


