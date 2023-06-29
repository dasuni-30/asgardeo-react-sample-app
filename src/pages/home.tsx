import { FunctionComponent, ReactElement } from 'react';
import Cards from '../components/Cards';
import REACT_LOGO from '../images/react-logo.png';
import { useAuthContext } from '@asgardeo/auth-react';

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const HomePage: FunctionComponent = (): ReactElement => {

    const { state } = useAuthContext();

    return (
        <div className='App'>
            <header className='App-header'>
            <div>
            <img alt='react-logo' src={ REACT_LOGO } className='react-logo-image logo'/>
                <h1>Quick Start Pack</h1>
                <p className='p-description'>This application demonstrates the authentication flow using React and Asgardeo.</p>
                { state.isAuthenticated && 
                    <>
                        <p className='p-description'>Hello <b>{state?.username}</b>!</p>
                    </>
                }
            </div>
            </header>
            <h3>What can we do next?</h3>
            <Cards></Cards>
        </div>
    );
};
