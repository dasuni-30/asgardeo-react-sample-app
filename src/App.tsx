import './App.css';
import Nav from './components/nav/nav';
import Profile from './components/profile/profile';
import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/404';
import { ResourcesPage } from './pages/resources';
import Footer from './components/footer/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthContext } from '@asgardeo/auth-react';
// import { SecureRoute, useAuthContext } from "@asgardeo/auth-react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const { state, signIn } = useAuthContext();

  console.log(state);

  return (
    <Router>
        <div className="App">
            <Nav></Nav>
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/profile" element={ <Profile /> } />
                <Route path="/resource" element={ <ResourcesPage /> } />
                <Route element={ <NotFoundPage /> } />
            </Routes>
            <Footer />
          </div>
          
        </Router>
    
    // <Router>
    //         <Switch>
    //             <Route exact path="/home" component={ HomePage } />
    //             <SecureRoute
    //                 path="/secure-page"
    //                 component={ SecurePageComponent } 
    //                 callback={ () => {
    //                     // Fires when the user is not authenticated.
    //                     // Will be directed to sign in.
    //                     signIn();
    //                 }}
    //             />
    //             <Route component={NotFoundPage} />
    //         </Switch>
    //     </Router>

  );
}

export default App;
