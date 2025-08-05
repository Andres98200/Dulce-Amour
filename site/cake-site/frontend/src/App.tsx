import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar'; 
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path='/AboutUs' element={<div> About us </div>}/>
        <Route path='/Products' element={<Products/>}/>
        <Route path='/Home' element={<Home />}/>
        <Route path='/product/:id' element={<ProductDetails />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
