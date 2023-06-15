import './App.css';
import { useAuthContext } from "@asgardeo/auth-react";
import Nav from './components/nav/nav';
import Cards from './components/cards/cards';
import Profile from './components/profile/profile';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/404';
import Footer from './components/footer/footer';

function App() {
  const { state, signIn, signOut } = useAuthContext();

  const signUp = () => {

  };

  return (
    <Router>
        <div className="App">
        <Nav></Nav>
        <header className="App-header">
            <div>
                <h1>Jump to the start pack</h1>
                <p className='p-description'>This application demonstrates the authentication flow using React and Asgardeo.</p>
            
                { state.isAuthenticated ? (
                    <>
                        <p>Hello {state.username}</p>
                        <button onClick={() => signOut()}>Signout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => signIn()}>Signin</button>
                        <a href='https://accounts.asgardeo.io/t/dasuorg/accountrecoveryendpoint/register.do?client_id='>
                            <button onClick={() => signUp()}>Signup</button>
                        </a>
                    </>
                ) }
            </div>
            </header>
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/profile" element={ <Profile /> } />
            <Route element={ <NotFoundPage /> } />
        </Routes>
        <Footer/>
        </div>
    </Router>
    
  );
}

export default App;
