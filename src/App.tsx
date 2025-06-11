
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Mainpage from './root/Mainpage';
import Layout from './Components/layout/Layout';


function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Mainpage/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
   
    </>
  )
}

export default App
