import './App.css'
import Favorites from './components/Favorites'
import FooterApp from './components/Footer'
import Meals from './components/Meals'
import ModalComponent from './components/Modal'
import Search from './components/Search'
import { useGlobalContext } from './context'

function App() {
  const { showModal, favorites } = useGlobalContext()

  return (
    <main className='container bg-[#f6f6f6] max-w-full'>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <ModalComponent />}
      <FooterApp />
    </main>
  )
}

export default App
