import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/user/userSlice'
import './login.css'
import userSlice from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [pseudo, setPseudo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [jsonResponse, setJsonResponse] = useState({})
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  var myInit = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
  }

  const sendInfoToDb = (e) => {
    e.preventDefault()

    fetch(`tykuiz/login?&username=${pseudo}&password=${password}`, myInit)
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        setJsonResponse(myJson)
        if (myJson.status == 404) setError(myJson.error)
        else
          dispatch(
            login({
              pseudo: pseudo,
              password: password,
              loggedIn: myJson,
            })
          )
      })
      .catch(function (error) {
        console.log('error when get', error)
      })
  }
  useEffect(() => {
    if (user) navigate('/home')
  })
  return (
    <>
      <h2 className='titleLogin'> Authentification </h2>
      <div className='login'>
        {!!error.length && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={sendInfoToDb}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Pseudonyme</Form.Label>
            <Form.Control
              type='text'
              placeholder='Entrer votre pseudonyme'
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <Form.Text className='text-muted'>
              Vos informations personnelles ne seront jamais communiquées
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Mot de passe </Form.Label>
            <Form.Control
              type='password'
              placeholder='Entrer un mot de passe'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='success' type='submit' value='Se connecter'>
            Se connecter
          </Button>
        </Form>
      </div>
    </>
  )
}

export default Login
