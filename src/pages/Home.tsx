import { FunctionComponent, ReactElement } from 'react';
import ASGARDEO_LOGO from '../images/asgardeo-logo-transparent.png';
import GITHUB_ICON from '../images/github.png';
import USER_LOGO from '../images/user.png'
import REACT_LOGO from '../images/react-logo.png';
import { useAuthContext } from '@asgardeo/auth-react';
import Cards from '../components/Cards';

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
              <>
              <header className='App-header-section App-header-length'>
                <div>
                  <div className="avatar-large">
                    <img alt='react-logo' src={ USER_LOGO } className='link-logo-image'/>
                  </div>
                  <h1 className='p-description'>Hello <b>{state?.username}</b>!</h1>
                  <h4>Welcome to the React + Asgardeo demonstration app</h4>
                  <p className='p-description'>As you have already experienced the authentication flow to get here. From here you can experience of basic business application usecase with the support of Asgardeo for user profile managing etc. </p>

                </div>
              </header>

              <Cards></Cards>
              </>
            ) : (
              <header className='App-header-section'>
                <div>
                  <div className="container">
                    <div className="logo-container">
                      <img alt='react-logo' src={ REACT_LOGO } className='react-logo-image logo'/>
                  </div>
                </div>
                  <div className='logo-container'>
                    <h1>Enhance your application’s IAM experience with </h1>
                    <img alt='react-logo' src={ ASGARDEO_LOGO } className='asgardeo-logo-image'/>
                  </div>
                  <p className='p-description'>This sample demonstrates the authentication flow 
                    for React application using Asgardeo</p>
                  <div className='button-container'>
                    <button className='btn' onClick={() => signIn()}>Sign In</button>
                    <a href={signUpURL}>
                      <button className='btn-outline large-button'>Create an account</button>
                    </a>
                  </div>
                  <br/>
                  <br/>
                  <div className="container-column">
                    <a href='https://github.com/dasuni-30/asgardeo-react-sample-app'>
                        <img alt='react-logo' src={ GITHUB_ICON } className='link-logo-image-small logo'/>
                    </a>
                    <a href='https://github.com/dasuni-30/asgardeo-react-sample-app'>
                      Explore the source code
                    </a>
                </div>
                  
                </div>
              </header>
            )
          }
        </div>
    );
};
