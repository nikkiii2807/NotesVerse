import React from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'

const routes=(
  <Router>
    <Routes>
    <Route path="/dashboard" exact element={<Home/>}/>
    <Route path="/Login" exact element={<Login/>}/>
    <Route path="/Signup" exact element={<Signup/>}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
     {routes}
    </div>
  )
}

export default App
