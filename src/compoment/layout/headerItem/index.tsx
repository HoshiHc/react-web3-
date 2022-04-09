/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react'
import './index.css'
import { BellFilled, DollarCircleOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Badge, Switch, Divider } from 'antd'
import { ethers } from 'ethers'
// import { web3currentProvider } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import ethImg from '../../../assets/header/eth.svg'
import gasImg from '../../../assets/header/gas.svg'
import avatarImg from '../../../assets/header/avatar.png'

import {
  CopyOutlined,
  MenuOutlined,
  ThunderboltOutlined,
  BellOutlined,
} from '@ant-design/icons'
import { useEagerConnect } from '../../../utils/hook'
import { useWeb3React } from '@web3-react/core'
import ConnectChain from '../../walletButtoon'
import { getEthPrice } from '../../../api/CoinGecko'
export default function HeaderItem() {
  const text = [
    {
      key: '1',
      icon: <ThunderboltOutlined />,
      text: '00.00',
    },
    {
      key: '2',
      icon: <MenuOutlined />,
      text: '00.00',
    },
  ]
  const add = '0x1A9...EFb4'
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  )
  const [gasPrice, setGasPrice] = useState<string>('0')
  const [ethPrice, setEthPrice] = useState<string>('0')

  const triedEager = useEagerConnect()
  const { chainId, library, account } = useWeb3React()
  let provider = ethers.getDefaultProvider('homestead')

  //   const { provider } = library
  //   useEffect()
  useEffect(() => {
    setInterval(() => {
      provider.getGasPrice().then((res) => {
        setGasPrice(new BigNumber(res.toString()).dividedBy(10 ** 9).toFixed(2))
      })
      getEthPrice().then((res) => {
        setEthPrice(res.data.data.marketPairs[0].price.toFixed(2))
      })
    }, 10000)
  }, [])
  return (
    <div className="Topherder">
      <div className="herder_serach">
        <div className="herder_input">
          <Input.Group compact style={{ borderRadius: '0.5rem' }}>
            <Input.Search allowClear style={{ width: '100%' }} />
          </Input.Group>
        </div>

        <div className="herder_button">
          <Button type="primary" block>
            Built for desktop use, not mobile
          </Button>
        </div>
      </div>
      <div className="herder_waller">
        <div className="herder_waller_box">
          <div className="gas_price">
            <img src={gasImg} alt="" />
            <p>{gasPrice}</p>
          </div>
          <div className="eth_price">
            <img src={ethImg} alt="" />
            <p>{ethPrice}</p>
          </div>
        </div>
      </div>

      <div className="herder_waller_fee">
        <div className="herder_waller_fee_div">
          {account ? (
            <div className="wallet_info">
              <div className="wallet_avatar">
                <img src={avatarImg} alt="" />
              </div>
              <p className="wallet_account">
                {account.substr(0, 4) +
                  '***' +
                  account.substr(account.length - 4, account.length - 1)}
              </p>
            </div>
          ) : (
            <ConnectChain triedEager={triedEager} />
          )}
        </div>
        <Badge dot showZero>
          <BellOutlined shape="square" sizes="large" />
        </Badge>
      </div>
    </div>
  )
}
