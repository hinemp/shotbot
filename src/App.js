import { Container } from 'react-bootstrap'
import NavbarComp from './NavbarComp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import HistoryPage from './Pages/HistoryPage';
import HomePage from './Pages/HomePage';
import ComparePage from './Pages/ComparePage';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavbarComp></NavbarComp>
        <br></br>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path='/history' element={<HistoryPage />}></Route>
            <Route path='/compare' element={<ComparePage />}></Route>
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
