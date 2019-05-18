import {
    connect
} from "react-redux";
import {
    bindActionCreators
} from "redux";
import * as rootActions from "../Root/Root.Actions";
import Home from "./Home";

export default connect((state) => ({
    isProcessing: state.rootReducer.isProcessing,
}), (dispatch) => ({
    rootActions: bindActionCreators(rootActions, dispatch),
}))(Home);
