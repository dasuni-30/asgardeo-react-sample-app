import './App.css';
import { useAuthContext } from "@asgardeo/auth-react";
import Nav from './components/nav/nav';
import Cards from './components/cards/cards';

interface Card {
    id: number;
    url: string;
    title: string;
  };

  interface Props {
  data: Array<Card>;
};

function App() {
  const { state, signIn, signOut } = useAuthContext();

  const data: Array<Card> = [{id: 22, url: "jjik", title: "hjj"}, {id: 22, url: "jjik", title: "hjj"}, {id: 22, url: "jjik", title: "hjj"}];

  return (
    <div className="App">
        <>
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
        </>
        <Cards></Cards>
        <div className="footer">
            <footer className="page-footer font-small blue">
                <div className="footer-copyright text-center py-3">© 2023 Copyright:
                    <a href="https://wso2.com/"> WSO2.Inc</a>
                </div>
            </footer>
        </div>
    </div>
  );
}

export default App;
