import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './play.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuiz } from '../../features/quiz/quizSlice'

const Play = () => {
  let navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const [formState, setFormState] = useState({ cat: 'linux', diff: 'easy' })

  const dispatch = useDispatch()
  const sendForm = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  return (
    <>
      <h2 className='titlePlay' id='paramètres'>
        Sélectionner vos paramètres{' '}
      </h2>
      <div className='box'>
        <Form onSubmit={sendForm}>
          <p>Choisir une catégorie</p>
          <Form.Select
            onChange={(e) => {
              setFormState({ ...formState, cat: e.target.value })
            }}
          >
            <option value='Linux'>Linux</option>
            <option value='DevOps'>DevOps</option>
            <option value='Docker'>Docker</option>
            <option value='SQL'>SQL</option>
          </Form.Select>
          <br></br>
          <p>Choisir la difficulté</p>
          <Form.Select
            onChange={(e) => {
              setFormState({ ...formState, diff: e.target.value })
            }}
          >
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </Form.Select>
          <br></br>
          {/* <Link to={`question/${id}`}> */}
          <Button
            className='standardButton'
            id='startButton'
            variant='warning'
            size='lg'
            type='submit'
            onClick={() => {
              dispatch(fetchQuiz({ diff: formState.diff, cat: formState.cat }))
              navigate('/play/question/1')
            }}
          >
            Commencer
          </Button>{' '}
          {}
        </Form>
      </div>
    </>
  )
}

export default Play
