import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NewTask from './components/NewTask';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
