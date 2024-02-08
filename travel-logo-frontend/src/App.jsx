import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import PageNoteFound from './Pages/PageNoteFound';
import Auth from './Components/Auth';
import AllBlogs from './Components/AllBlogs';
import Dashboard from './Pages/Dashboard';
import ManageBlog from './Components/ManageBlog';
import SingleBlog from './Components/SingleBlog';
import AllProfile from './Components/AllProfile';
import Blogger from './Components/Blogger';
import ForgotPassword from './Components/ForgotPassword';


function App() {
  return (
    < >
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Auth register/>} />
        <Route path='/login' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/bloggers' element={<AllProfile />} />
        <Route path='/bloggers/profile/:id' element={<Blogger />} />
        <Route path='/singleBlog/:id' element={<SingleBlog/>}/>
        <Route path='/dashboard/edit/:id' element={<ManageBlog />} />
        <Route path='/blog'  element={<AllBlogs/>}/>
        <Route path='login/fogotpassword'  element={<ForgotPassword/>}/>
        <Route path='*' element={<PageNoteFound/>}/>
      </Routes>
      <Footer/>
     
    </>
  );
}

export default App;
