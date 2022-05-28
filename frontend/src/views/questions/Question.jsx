import { Button, Form } from 'react-bootstrap'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './question.css'
import QuizProgress from '../../components/quizStatus/QuizProgress'
import { useSelector, useDispatch } from 'react-redux'
import { submitQuiz } from '../../features/quiz/quizSlice'
import { Card } from 'react-bootstrap'

const Question = () => {
  const dispatch = useDispatch()
  // Récuperation des informations du state global
  const questions = useSelector((state) => state.quiz.questions)
  const score = useSelector((state) => state.quiz.score)
  const username = useSelector((state) => state.user.user.pseudo)
  const { id } = useParams()

  const navigate = useNavigate()
  // Initialisation du State local de la question en Cours
  const [selected, setSelected] = useState({
    index: parseInt(id) - 1,
    answer: null,
  })

  useEffect(() => {
    if (!questions) navigate('/jouer')
  }, [questions])

  return (
    <>
      <QuizProgress current={parseInt(id) - 1} questions={questions} />
      {questions && questions.length && (
        <Form id='answers'>
          <Card className='questionCard'>
            <h3 className='text-center'>
              {questions[parseInt(id) - 1].question}
            </h3>
          </Card>
          <Card className='answersCard'>
            <p>
              {Object.keys(questions[parseInt(id) - 1].answers).map(
                (answer) =>
                  questions[parseInt(id) - 1].answers[answer] && (
                    <Form.Group key={answer}>
                      <Form.Check.Label className='answer'>
                        <Form.Check.Input
                          readOnly
                          checked={selected.answer == answer}
                          name='selected'
                          type='radio'
                          id={answer}
                          onClick={(e) => {
                            setSelected({
                              index: parseInt(id) - 1,
                              answer: e.target.id,
                            })
                          }}
                        />
                        {`${questions[parseInt(id) - 1].answers[answer]}`}
                      </Form.Check.Label>
                    </Form.Group>
                  )
              )}
            </p>
          </Card>

          <p
            style={{
              'margin-top': '10px',
              'text-align': 'center',
              'font-weight': 'bold',
              color: 'yellow',
              'font-size': '40px',
              'text-shadow':
                '0px 0px 0 rgb(250, 138, 2), 1px 1px 0 rgb(245, 133, 0), 2px 2px 0 rgb(240, 128, 0), 3px 3px 0 rgb(235, 123, 0), 4px 4px 0 rgb(230, 118, 0), 5px 5px 0 rgb(225, 113, 0), 6px 6px 0 rgb(220, 108, 0), 7px 7px 0 rgb(215, 103, 0), 8px 8px 0 rgb(210, 98, 0), 9px 9px 0 rgb(205, 93, 0), 10px 10px 0 rgb(200, 88, 0), 11px 11px 10px rgba(0, 0, 0, 0.6), 11px 11px 1px rgba(0, 0, 0, 0.5), 0px 0px 10px rgba(0, 0, 0, .2)',
            }}
          >
            {' '}
            {score}{' '}
          </p>

          {id < 10 ? (
            selected.answer ? (
              <Link to={`/play/question/${parseInt(id) + 1}`}>
                <div className='text-center'>
                  <Button
                    variant='success'
                    type='submit'
                    onClick={(e) => {
                      if (!e.target.disabled) {
                        dispatch({
                          type: 'quiz/setAnswer',
                          payload: {
                            index: selected.index,
                            answer: selected.answer,
                          },
                        })
                        setSelected({ index: parseInt(id), answer: null })
                      }
                    }}
                  >
                    Suivant{' '}
                  </Button>
                </div>
              </Link>
            ) : (
              <div className='text-center'>
                <Button disabled variant='success' type='submit'>
                  Suivant{' '}
                </Button>
              </div>
            )
          ) : selected.answer ? (
            <Link to={`/done`}>
              <div className='text-center'>
                <Button
                  variant='success'
                  type='submit'
                  onClick={(e) => {
                    dispatch({
                      type: 'quiz/setAnswer',
                      payload: {
                        index: selected.index,
                        answer: selected.answer,
                      },
                    })
                    console.log(score)
                    dispatch(submitQuiz({ user: username, score }))
                  }}
                >
                  Soumettre
                </Button>
              </div>
            </Link>
          ) : (
            <div className='text-center'>
              <Button disabled variant='success' type='submit'>
                Soumettre
              </Button>
            </div>
          )}
        </Form>
      )}
    </>
  )
}

export default Question
