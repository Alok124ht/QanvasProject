import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/Login.js'
import SignUp from './components/signup.js'
import UserDetails from "./components/userDetails";
import UserList from './components/paginatedUser'
function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/UserList" element={<UserList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
