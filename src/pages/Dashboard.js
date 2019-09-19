import React, { Component } from 'react'
import { Layout, Menu, Icon, message, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import Auth from '../services/Auth'

import { DashboardRoutes } from '../routes'

import './Dashboard.scss'

const { Header, Content, Sider } = Layout

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      page: "",
      ready: false,
      userData: {}
    }
  }

  componentDidMount(){
    const userData = {
        name: 'Guilherme Mota',
        email: 'guilhermebromonschenkel@gmail.com',
        team: 'buggr',
    }
    Auth.userData = userData
    this.setState({ ready: true, userData })
    //this.props.history.push('/dashboard/hackatons')
  }

  render() {
    return (
      this.state.ready 
      &&
      <Layout className="dashboard-container">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            this.setState({ collapsed })
          }}
          collapsed={this.state.collapsed}
        >
          <div className="user-container">
            <Avatar className="user-avatar" icon="user" />
            <span className="user-name">{this.state.userData.name}</span>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.state.page]}
          >
            <Menu.Item key="Hackatons">
              <Link to="/dashboard/hackatons" onClick={() => this.setState({ collapsed: true })}>
                <Icon type="home" />
                <span className="nav-text">Hackatons</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Feedback">
              <Link to="/dashboard/feedback" onClick={() => this.setState({ collapsed: true })}>
                <Icon type="user" />
                <span className="nav-text">Feedback</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Presentation">
              <Link to="/dashboard/presentation" onClick={() => this.setState({ collapsed: true })}>
                <Icon type="tool" />
                <span className="nav-text">Apresentação</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, display: "flex" }}>
            <h1 style={{ margin: "auto auto auto 16px", color: "#001529" }}>
              {this.state.page}
            </h1>
            <Menu
              theme="white"
              mode="horizontal"
              style={{ lineHeight: "64px", margin: "auto 0 auto auto" }}
            >
              <Menu.Item key="1" onClick={this.handleLogout}>
                Logout
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <DashboardRoutes />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
