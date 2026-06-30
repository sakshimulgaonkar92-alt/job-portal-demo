import { useState } from 'react'
import Login from './pages/login'
import Dashboard from './pages/dashboard'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return loggedIn
    ? <Dashboard onLogout={() => setLoggedIn(false)} />
    : <Login onLogin={() => setLoggedIn(true)} />
}