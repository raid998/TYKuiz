import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/HomePage/Home'
import Play from './views/PlayPage/Play'
import Login from './views/LoginPage/Login'
import LeaderBoard from './views/LeaderBoardPage/LeaderBoard'
import Register from './views/RegisterPage/Register'
import Header from './components/header/Header'
import Question from './views/questions/Question'
import Footer from './components/footer/Footer'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'
import { selectUser } from './features/user/userSlice'
import DonePage from './views/DonePage/DonePage'
const App = () => {
  const user = useSelector(selectUser)

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />{' '}
          <Route path='/home' element={<Home />} />{' '}
          <Route path='/login' element={<Login />} />{' '}
          <Route path='/register' element={<Register />} />{' '}
          <Route path='/play' exact element={<Play />} />{' '}
          <Route path='/play/question/:id' element={<Question />} />{' '}
          <Route path='/leaderboard' exact element={<LeaderBoard />} />
          <Route path='/done' exact element={<DonePage />} />
        </Routes>{' '}
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
