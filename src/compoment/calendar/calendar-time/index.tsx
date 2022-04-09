import React from 'react'
import './index.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Calendar, Select, Radio, Col, Row, Typography, Button } from 'antd'
export default function CaledarTime() {
  function onPanelChange(value: any, mode: any) {
    console.log(value, mode)
  }
  return (
    <div>
      <div className="site-calendar-customize-header-wrapper">
        <Calendar
          fullscreen={false}
          headerRender={({ value, type, onChange, onTypeChange }) => {
            const start = 0
            const end = 12
            const monthOptions = []

            const current = value.clone()
            const localeData = value.localeData()
            const months = []
            for (let i = 0; i < 12; i++) {
              current.month(i)
              months.push(localeData.monthsShort(current))
            }

            for (let index = start; index < end; index++) {
              monthOptions.push(
                <Select.Option className="month-item" key={`${index}`}>
                  {months[index]}
                </Select.Option>
              )
            }
            const month = value.month() + 1

            const year = value.year()
            const options = []
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>
              )
            }
            return (
              <div className="datetime">
                <Row className="datetime_one">
                  <Button
                    type="text"
                    ghost
                    icon={
                      <LeftOutlined
                        onClick={() => {
                          const now = value.clone().month(Number(month - 2))
                          //   console.log(value.month() + 1)
                          console.log(now, month)

                          onChange(now)
                        }}
                      />
                    }
                  />
                  {year}-{month}
                  <Button
                    type="text"
                    ghost
                    icon={
                      <RightOutlined
                        onClick={() => {
                          const now = value.clone().month(Number(month))
                          //   console.log(value.month() + 1)
                          console.log(now, month)

                          onChange(now)
                        }}
                      />
                    }
                  />
                </Row>
              </div>
            )
          }}
          onPanelChange={onPanelChange}
        />
      </div>
    </div>
  )
}
