import React, { FC } from 'react'
import Container from '../components/Container'
import Sidebar from '../components/Sidebar'

interface Props {
    route: string
}

const ViewPage: FC<Props> = ({ route }) => {
  return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        gridTemplateRows: '100%',
    }}>
        <Sidebar/>
        <Container route={route}/>
    </div>
  )
}

export default ViewPage