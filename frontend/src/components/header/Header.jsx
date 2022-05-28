import React, { useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import './header.css'
import { logout, registred } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogged = useSelector((state) =>
    state.user.user ? !!state.user.user.loggedIn : false
  )
  useEffect(() => {
    console.log(isLogged)
  })
  return (
    <>
      <Navbar expand='lg' variant='dark' className='navigation'>
        <Container className=''>
          <Navbar.Brand id='navTitle' href='#home'>
            TYKuiz
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link className='make-white' href='/home'>
                Accueil
              </Nav.Link>
              <Nav.Link className='make-white' href='/play'>
                Jouer
              </Nav.Link>
              <Nav.Link className='make-white' href='/leaderboard'>
                Classement
              </Nav.Link>
            </Nav>
            <Nav className='auth'>
              {isLogged ? (
                <Nav.Link
                  className='make-white'
                  href='/'
                  onClick={(e) => {
                    dispatch(logout())
                    navigate('/home')
                  }}
                >
                  Déconnexion
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link className='make-white' href='/register'>
                    Inscription
                  </Nav.Link>
                  <Nav.Link className='make-white' href='/login'>
                    Connexion
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
