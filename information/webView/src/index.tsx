import * as React from "react"
import { Component } from "react"
import * as ReactDOM from "react-dom"
import MainLayout from "./layout"
import 'antd/dist/antd.less';
import { HashRouter as Router } from 'react-router-dom';


export default class App extends Component<any, any>{
    render() {
        return <Router>
            <MainLayout url="333" wtf="wtf"/>
        </Router>
    }
}


ReactDOM.render(
    <App />,
    document.getElementById("app")
);