const initialState = {
    contacts: [],
    selectedContact: -1,
    loading: false,
}

export default function contactList(state=initialState, action) {
    switch (action.type) {
        case "SELECT_CONTACT":
            return {
                ...state,
                selectedContact: action.payload,
            };

        case "FETCH_CONTACTLIST_INPROGRESS":
            return {
                ...state,
                loading: true,
            }

        case "FETCH_CONTACTLIST_SUCCESS":
            return {
                contacts: action.payload,
                selectedContact: -1,
                loading: false,
            }

        case "FETCH_CONTACTLIST_FAILED":
            return {
                contacts: action.payload,
                selectedContact: -1,
                loading: false,
            }
        default:
            return state;
    }
}
