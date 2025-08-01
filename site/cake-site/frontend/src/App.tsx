import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar'; 
import Footer from './components/layouts/Footer';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Footer />
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path='/AboutUs' element={<div> About us </div>}/>
        <Route path='/Products' element={<div> All products</div>}/>
        <Route path='/Home' element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
