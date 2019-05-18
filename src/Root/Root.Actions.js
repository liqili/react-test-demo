import actionTypes from './Root.Constants';
export function showSpinner() {
    return {
        type: actionTypes.PROCESSING,
    };
}

export function hideSpinner() {
    return {
        type: actionTypes.PROCESSED,
    };
}

