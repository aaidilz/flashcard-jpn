import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbars from './components/Navbars';
import MainCard from './components/MainCard';
import Home from './components/Home';
import CrudCard from './components/CrudCard';


const App = () => {
  return (
    <Router>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latihan" element={<MainCard />} />
        <Route path="/crud" element={<CrudCard/>} />
      </Routes>
    </Router>
  );
};

export default App;