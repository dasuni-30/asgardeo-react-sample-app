import { FunctionComponent, ReactElement } from 'react';
import ASGARDEO_LOGO from '../images/asgardeo-logo.png';
import REACT_LOGO from '../images/react-logo-black.png';
import { useAuthContext } from '@asgardeo/auth-react';
import Links from '../components/Links';

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Home: FunctionComponent = (): ReactElement => {

    const { state, signIn } = useAuthContext();


    const signUpURL = `${process.env.REACT_APP_SIGN_UP_URL}${process.env.REACT_APP_CLIENT_ID} &sp=${process.env.REACT_APP_APPLICATION_NAME} &redirect_url=${process.env.REACT_APP_CLIENT_BASE_URL}`;

    return (
        <div className='App'>
                {
                    state?.isAuthenticated
                    ? (
                        <header className='App-header-section App-header-length'>
            <div>
                        <>
                         <h1 className='p-description'>Hello <b>{state?.username}</b>!</h1>
                         <p className='p-description'>This application demonstrates the authentication flow using React and Asgardeo.</p>
                         </>
                         </div>
            </header>
                    ) : (
                        <header className='App-header-section'>
            <div>
                        <>
                        <div className="container">
                            <div className="container-column">
                                <img alt='react-logo' src={ ASGARDEO_LOGO } className='asgardeo-logo-image logo'/>
                            </div>
                            <div className="container-column">
                                +
                            </div>
                            <div className="container-column">
                                <img alt='react-logo' src={ REACT_LOGO } className='asgardeo-logo-image logo'/>
                            </div>
                        </div>
                        <h1>Quick Start Boilerplate Application</h1>
                        <p className='p-description'>This application demonstrates the authentication flow using React and Asgardeo.</p>
                        <div className='button-container'>
                            <button className='btn' onClick={() => signIn()}>Sign In</button>
                            <a href={signUpURL}>
                                <button className='btn-outline large-button'>Create an account</button>
                            </a>
                        </div>
                    </>
                    </div>
            </header>
                    )
                }
            <h3>What can we do next?</h3>
            <Links></Links>
        </div>
    );
};
