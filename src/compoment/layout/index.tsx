import { Layout, Menu, Breadcrumb } from 'antd'
import { constants } from 'http2'
import React, { Children, useEffect, useState } from 'react'
import HeaderItem from './headerItem'
import SiderItem from './siderItem'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const Layouts: React.FC<any> = (props) => {
  const { children } = props
  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <SiderItem></SiderItem>
      <Layout className="site-layout">
        <HeaderItem></HeaderItem>
        <Content style={{ margin: '0 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  )
}
export default Layouts
