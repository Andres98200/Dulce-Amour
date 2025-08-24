import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar'; 
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Login from './pages/Login';
import EditPage from './pages/EditPage';
import { PrivateRoute } from './components/layouts/PrivateRoute';

function App() {
  return (
    <Router>
  <Navbar />
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/about-us" element={<div>About us</div>} />
    <Route path="/products" element={<Products />} />
    <Route path="/home" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route
      path="/edit"
      element={
        <PrivateRoute>
          <EditPage />
        </PrivateRoute>
      }
    />
  </Routes>
  <Footer />
</Router>

  );
}

export default App;
