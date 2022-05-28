import React from 'react'
import { Card } from 'react-bootstrap'
import pathImg from '../../assets/footer.jpeg'
import './footer.css'
const Footer = () => {
  return (
    <>
      <Card id='cardFooter' className='bg-dark text-white'>
          <Card.Title>
            <h2 id='TYKuizzCopyright'>TYKuiz ©</h2>
          </Card.Title>
          <Card.Text className ="cardDesc">Challenge your IT knowledge with us</Card.Text>
      </Card>
    </>
  )
}

export default Footer
