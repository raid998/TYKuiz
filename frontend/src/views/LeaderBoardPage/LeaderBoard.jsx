import React, { useEffect, useState } from 'react'
import Profiles from './profiles'
import { Leaderboard } from './database'
import './LeaderBoard.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rectangle from 'react-rectangle'
import axios from 'axios'

const LeaderBoard = () => {
  const [period, setPeriod] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/tykuiz/leaderboard', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
      })
      setUsers([...response.data])
    }
    getUsers()
    console.log(users)
  }, [])

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id)
  }

  return (
    <div className='board'>
      <h1 className='leaderboard'>Leaderboard</h1>
      <Container>
        <Rectangle
          className='table'
          aspectRatio={[50, 30]}
          style={{ 'background': '#DEB887','height':'80%' }}
        >
          <Row>
            <Col>
              <Profiles Leaderboard={users}> </Profiles>
            </Col>
          </Row>
        </Rectangle>
      </Container>
    </div>
  )
}
export default LeaderBoard

function between(data, between) {
  const today = new Date()
  const previous = new Date(today)
  previous.setDate(previous.getDate() - (between + 1))

  let filter = data.filter((val) => {
    let userDate = new Date(val.dt)
    if (between == 0) return val
    return previous <= userDate && today >= userDate
  })

  return filter.sort((a, b) => {
    if (a.score === b.score) {
      return b.score - a.score
    } else {
      return b.score - a.score
    }
  })
}
