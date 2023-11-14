import CarList from './components/CarList'
import './App.css'
import { AppBar, Typography } from '@mui/material'

function App() {

  return (
    <>
    <AppBar position='static'>
      <Typography variant='h6' textAlign="center">
        Car Shop
      </Typography>
    </AppBar>
      <CarList />
    </>
  )
}

export default App
