import React from 'react'
import Menu from 'components/Menu'
import { usePollCoreFarmData, useFetchProfile, usePollBlockNumber } from 'state/hooks'
import useEagerConnect from 'hooks/useEagerConnect'

const ViewContainer: React.FC = ({ children }) => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  return <Menu>{children}</Menu>
}

export default ViewContainer
