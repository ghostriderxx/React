const initialState = {
    data: [],
    loading: false,
    filterCondition: null,
};

export default function GridReducerFactory(namespace){
    return function(state = initialState, action) {
        switch (action.type) {
            case namespace+"/GRID_FILL_DATA_SUCCESS":
                return {
                    ...state,
                    data: action.payload,
                    loading: false,
                };

            // 排序
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


