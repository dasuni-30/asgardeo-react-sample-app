import './App.css';
import { useAuthContext } from "@asgardeo/auth-react";
import Nav from './components/nav/nav';
import Cards from './components/cards/cards';
import Profile from './components/profile/profile';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/404';

function App() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <Router>
        <div className="App">
        <Nav></Nav>
        <header className="App-header">
            <div>
                <h1>Sample Application</h1>
                <p className='p-description'>This sample application demonstrates the authentication flow using React and Asgardeo.</p>
            
                { state.isAuthenticated ? (
                    <>
                        <p>Hello {state.username}</p>
                        <button onClick={() => signOut()}>Signout</button>
                    </>
                ) : (
                    <button onClick={() => signIn()}>Signin/ Signup</button>
                ) }
            </div>
            </header>
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/profile" element={ <Profile /> } />
            <Route element={ <NotFoundPage /> } />
        </Routes>
        <div className="footer">
            <footer className="page-footer font-small blue">
                <div className="footer-copyright text-center py-3">© 2023 Copyright:
                    <a href="https://wso2.com/"> WSO2.Inc</a>
                </div>
            </footer>
        </div>
        </div>
    </Router>
    
  );
}

export default App;
