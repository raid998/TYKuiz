import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DonePage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/home')
    }, 5000)
  })
  return <h1>Vos réponses ont été bien soumies, votre score est mis à jour</h1>
}

export default DonePage
