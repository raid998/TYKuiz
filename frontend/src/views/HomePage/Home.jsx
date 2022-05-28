import React, { useState, useEffect } from 'react'
import { Buffer } from 'buffer'
import { Carousel } from 'react-bootstrap'
import './home.css'
import bashImg from '../../assets/bash.png'
import htmlImg from '../../assets/html.png'
import jsImg from '../../assets/javascript.png'
import kuberImg from '../../assets/kubernetes.png'
import laravelImg from '../../assets/laravel.png'
import sqlImg from '../../assets/mysql.png'
import phpImg from '../../assets/php.png'
import wordpressImg from '../../assets/wordpress.png'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/user/userSlice'

const Home = () => {
  const [jsonResponse, setJsonResponse] = useState({})
  const dispatch = useDispatch()
  var myInit = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
  }
  return (
    <>
      <h1 className='title'> Bienvenue </h1>
      <h1 className='title'> Testez vos connaissances avec TYKuiz </h1>
      <h2 className='text'> Nos thèmes principaux </h2>
      <Carousel style={{ margin: '2em auto', width: '40%' }}>
        <Carousel.Item>
          <img className='d-block w-100' src={bashImg} alt='First slide' />
        </Carousel.Item>

        <Carousel.Item>
          <img className='d-block w-100' src={htmlImg} alt='Second slide' />
        </Carousel.Item>

        <Carousel.Item>
          <img className='d-block w-100' src={jsImg} alt='Third slide' />
        </Carousel.Item>

        <Carousel.Item>
          <img className='d-block w-100' src={kuberImg} alt='Fourth slide' />
        </Carousel.Item>

        <Carousel.Item>
          <img className='d-block w-100' src={laravelImg} alt='Fifth slide' />
        </Carousel.Item>

        <Carousel.Item>
          <img className='d-block w-100' src={sqlImg} alt='Sixth slide' />
        </Carousel.Item>

        <Carousel.Item>
          <img className='d-block w-100' src={phpImg} alt='Seventh slide' />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className='d-block w-100'
            src={wordpressImg}
            alt='Second slide'
          />
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default Home
