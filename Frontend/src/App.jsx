import React from 'react'
import FormEaseMockup from './FormEaseMockup'
import { Route , Routes} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from './Home'


const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fillform/:formid" element={<FormEaseMockup />} />
        
      </Routes>

      
           
    </div>
  )
}

export default App
