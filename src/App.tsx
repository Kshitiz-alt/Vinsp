
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Mainpage from './root/Mainpage';
import Layout from './Components/layout/Layout';
import AlbumsPage from './app/Pages/AlbumsPage';
import SearchPage from './app/SearchPage';
import ArtistsPage from './app/Pages/ArtistsPage';
import { AnimatePresence } from 'framer-motion';


function App() {

  return (
    <>
      <AnimatePresence mode='wait'>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Mainpage />} />
              <Route path='/albums/:id' element={<AlbumsPage />} />
              <Route path='/artists/:id' element={<ArtistsPage />} />
              <Route path='/search' element={<SearchPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AnimatePresence>

    </>
  )
}

export default App
