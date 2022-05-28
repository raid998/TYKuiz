import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import './register.css'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../features/user/userSlice'
import userSlice from '../../features/user/userSlice'
import { login } from '../../features/user/userSlice'
import { selectUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [pseudonyme, setPseudonyme] = useState('')
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      register({
        lastName: lastName,
        firstName: firstName,
        pseudonyme: pseudonyme,
        email: email,
        password: password,
      })
    )
  }

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

    fetch(
      `tykuiz/register?&lastname=${lastName}&firstname=${firstName}&username=${pseudonyme}&mail=${email}&password=${password}`,
      myInit
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        if (myJson.success) navigate('/home')
        else setError(myJson.error)
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
      <h1 className='titleRegister'> Inscription</h1>
      {!!error.length && <Alert variant='danger'>{error}</Alert>}
      <div className='register'>
        <Form onSubmit={sendInfoToDb}>
          <Form.Group className='mb-3'>
            <Form.Label> Nom </Form.Label>
            <Form.Control
              type='text'
              placeholder='Entrer votre nom'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> Prénom </Form.Label>
            <Form.Control
              type='text'
              placeholder='Entrer votre prénom'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> Pseudonyme </Form.Label>
            <Form.Control
              type='text'
              placeholder='Entrer votre pseudonyme'
              value={pseudonyme}
              onChange={(e) => setPseudonyme(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label> Adresse mail</Form.Label>
            <Form.Control
              type='email'
              placeholder='Entrer une adresse mail'
              value={email}
              onChange={(e) => setMail(e.target.value)}
              required
            />
            <Form.Text className='text-muted'></Form.Text>
          </Form.Group>

          <Form.Group
            className='mb-3'
            controlId='formBasicPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <Form.Label> Mot de passe </Form.Label>
            <Form.Control
              type='password'
              placeholder='Entrer un mot de passe'
              required
            />
          </Form.Group>
          <Button variant='success' type='submit' value='Envoyer'>
            S'inscrire
          </Button>
        </Form>
      </div>
    </>
  )
}
export default Register
