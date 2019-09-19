import React, { Component } from 'react'
import { Layout, Menu, Icon, message, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { DashboardRoutes } from '../routes'

import './Dashboard.scss'

const { Header, Content, Sider } = Layout

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      page: ""
    }
  }

  componentDidMount(){
    this.props.history.push('/dashboard/hackatons')
  }

  render() {
    return (
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
          <div className="user">
            <Avatar icon="user" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.state.page]}
          >
            <Menu.Item key="Home">
              <Link
                to="/dashboard/home"
                onClick={() => this.handleChangePage("Home")}
              >
                <Icon type="home" />
                <span className="nav-text">Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Profile">
              <Link
                to="/dashboard/profile"
                onClick={() => this.handleChangePage("Profile")}
              >
                <Icon type="user" />
                <span className="nav-text">Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Tools">
              <Link
                to="/dashboard/tools"
                onClick={() => this.handleChangePage("Tools")}
              >
                <Icon type="tool" />
                <span className="nav-text">Tools</span>
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
