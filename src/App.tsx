import './App.css';
import Nav from './components/nav/nav';
import Profile from './components/profile/profile';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/404';
import { ResourcesPage } from './pages/resources';
import Footer from './components/footer/footer';

function App() {

  return (
    <Router>
        <div className="App">
            <Nav></Nav>
            <header className="App-header">
            <div>
                <h1>Jump to the start pack</h1>
                <p className='p-description'>This application demonstrates the authentication flow using React and Asgardeo.</p>
            </div>
            </header>
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/profile" element={ <Profile /> } />
                <Route path="/resource" element={ <ResourcesPage /> } />
                <Route element={ <NotFoundPage /> } />
            </Routes>
            <Footer/>
        </div>
        </Router>
  );
}

export default App;
