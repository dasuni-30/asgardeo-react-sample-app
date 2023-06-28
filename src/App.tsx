import './App.css';
import Nav from './components/nav/nav';
import Profile from './components/profile/profile';
import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/404';
import { ResourcesPage } from './pages/resources';
import Footer from './components/footer/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthenticatedComponent, SecureRoute, useAuthContext } from '@asgardeo/auth-react';
// import { SecureRoute, useAuthContext } from "@asgardeo/auth-react";
// import { BrowserRouter, Route } from "react-router-dom";

function App() {
  const { state, signIn } = useAuthContext();

  console.log(state);

  return (
    <Router>
        <div className="App">
            <Nav></Nav>
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route
                    path="/profile"
                    element={
                        <AuthenticatedComponent
                            fallback={ <HomePage/> }
                        >
                            <Profile />
                        </AuthenticatedComponent>
                        
                    } />
                <Route
                    path="/resource"
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
