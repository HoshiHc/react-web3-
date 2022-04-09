/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import './index.css'
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Select,
} from 'antd'
import enUS from 'antd/lib/date-picker/locale/en_US'

import {
  GlobalOutlined,
  TwitterOutlined,
  MessageOutlined,
  CalendarOutlined,
  PlusOutlined,
  MoneyCollectOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import Calender from '../../compoment/calendar/calendar-date'
import { formatTime } from '../../utils/formatTime'
import WebsiteImg from '../../assets/calendar/website.png'
import DiscordImg from '../../assets/calendar/discord.png'
import TwitterImg from '../../assets/calendar/twitter.png'
import avatarImg from '../../assets/calendar/avatar.png'
import CaledarDate from '../../compoment/calendar/calendar-date'
import $message from '../../compoment/message'

import {
  addCalendarList,
  deleteCalendarList,
  getCalendarList,
  updateCalendarList,
} from '../../api/calendar'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'

const { Option } = Select

export interface ICalendar {
  projectName: string
  total: string
  note: string
  address: string
  mintPrice: string
  mintNumberPerWallet: string
  date: string
  website: string
  discord: string
  twitter: string
  _id?: string
}

export default function Calendar() {
  function onPanelChange(value: any, mode: any) {
    console.log(value, mode)
  }
  const { chainId, library, account, active } = useWeb3React()

  const [calendarList, setCalendar] = useState<ICalendar[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isShowUpdate, setIsShowUpdate] = useState<boolean>(false)
  const [projectName, setProjectName] = useState<string>()
  const [total, setTotal] = useState<string>()
  const [note, setNote] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [mintPrice, setMintPrice] = useState<string>()
  const [mintNumberPerWallet, setMintNumberPerWallet] = useState<string>()
  const [date, setDate] = useState<string>()
  const [timeZone, setTimeZone] = useState<string>()
  const [website, setWebsite] = useState<string>()
  const [discord, setDiscord] = useState<string>()
  const [twitter, setTwitter] = useState<string>()
  const [_id, setId] = useState<string>()
  const [counDownTime, setCounDownTime] = useState<string>()

  const toHHmmss = (data: number) => {
    if (data < 0) {
      return '00:00:00:00'
    }
    var time
    var days = parseInt((data / (1000 * 60 * 60 * 24)).toString())
    var hours = parseInt(
      ((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString()
    )
    var minutes = parseInt(((data % (1000 * 60 * 60)) / (1000 * 60)).toString())
    var seconds = parseInt(((data % (1000 * 60)) / 1000).toString())
    time =
      (days < 10 ? '0' + days : days) +
      ':' +
      (hours < 10 ? '0' + hours : hours) +
      ':' +
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    return time
  }

  const showCountdown = (oldTime: string, idx: number) => {
    let currTime = new Date().valueOf()
    let currCounDown = Number(oldTime) - currTime

    let timesInterval = setInterval(() => {
      currCounDown = currCounDown + 1000
      setCounDownTime(currCounDown.toString())
      if (Number(oldTime) - currTime <= 1000) {
        clearInterval(timesInterval)
      }
    }, 1000)
    return toHHmmss(currCounDown).split(':')[idx]
  }

  useEffect(() => {
    getCalendarList({ address: account ?? '' }).then((res) => {
      //   console.log(res.data.datas)
      setCalendar(res.data.datas)
    })
    // getCalendarListApi
  }, [account, active])

  return (
    <>
      <div className="Caledar_box">
        <h1>NFT Drops</h1>
        <Layout className="Caledar_Lorem">
          {/* {calendarList.length <= 0 ? ( */}
          <div
            className="calendar_item calendar_add_item"
            onClick={() => {
              //   history.push('/treading')

              setIsModalVisible(!isModalVisible)
            }}
          >
            <PlusOutlined className="calendar_add_icon" />
            <p className="calendar_add_title">Add New Project</p>
            <p className="calendar_add_subtitle">
              Add new projects to your calendar
            </p>
          </div>

          {calendarList.map((item) => {
            return (
              <>
                <div className="calendar_item">
                  <div
                    className="delete_btn"
                    onClick={() => {
                      deleteCalendarList({ _id: item._id }).then(() => {
                        $message.success('Deleted successfully')
                        getCalendarList({ address: account ?? '' }).then(
                          (res) => {
                            //   console.log(res.data.datas)
                            setCalendar(res.data.datas)
                          }
                        )
                      })
                    }}
                  >
                    <CloseCircleOutlined style={{ color: 'red' }} />
                  </div>
                  <div className="item_avatar">
                    <img src={avatarImg} alt="" />
                  </div>
                  <div className="item_project_name">
                    {item.projectName}
                    <EditOutlined
                      style={{ marginLeft: '10px', cursor: 'pointer' }}
                      onClick={() => {
                        setIsShowUpdate(true)
                        setProjectName(item.projectName)
                        setTotal(item.total)
                        setNote(item.note)
                        setMintPrice(item.mintPrice)
                        setMintNumberPerWallet(item.mintNumberPerWallet)
                        setDate(item.date)
                        setWebsite(item.website)
                        setDiscord(item.discord)
                        setTwitter(item.twitter)
                        setId(item._id)
                        console.log(projectName)
                      }}
                    />
                  </div>
                  <div className="item_project_type">Supply:{item.total}</div>
                  <div className="item_project_note">
                    <p>{item.note}</p>
                  </div>
                  <div className="item_line"></div>
                  <div className="item_price_group">
                    <div className="item_project_price">
                      <p>Price</p>
                      <p>{item.mintPrice}</p>
                    </div>
                    <div className="item_project_total">
                      <p>Mint/WL</p>
                      <p>{item.mintNumberPerWallet}</p>
                    </div>
                    <div className="item_project_date">
                      <p>Your Local Date</p>
                      <p>{formatTime(item.date, 'Y-M-D H:M')}</p>
                    </div>
                  </div>
                  <div className="item_timeout_btn">
                    <div className="item_timeout_name">
                      <p>Day</p>
                      <p>Hrs</p>
                      <p>Min</p>
                      <p>Sec</p>
                    </div>
                    <div className="item_timeout_time">
                      <p>{showCountdown(item.date, 0)}:</p>
                      <p>{showCountdown(item.date, 1)}:</p>
                      <p>{showCountdown(item.date, 2)}:</p>
                      <p>{showCountdown(item.date, 3)}</p>
                    </div>
                  </div>
                  <div className="item_btn_group">
                    <div className="btn_group_right">
                      <img
                        src={WebsiteImg}
                        onClick={() => {
                          window.open(item.website)
                        }}
                        alt=""
                      />
                      <img
                        src={DiscordImg}
                        onClick={() => {
                          window.open(item.discord)
                        }}
                        alt=""
                      />
                      <img
                        src={TwitterImg}
                        onClick={() => {
                          window.open(item.twitter)
                        }}
                        alt=""
                      />
                    </div>
                    <div className="btn_group_left">Mint</div>
                  </div>
                </div>
              </>
            )
          })}

          <Modal
            title="Add Basic Project Info"
            visible={isModalVisible}
            onOk={() => {
              if (account) {
                addCalendarList({
                  projectName,
                  total,
                  note,
                  address: account,
                  mintPrice,
                  mintNumberPerWallet,
                  date,
                  website,
                  discord,
                  twitter,
                }).then((res) => {
                  if (res.status === 200) {
                    setIsModalVisible(false)
                    $message.success('Added successfully')
                    getCalendarList({ address: account ?? '' }).then((res) => {
                      //   console.log(res.data.datas)
                      setCalendar(res.data.datas)
                    })
                  } else {
                    setIsModalVisible(false)
                    $message.error('Add failed')
                  }
                })
              } else {
                setIsModalVisible(false)
                $message.error('Please connect Wallet')
              }
            }}
            onCancel={() => {
              setIsModalVisible(false)
            }}
            wrapClassName="add_modal"
          >
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              labelAlign="left"
            >
              <Form.Item label="ProjectName" name="projectName">
                <Input
                  onChange={(e) => {
                    setProjectName(e.target.value)
                  }}
                  defaultValue={projectName}
                />
              </Form.Item>
              <Form.Item label="Price" name="mintPrice">
                <Input
                  onChange={(e) => {
                    setMintPrice(e.target.value)
                  }}
                  defaultValue={mintPrice}
                />
              </Form.Item>

              <Form.Item label="MintNumber" name="mintNumber">
                <Input
                  onChange={(e) => {
                    setMintNumberPerWallet(e.target.value)
                  }}
                  defaultValue={mintNumberPerWallet}
                />
              </Form.Item>
              <Form.Item label="TotalSupply" name="total">
                <Input
                  onChange={(e) => {
                    setTotal(e.target.value)
                  }}
                  defaultValue={total}
                />
              </Form.Item>
              <Form.Item label="Date" name="date">
                <DatePicker
                  showTime={true}
                  onChange={(e) => {
                    console.log(new Date().getTimezoneOffset() * 60 * 1000)

                    setDate(
                      (
                        (e?.valueOf() ?? 0) -
                        new Date().getTimezoneOffset() * 60 * 1000
                      ).toString()
                    )
                  }}
                />
              </Form.Item>
              <Form.Item label="TimeZone" name="timeZone">
                {/*  */}
                <Select
                  defaultValue="UTC"
                  style={{ width: 120 }}
                  onChange={(e) => {
                    console.log(e)
                    setDate((Number(date) + Number(e)).toString())
                    setTimeZone(e)
                  }}
                >
                  <Option value="0">UTC</Option>
                  <Option value="-18000000">EST</Option>
                  <Option value="-28800000">PST</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Note" name="note">
                <Input
                  onChange={(e) => {
                    setNote(e.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item label="Website" name="website">
                <Input
                  onChange={(e) => {
                    setWebsite(e.target.value)
                  }}
                  defaultValue={website}
                />
              </Form.Item>
              <Form.Item label="Discord" name="discord">
                <Input
                  onChange={(e) => {
                    setDiscord(e.target.value)
                  }}
                  defaultValue={discord}
                />
              </Form.Item>
              <Form.Item label="Twitter" name="twitter">
                <Input.TextArea
                  onChange={(e) => {
                    setTwitter(e.target.value)
                  }}
                  defaultValue={twitter}
                />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Update Basic Project Info"
            visible={isShowUpdate}
            onOk={() => {
              if (account) {
                updateCalendarList({
                  projectName,
                  total,
                  note,
                  address: account,
                  mintPrice,
                  mintNumberPerWallet,
                  date,
                  website,
                  discord,
                  twitter,
                  _id,
                }).then((res) => {
                  if (res.status === 200) {
                    setIsShowUpdate(false)
                    $message.success('Update successfully')
                    getCalendarList({ address: account ?? '' }).then((res) => {
                      //   console.log(res.data.datas)
                      setCalendar(res.data.datas)
                    })
                  } else {
                    setIsShowUpdate(false)
                    $message.error('Update failed')
                  }
                })
              } else {
                setIsShowUpdate(false)
                $message.error('Please connect Wallet')
              }
            }}
            onCancel={() => {
              setIsShowUpdate(false)
            }}
            wrapClassName="add_modal"
          >
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              labelAlign="left"
            >
              <Form.Item label="ProjectName" name="projectName">
                <Input
                  defaultValue={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item label="Price" name="mintPrice">
                <Input
                  defaultValue={mintPrice}
                  onChange={(e) => {
                    setMintPrice(e.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item label="MintNumber" name="mintNumber">
                <Input
                  defaultValue={mintPrice}
                  onChange={(e) => {
                    setMintNumberPerWallet(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item label="TotalSupply" name="total">
                <Input
                  defaultValue={total}
                  onChange={(e) => {
                    setTotal(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item label="Date" name="date">
                <DatePicker
                  showTime={true}
                  onChange={(e) => {
                    setDate(e?.valueOf()?.toString())
                  }}
                />
              </Form.Item>
              <Form.Item label="Note" name="note">
                <Input.TextArea
                  defaultValue={note}
                  onChange={(e) => {
                    setNote(e.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item label="Website" name="website">
                <Input
                  defaultValue={website}
                  onChange={(e) => {
                    setWebsite(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item label="Discord" name="discord">
                <Input
                  defaultValue={discord}
                  onChange={(e) => {
                    setDiscord(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item label="Twitter" name="twitter">
                <Input
                  defaultValue={twitter}
                  onChange={(e) => {
                    setTwitter(e.target.value)
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Layout>
      </div>

      <div className="caledar_foot">
        <CaledarDate calendarData={calendarList} />
      </div>
    </>
  )
}
