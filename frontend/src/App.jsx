 
import './App.css'

import Home from './components/home/Home'
import Events from './components/events/Events'
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Layout from './components/shared/Layout'


function App() { 

  return (
      <Router>
        <Routes>
          <Route  element={<Layout />}>
             <Route path='/events' element={<Events/>}/>
             <Route path='/home' element={<Home/>}/> 
          </Route>
        </Routes>
      </Router>
 
  )
}

export default App
