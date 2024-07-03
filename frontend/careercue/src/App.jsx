import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Form } from 'react-router-dom'
import Main from './pages/home'
import LoginForm from './pages/login'
import Register from './pages/register'
import { TokenProvider } from './context/TokenContext'
import AuthCallback from './authCallback'
import { TokenContext } from './context/TokenContext'
import Logout from './pages/logout'
import Tag from './pages/Tag'
import Blog from './components/Blog'
import ExperienceForm from  './form'
function App() {
  // const token =useContext(TokenContext)
  const token = localStorage.getItem('authToken') || null;
  console.log("token:", token)

  return (
    <>
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={token ? <Main /> : <LoginForm />} >
          <Route path="/blogs" element={<Blog />} />
          <Route path="/tags" element={<Tag />} />
          <Route path="/addexpe" element={<ExperienceForm />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>

      </BrowserRouter>
    </TokenProvider>
    </>
  )
}

export default App