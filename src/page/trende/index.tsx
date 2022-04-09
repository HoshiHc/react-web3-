/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useEffect, useState } from 'react'

import { FormInstance } from 'antd/lib/form'
import './index.css'
import { Table, Radio, Divider, Select, Pagination } from 'antd'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { getDataForNft } from '../../api/CoinGecko'

const { Option } = Select

interface DataType {
  key: React.Key
  icon: string
  name: string
  age: number
  address: string
  value: any
}
interface Params {
  start: number
  limit: number
  sort: string
  desc: boolean
  period: number
}
interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}
export default function Trende() {
  const [listData, setListData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [alignment, setAlignment] = useState(1)
  const [count, setCount] = useState(10)
  const [platform, setPlatform] = useState('')
  useEffect(() => {
    getDataForNftApi({
      start: 0,
      limit: 10,
      sort: 'volume',
      desc: true,
      period: 1,
    })
  }, [])
  const columns: any = [
    {
      title: 'COLLECTION',
      dataIndex: 'name',

      render: (value: any, record: any) => {
        return (
          <div className="collectionBox">
            <img
              className="logoImg"
              onClick={() => {
                // console.log(record)

                window.open(record.website)
              }}
              src={record.logo}
              alt=""
            />
            <div>
              <p>{record.name}</p>
              <p className="percentage">{record.assets}</p>
            </div>
          </div>
        )
      },
    },
    {
      title: 'FLOOR',
      dataIndex: 'volumeAT',
      defaultSortOrder: 'descend',
      sorter: (a: { floorPrice: number }, b: { floorPrice: number }) =>
        a.floorPrice - b.floorPrice,
      render: (value: any, record: any) => {
        return (
          <p>
            {record.floorPrice ?? '0'} {record.floorPriceToken}
          </p>
        )
      },
    },
    {
      title: 'AVERAGE',
      dataIndex: 'averagePrice',
      render: (value: any, record: any) => {
        return averageRender(alignment, record)
      },
    },
    {
      title: 'VOLUME',
      dataIndex: 'volumeAT',
      sorter: (a: { percentage: number }, b: { percentage: number }) =>
        a.percentage - b.percentage,
      render: (value: any, record: any) => {
        return volnumeRender(alignment, record)
      },
    },
    {
      title: 'SALES',
      dataIndex: 'sales7d',
      render: (value: any, record: any) => {
        return salesRender(alignment, record)
      },
  
    },
    {
      title: 'MKT CAP',
      dataIndex: 'marketCap',
      sorter: (a: { marketCap: number }, b: { marketCap: number }) =>
        a.marketCap - b.marketCap,
      render: (value: any, record: any) => {
        return <p>{record.marketCap.toFixed(2)}</p>
      },
    },
    {
      title: '7D VOLUME',
      dataIndex: 'volume7d',
      render: (value: any, record: any) => {
        return <p>{record.volume7d.toFixed(2)}</p>
      },
    },
  ]
  const getDataForNftApi: any = (params: Params) => {
    getDataForNft(params).then((res) => {
      setListData(res.data.data.collections)
      console.log(res.data.data)

      setCount(Number(res.data.data.count))
    })
  }
  const handleAlignment = (newAlignment: number) => {
    setAlignment(newAlignment)

    if (platform) {
      getDataForNftApi({
        start: 0,
        limit: rowsPerPage,
        sort: 'volume',
        desc: true,
        period: newAlignment,
        blockchain: platform,
      })
      return
    }
    getDataForNftApi({
      start: 0,
      limit: rowsPerPage,
      sort: 'volume',
      desc: true,
      period: newAlignment,
    })
  }
  const handleChangeRowsPerPage = (currentpage: number, size: number) => {
    console.log(currentpage)

    setRowsPerPage(size)
    setPage(0)
    if (platform) {
      getDataForNftApi({
        start: currentpage * size,
        limit: rowsPerPage,
        sort: 'volume',
        desc: true,
        period: alignment,
        blockchain: platform,
      })
      return
    }
    getDataForNftApi({
      start: currentpage * size,
      limit: size,
      sort: 'volume',
      desc: true,
      period: alignment,
    })
  }
  const salesRender = (Period: number, record: any) => {
    let sales, salesChangePercentage
    switch (Period) {
      case 1:
        sales = record.oneDay.sales
        salesChangePercentage = record.oneDay.salesChangePercentage
        break
      case 2:
        sales = record.sevenDay.sales
        salesChangePercentage = record.sevenDay.salesChangePercentage
        break
      case 3:
        sales = record.thirtyDay.sales
        salesChangePercentage = record.thirtyDay.salesChangePercentage
        break
      case 4:
        sales = record.salesAT
        salesChangePercentage = '- -'
        break
      default:
        sales = record.oneDay.sales
        salesChangePercentage = record.oneDay.salesChangePercentage
        break
    }
    return (
      <>
        <p>{sales}</p>
        <p
          className={
            salesChangePercentage > 0
              ? 'percentage  fontGreen'
              : 'percentage fontRed'
          }
        >
          {salesChangePercentage.toFixed(2)}%
        </p>
      </>
    )
  }
  const averageRender = (Period: number, record: any) => {
    let averagePrice, averagePriceChangePercentage
    switch (Period) {
      case 1:
        averagePrice = record.oneDay.averagePrice
        averagePriceChangePercentage =
          record.oneDay.averagePriceChangePercentage
        break
      case 2:
        averagePrice = record.sevenDay.averagePrice
        averagePriceChangePercentage =
          record.sevenDay.averagePriceChangePercentage
        break
      case 3:
        averagePrice = record.thirtyDay.averagePrice
        averagePriceChangePercentage =
          record.thirtyDay.averagePriceChangePercentage
        break
      case 4:
        averagePrice = record.salesAT
        averagePriceChangePercentage = '- -'
        break
      default:
        averagePrice = record.oneDay.averagePrice
        averagePriceChangePercentage =
          record.oneDay.averagePriceChangePercentage
        break
    }
    return (
      <>
        <p>{averagePrice.toFixed(2)}</p>
        <p
          className={
            averagePriceChangePercentage > 0
              ? 'percentage  fontGreen'
              : 'percentage fontRed'
          }
        >
          {averagePriceChangePercentage.toFixed(2)}%
        </p>
      </>
    )
  }
  const volnumeRender = (Period: number, record: any) => {
    let volume, volumeChangePercentage
    switch (Period) {
      case 1:
        volume = record.oneDay.volume
        volumeChangePercentage = record.oneDay.volumeChangePercentage
        break
      case 2:
        volume = record.sevenDay.volume
        volumeChangePercentage = record.sevenDay.volumeChangePercentage
        break
      case 3:
        volume = record.thirtyDay.volume
        volumeChangePercentage = record.thirtyDay.volumeChangePercentage
        break
      case 4:
        volume = record.volumeAT
        volumeChangePercentage = '- -'
        break
      default:
        volume = record.oneDay.volume
        volumeChangePercentage = record.oneDay.volumeChangePercentage
        break
    }
    return (
      <>
        <p>{volume.toFixed(2)}</p>
        <p
          className={
            volumeChangePercentage > 0
              ? 'percentage  fontGreen'
              : 'percentage fontRed'
          }
        >
          {volumeChangePercentage.toFixed(2)}%
        </p>
      </>
    )
  }
  const handlePlatform = (blockchain: string) => {
    setPlatform(blockchain)
    getDataForNftApi({
      start: 0,
      limit: rowsPerPage,
      sort: 'volume',
      desc: true,
      period: alignment,
      blockchain: blockchain,
    })
  }

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log('params', pagination, filters, sorter, extra)
  }
  const menu = <></>

  return (
    <div className="home_box">
      <h2>Trending Collections</h2>
      <div className="home_button">
        <div>
          <span>Period:</span>
          <Select
            defaultValue={1}
            style={{ width: 120 }}
            onChange={handleAlignment}
          >
            <Option value={1}>24h</Option>
            <Option value={2}>7d</Option>
            <Option value={3}>30d</Option>
          </Select>
        </div>
        <div>
          <span>Token:</span>
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={handlePlatform}
          >
            <Option value="BSC">BSC</Option>
            <Option value="Ethereum">Ethereum</Option>
            <Option value="Solana">Solana</Option>
            <Option value="">all</Option>
          </Select>
        </div>
      </div>
      <div>
        <Table
          onChange={onChange}
          columns={columns}
          dataSource={listData}
          // scroll={{ x: 1487, y: 460 }}
          pagination={false}
          size="small"
        />
        <Pagination
          showSizeChanger
          onChange={handleChangeRowsPerPage}
          defaultCurrent={1}
          total={count}
          className="trendingPaginatioon"
        />
      </div>
    </div>
  )
}
