import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editorpage from './pages/Editorpage';        
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/editor' element={<Editorpage/>}/>
     </Routes>
    </BrowserRouter>
    <Toaster />
    </>
  );
}
export default App;
