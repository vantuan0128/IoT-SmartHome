import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarElement from './components/NavBarElement';
import DashBoard from './pages/DashBoard';
import Profile from './pages/Profile'
import ActionHistory from './pages/ActionHistory'
import DataSensors from './pages/DataSensors'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBarElement />
          <hr/>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/data-sensors" element={<DataSensors />} />
            <Route path="/action-history" element={<ActionHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
