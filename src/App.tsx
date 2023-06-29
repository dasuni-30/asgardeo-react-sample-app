import './App.css';
import Nav from './components/Nav';
import Profile from './components/Profile';
import { HomePage } from './pages/Home';
import { NotFoundPage } from './pages/404';
import { ResourcesPage } from './pages/Resources';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthenticatedComponent } from '@asgardeo/auth-react';

function App() {

  return (
    <Router>
        <div className='App'>
            <Nav></Nav>
            <Routes>
                <Route path='/' element={ <HomePage /> } />
                <Route
                    path='/profile'
                    element={
                        <AuthenticatedComponent
                            fallback={ <HomePage/> }
                        >
                            <Profile />
                        </AuthenticatedComponent>
                        
                    } />
                <Route
                    path='/resource'
                    element={ 
                        <AuthenticatedComponent
                            fallback={ <HomePage/> }
                        >
                            <ResourcesPage />
                        </AuthenticatedComponent>
                    }
                />
                <Route path='*' element={ <NotFoundPage /> } />
            </Routes>
            <Footer />
          </div>
        </Router>
  );
}

export default App;
