import React from 'react'
import { Layout, Menu } from 'antd'
import './index.css'

import { Button } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { HashRouter, Link } from 'react-router-dom'
import Logo from '../../../assets/betaLogo.svg'
const { Sider } = Layout

//模拟数组结构
const menuList = [
  {
    key: '#NFT',
    title: 'NFT',
    children: [
      {
        url: '#',
        key: 1,
        title: 'Watchlist',
        disable: true,
      },
      {
        url: '/calendar',
        key: 2,
        title: 'Calendar',
        disable: false,
      },
      {
        url: '/trending',
        key: 3,
        title: 'Trending',
        disable: false,
      },
    ],
  },
  {
    key: '#Dashboard',
    title: 'Dashboard',
    children: [
      {
        url: '#',
        key: 4,
        title: 'My Wallet',
        disable: true,
      },
      {
        url: '#',
        key: 5,
        title: 'Token',
        disable: true,
      },
    ],
  },
  {
    key: '#Social',
    title: 'Social',
    children: [
      {
        url: '#',
        key: 6,
        title: 'Forum',
        disable: true,
      },
    ],
  },
]

export default function SideMenu(props: any) {
  const renderMenu = (menuList: any[]) => {
    return menuList.map((item, index) => {
      if (item.children) {
        return (
          <Menu.ItemGroup key={item.key} title={item.title}>
            {item.children.map((child: any) => {
              return (
                <Menu.Item key={child.key} disabled={child.disable}>
                  <HashRouter>
                    <Link to={child.url}>{child.title}</Link>
                  </HashRouter>
                </Menu.Item>
              )
            })}
          </Menu.ItemGroup>
        )
      }

      return (
        <HashRouter>
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        </HashRouter>
      )
    })
  }
  return (
    <>
      {/* <Sider trigger={null} collapsible collapsed={false} className="sizemenu"> */}

      {/* </Sider> */}

      <Sider
        breakpoint="xl"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
        className="sizemenu"
      >
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['3']}>
          {renderMenu(menuList)}
        </Menu>
        <div className="upgrade_box">
          <div className="sizdmenu_div">
            <div className="sizdmenu_div_one">
              <span>
                <ArrowUpOutlined />
              </span>
              <div className="sizdmenu_title">Get Institutional Asccess!</div>
              <span className="sizdmenubutton"> UPGRADE</span>
            </div>
          </div>
        </div>
      </Sider>
    </>
  )
}
