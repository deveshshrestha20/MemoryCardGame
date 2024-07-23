
import AppComponent from './components/AppComponent'
import ButtonOpen from './components/ButtonOpen'
import GameBoardComponent from './components/GameBoardComponent'
import './index.css'



function App() {
  

  return (
    <div className='bg-teal-800 min-h-screen flex justify-center items-center'>
      <AppComponent/>
      <ButtonOpen/>
      <GameBoardComponent/>
      
    </div>
  )
}

export default App
