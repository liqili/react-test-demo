import {
    connect
} from "react-redux";
import Root from "./Root";
import {
    bindActionCreators
} from "redux";
import * as rootActions from "../Root/Root.Actions";


export default connect(
    (state) => ({
        isProcessing: state.rootReducer.isProcessing,
    }), (dispatch) => ({
        rootActions: bindActionCreators(rootActions, dispatch),
    })

)(Root);
