 
import './App.css'
 
import Events from './components/events/Events'
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom'

function App() { 

  return (
 
      <div className="min-h-screen bg-(--background-dark-blue)">
        <Events/> 
      </div>
 
  )
}

export default App
