import React, { useEffect, useState } from 'react'
import { Spinner } from './Spiner'
import { injected } from '../utils/connectors'
import { useWeb3React } from '@web3-react/core'
import { useInactiveListener } from '../utils/hook'
import { WalletOutlined } from '@ant-design/icons'
import { message } from 'antd'

function ConnectChain(props: { triedEager: any }) {
  const context = useWeb3React()
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context

  const [activatingConnector, setActivatingConnector] = useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const activating = injected === activatingConnector
  const connected = injected === connector
  const disabled = !props.triedEager || !!activatingConnector || !!error

  useInactiveListener(!props.triedEager || !!activatingConnector)

  let isDisconnect = !error && chainId
  const buttonText = isDisconnect
    ? 'Disconnect'
    : activating
    ? 'Connectting'
    : 'Connect'

  return (
    // <button
    //   style={{
    //     borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
    //     cursor: disabled ? 'unset' : 'pointer',
    //     position: 'relative',
    //   }}
    //   className="ConnectButton"
    //   disabled={disabled}
    //   onClick={() => {
    //     if (!isDisconnect) {
    //       setActivatingConnector(injected)
    //       activate(injected)
    //     } else {
    //       deactivate()
    //     }
    //   }}
    // >
    //      <div
    //     style={{
    //       position: 'absolute',
    //       top: '0',
    //       left: '0',
    //       height: '100%',
    //       display: 'flex',
    //       alignItems: 'center',
    //       color: 'black',
    //       margin: '0 0 0 1rem',
    //     }}
    //   >
    //     {activating && (
    //       <Spinner
    //         color={'red'}
    //         style={{ height: '50%', marginLeft: '-1rem' }}
    //       />
    //     )}
    //   </div>
    //   {buttonText}
    // </button>
    <WalletOutlined
      style={{
        borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
        cursor: disabled ? 'unset' : 'pointer',
        position: 'relative',
      }}
      className="ConnectButton"
      disabled={disabled}
      onClick={() => {
        if (!isDisconnect) {
          //   if (chainId !== 1) {
          //     message.error('wrong network')
          //     return
          //   }
          setActivatingConnector(injected)
          activate(injected)
        } else {
          deactivate()
        }
      }}
    />
  )
}
export default ConnectChain
