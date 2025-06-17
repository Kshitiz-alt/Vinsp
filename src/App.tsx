
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Mainpage from './root/Mainpage';
import Layout from './Components/layout/Layout';
import NewTracksPage from './app/Pages/NewTracksPage';
import AlbumsPage from './app/Pages/AlbumsPage';
import SearchPage from './app/SearchPage';


function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Mainpage/>}/>
            <Route path='/newtracks' element={<NewTracksPage/>}/>
            <Route path='/albums/:id' element={<AlbumsPage/>}/>
            <Route path='/search' element={<SearchPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
   
    </>
  )
}

export default App
