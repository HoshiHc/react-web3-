import React from 'react'
import './index.css'
import { Button } from 'antd'
import { Input, Space } from 'antd'
import { AudioOutlined } from '@ant-design/icons'

import { RightOutlined, LeftOutlined } from '@ant-design/icons'
export default function CaledarText() {
  const { Search } = Input
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  )
  const onSearch = (value: any) => console.log(value)

  return (
    <div className="date_text">
      <div className="date_text_herder">
        <div className="date_text_herder_box_one">
          <LeftOutlined /> <span>Today</span> <RightOutlined />
        </div>
        <div className="date_text_herder_box_two">
          <Button>Day</Button>
          <Button>weekk</Button>
          <Button>Month</Button>
          <Button>Yera</Button>
        </div>
        <div className="date_text_herder_box_three">
          <Space direction="vertical">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: 200 }}
              className="input"
            />
          </Space>
        </div>
      </div>
      <div className="date_text_body">
        <div className="date_text_body_div_one">
          <span>7rm</span>
          <h1> Hour Row</h1>
          <span>8rm</span>
          <h1> Hour Row</h1>
          <span>9rm</span>
          <h1> Hour Row</h1>
          <span>10rm</span>
          <h1> Hour Row</h1>
          <span>11rm</span>
          <h1> Hour Row</h1>
        </div>
        <div className="date_text_body_div_two">
          <table>
            <tr>
              <th className="th">Monday</th>
              <th className="th">Tuesday</th>
              <th className="th">Wednesday</th>
              <th className="th">Thursday</th>
              <th className="th">Friday</th>
              <th className="th">Saturday</th>
              <th className="th">Sunday</th>
            </tr>
            <tr>
              <th className="th">11</th>
              <th className="th">12</th>
              <th className="th">13</th>
              <th className="th">14</th>
              <th className="th">15</th>
              <th className="th">16</th>
              <th className="th">17</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div className="date_text_body_div_three">
          <span className="eetgit5">Eet 　　 Git-5</span>
          <span>7rm</span>
          <span>8rm</span>
          <span>9rm</span>
          <span>10rm</span>
          <span>11rm</span>
        </div>
      </div>
    </div>
  )
}
