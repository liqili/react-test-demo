import actionTypes from './Root.Constants'

const initialState = {
    isProcessing: false,
};


export default function reducer(state = initialState, action) {

    switch (action.type) {
        case actionTypes.PROCESSING:
            return {
                ...state,
                isProcessing: true
            };
        case actionTypes.PROCESSED:
            return {
                ...state,
                isProcessing: false
            };

        default:
            return state
    }
}
