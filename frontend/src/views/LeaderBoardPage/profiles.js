import React from 'react'
import gold from '../../assets/goldenstar.png'
import silver from '../../assets/silverStar.png'
import bronze from '../../assets/bronzeStar.png'
import userImg from '../../assets/user.png'

export default function profiles({ Leaderboard }) {
  return <div id='profile'>{Item(Leaderboard)}</div>
}

function Item(data) {
  return (
    <>
      {data.map((value, index) => (
        <div className='flex' key={index}>
          <div className='item'>
            {index == 0 ? (
              <img src={gold} style={{'margin-right':'0em'}}></img>
            ) : index == 1 ? (
              <img src={silver}></img>
            ) : index == 2 ? (
              <img src={bronze}></img>
            ) : null}{' '}
            {
            <img src={userImg} style={{'margin-left':'10%'}} alt="no picture available" />}
            <div className='info'>
              <h3 className='name text-dark'>{value.username}</h3>
            </div>
          </div>
          <div className='score'>
            <h3>
              <span>{value.score}</span>
            </h3>
          </div>
        </div>
      ))}
    </>
  )
}
