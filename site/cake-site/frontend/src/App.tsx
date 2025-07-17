import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        {/* Ajoute tes autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;
