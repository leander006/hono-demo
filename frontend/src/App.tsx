import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {Blog} from './pages/Blog'
import Blogs from './pages/Blogs'
import { Publish } from './pages/Publish'
import { useRecoilValue } from 'recoil';
import { tokenAtom } from './store/atoms/token'
function App() {

  const token = useRecoilValue(tokenAtom);
  
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={token !=null ?<Blog />:<Signin/>} />
          <Route path="/blogs" element={token != null ?<Blogs />:<Signin/>} />
          <Route path="/publish" element={token != null ?<Publish />:<Signup/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
