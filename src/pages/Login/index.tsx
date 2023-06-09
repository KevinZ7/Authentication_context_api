import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'


const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <Link to="/register">
        <button>Don't Have Account - Signup</button>
      </Link>
    </div>
  )
}

export default LoginPage