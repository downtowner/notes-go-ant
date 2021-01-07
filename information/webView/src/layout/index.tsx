import { Layout } from "antd";
import * as React from "react";
const { Header, Footer, Sider, Content } = Layout;
import { Route, Link, withRouter } from 'react-router-dom';

import CheckPage from "../pages/check";
import PulishPage from "../pages/publish";

export default class MainLayout extends React.Component<any> {
    
    render() {
        return <Layout>
        <Header style={{ backgroundColor: '#006529', color:'red', textAlign: 'center'}}>
            <h1>信息发布平台</h1>
        </Header>
        <Content>
                    <Route exact path="/" component={PulishPage}/>

                    <Route exact path="/check" component={CheckPage} /> 
                    <Route exact path="/publish" component={PulishPage} /> 
        </Content>
        <Footer style={{ backgroundColor: '#006529',textAlign: 'center'}}>信息发布 ©2021 Created by Ant UED</Footer>
      </Layout>
    };
}