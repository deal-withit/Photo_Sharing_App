import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import About from './components/about/about'
import AccountConfirmed from './components/emailVerified'
import Home from './components/home'
import Login from './components/login/login'
import MainPage from './components/main'
import ForgotPassword from './components/passwordreset/ForgotPassword'
import PasswordReset from './components/passwordreset/PasswordReset'
import Register from './components/register/register'
import ErrorPage from './components/errorPage'
import TopNavBar from './components/topnavbar/TopNavBar'
import LogOut from './components/logout'
const App = () => {
  return (
    <Router>
      <div className='App'>
      <TopNavBar/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
          <Route exact path='/about' element={<About/>}></Route>
          <Route exact path='/welcome' element={<MainPage/>}></Route>
          <Route exact path='/activate/:token' element={<AccountConfirmed/>}></Route>
          <Route exact path='/forgotpassword/:id/:token' element={<ForgotPassword/>}></Route>
          <Route exact path='/passwordreset' element={<PasswordReset/>}></Route>
          <Route exact path='/errorpage' element={<ErrorPage/>}></Route>
          <Route exact path='/logout' element={<LogOut/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App; 