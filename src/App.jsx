import { Outlet } from 'react-router-dom'
import Navbar from './components/NavBar'

// CRUD COM JSON SERVER

function App() { 
  return (
    <>
      <Navbar />
      <Outlet />
      <p>Footter</p>
    </>
  )
}
export default App