import React from 'react'
import './quiz-progress.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
const QuizProgress = ({ questions, current }) => {
  return (
    <div className='text-center'>
      {questions.map((x, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faCircle}
          className={`dot ${i == current ? 'current' : null} ${
            questions[i].answered ? 'answered' : 'unanswered'
          }`}
        />
      ))}
    </div>
  )
}

export default QuizProgress
