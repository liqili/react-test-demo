import React, {Component} from "react";
import {
    Jumbotron,
    Button,
    ButtonGroup
} from 'react-bootstrap';

const buttons = [
    {label: "Everyone", action: "/everyone"},
    {label: "Male", action: "/male"},
    {label: "Female", action: "/female"},
    {label: "Over 30", action: "/over30"},
    {label: "Under 30", action: "/under30"}
];

const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

const json = (response) => {
    return response.json()
};

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: null,
            buttons: null,
        };
        this.handleBtnClick = this.handleBtnClick.bind(this);

    }

    handleBtnClick(action) {
        this.props.rootActions.showSpinner();

        setTimeout(()=>{
            fetch(action, {
                mode: 'no-cors'
            }).then(status)
                .then(json).then((res) => {
                this.props.rootActions.hideSpinner();
                this.setState({
                    menu: res.map((item) =>
                        (<li>{item.name} {item.age}</li>))
                });
            }).catch((err) => {
                console.error(err);
                this.props.rootActions.hideSpinner();
            });
        }, 1000);
    }

    componentDidMount() {
        this.setState({
            buttons: buttons.map((item) =>
                (<Button variant="secondary" onClick={() => this.handleBtnClick(item.action)}>{item.label}</Button>))
        });

        this.handleBtnClick('/everyone');
    }

    render() {
        return (
            <Jumbotron>
                <h2>People</h2>
                <ButtonGroup>
                    {this.state.buttons}
                </ButtonGroup>
                <ul>
                    {this.state.menu}
                </ul>
            </Jumbotron>
        );
    }
}

