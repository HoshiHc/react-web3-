import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import { MessageApi, List } from './config'
import './index.css'
import React from 'react'

const Msg = ({ type, text }: { type: string; text: string }) => {
  return (
    <div className={`message ${type}`}>
      <span className="icon" />
      <span>{text}</span>
    </div>
  )
}

let add: (L: List) => void
export const MessageContainer = () => {
  const [lists, setList] = useState<List[]>([])
  const remove = (L: List) => {
    const { key } = L
    setList((pre: List[]) => pre.filter((each: List) => key !== each.key))
  }

  add = (option: List) => {
    setList((pre: List[]) => {
      const obj = [...pre, option]
      setTimeout(() => {
        remove(option)
      }, 3000)
      return obj
    })
    // const obj = [...lists,option ];
    // setList(obj);
    // setTimeout(() => {
    //   remove(option)
    // }, timeout)
  }

  useEffect(() => {
    if (lists.length > 10) {
      lists.shift()
    }
  }, [lists])

  return (
    <>
      {lists.map(({ text, key, type }) => (
        <Msg key={key} type={type} text={text} />
      ))}
    </>
  )
}

const getId = () => {
  return (Math.random() * 1000).toFixed()
}

const $message: MessageApi = {
  info: (text) => {
    add({
      text,
      key: getId(),
      type: 'info',
    })
  },
  success: (text) => {
    add({
      text,
      key: getId(),
      type: 'success',
    })
  },
  warning: (text) => {
    add({
      text,
      key: getId(),
      type: 'warning',
    })
  },
  error: (text) => {
    add({
      text,
      key: getId(),
      type: 'error',
    })
  },
}
export default $message

const createMessage = () => {
  let el = document.getElementById('#message-wrap')
  if (!el) {
    el = document.createElement('div')
    el.className = 'message-wrap'
    el.id = 'message-wrap'
    document.body.append(el)
  }
  ReactDOM.render(<MessageContainer />, el)
}
createMessage()
