import './App.css';
import Home from './screens/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login.jsx';
//import Signup from './screens/Signup.jsx';
import MyOrder from './screens/MyOrder.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            {/* <Route exact path="/createuser" element={<Signup />} /> */}
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
