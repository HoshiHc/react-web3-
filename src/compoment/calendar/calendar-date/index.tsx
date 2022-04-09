/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import './index.css'
import { Button } from 'antd'
import CaledarTime from '../calendar-time'
import CaledarText from '../calendar-text'
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline' // a plugin!
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import { getCalendarList } from '../../../api/calendar'
import { formatTime } from '../../../utils/formatTime'
import { ICalendar } from '../../../page/calendar'

export default function CalendarDate({
  calendarData,
}: {
  calendarData: ICalendar[]
}) {
  function onPanelChange(value: any, mode: any) {
    console.log(value, mode)
  }
  const [dates, setDates] = useState(new Date())
  const [calendarList, setCalendarList] = useState<any[]>([])
  useEffect(() => {
    if (calendarData) {
      const eventArr = calendarData.map(
        (item: { projectName: string; date: string }) => {
          return {
            title: item.projectName,
            date: formatTime(item.date, 'Y-M-D H:M:S'),
          }
        }
      )

      setCalendarList(eventArr)
    }
  }, [calendarData])
  const date = '0000000000'
  const Listtime = [
    {
      key: '1',
      time: '8.00-9.00',
      Text: 'depes',
    },
    {
      key: '2',
      time: '8.00-9.00',
      Text: 'depes',
    },
  ]

  return (
    <div className="NFT_page">
      <div className="NFT_page_div">
        <div className="NFT_page_div_date">
          <CaledarTime />
          <h3>
            TODAY &nbsp;{' '}
            <span>{formatTime(new Date().valueOf(), 'Y-M-D H:M')}</span>
          </h3>
          <div className="NFT_page_div_button">
           <span>All-NFT Calendar</span>
          </div>
          <div className='calendar_all_list'>
          {calendarList.map((item, index) => {
            return (
              <div className={`NFT_page_div_lesttime NFT_page_div_lesttime${index}`}  key={item.date + index}>
                <div>
                  <span></span>
                  <p>{item.date}</p>
                </div>
                <p className="NFT_page_div_lesttime_p">{item.title}</p>
              </div>
            )
          })}
          </div>

        </div>
        <div className="NFT_page_div_table">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prevYear,prev,next,nextYear today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              events={calendarList}
              height={600}
              //   eventReceive={}
              //   dateClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
