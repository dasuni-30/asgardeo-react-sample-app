import './App.css';
import Nav from './components/Nav';
import Profile from './components/Profile';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Resources } from './pages/Resources';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthenticatedComponent } from '@asgardeo/auth-react';

// const ProtectedRoute = (component: React.FunctionComponent<{}>) => {
//     const { state: { isAuthenticated } } = useAuthContext();
//     return <> { isAuthenticated ? component :  <Home/> } </>;
//   };


function App() {

  return (
    <Router>
        <div className='App'>
            <Nav></Nav>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route
                    path='/profile'
                    element={
                        <AuthenticatedComponent
                            fallback={ <Home/> }
                        >
                            <Profile />
                        </AuthenticatedComponent>
                        
                    } />
                <Route
                    path='/resource'
                    element={ 
                        <AuthenticatedComponent
                            fallback={ <Home/> }
                        >
                            <Resources />
                        </AuthenticatedComponent>
                    }
                />
                {/* <Route
                    path="/profile"
                    element={<ProtectedRoute component={Profile} />}
                /> */}
                <Route path='*' element={ <NotFound /> } />
            </Routes>
            <Footer />
          </div>
        </Router>
  ); 
}

export default App;
