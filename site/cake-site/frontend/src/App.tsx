import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar'; 
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path='/AboutUs' element={<div> About us </div>}/>
        <Route path='/Products' element={<div> Products </div>}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/product/:id' element={<ProductDetails />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
