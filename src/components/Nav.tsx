import React, { useEffect, useState } from 'react';
import ASGARDEO_LOGO from '../images/asgardeo-logo-transparent.png';
import routesConfig from '../configs/routes-config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

const Nav: React.FunctionComponent<{}> = () => {
    const { state, signIn, signOut, getIDToken } = useAuthContext();
    const [ isResourcesAllowed, setIsResourcesAllowed ] = useState<boolean>();

    const navigate = useNavigate();

    const signUpURL = `${process.env.REACT_APP_SIGN_UP_URL}${process.env.REACT_APP_CLIENT_ID} &sp=${process.env.REACT_APP_APPLICATION_NAME}`;

    const routeProfileChange = () =>{ 
        let path = routesConfig.profile; 
        navigate(path);
    }

    const routeResourcesChange = () =>{ 
        let path = routesConfig.resource; 
        navigate(path);
    }

    const routeHomeChange = () =>{ 
        let path = routesConfig.home; 
        navigate(path);
    }

    useEffect(() => {
        console.log("state");
        getIDToken().then((decodedIdToken) => {
            console.log(decodedIdToken);
            setIsResourcesAllowed(true);
        }).catch((error) => {
            //console.log(error);
        })
    }, [getIDToken, state]);

    // Filter the custom scope from the allowed scopes.
    // useEffect(() => {
    //     if (state.isAuthenticated && state?.allowedScopes?.includes('read_profile')) {
    //         setIsResourcesAllowed(true);
    //     } 
    // }, [state]);

    return (
        <div className='navbar'>
            <div className='left-panel'>
                <div onClick={() => navigate(routesConfig.home)}>
                    <img alt='react-logo' src={ ASGARDEO_LOGO } className='asgardeo-logo-image'/>
                </div>
            </div>
            <div className='center-panel'>
                <a href='null' onClick={routeHomeChange}>Home</a>
            </div>
             <div className='right-panel'>
                { 
                    state.isAuthenticated
                    && <a href='null' onClick={routeProfileChange}>Profile</a>
                }
                {
                    isResourcesAllowed
                    && <a href='null' onClick={routeResourcesChange}>API Call</a>
                }
                { state.isAuthenticated ? (
                    <button className='btn' onClick={() => signOut()}>Signout</button>
                ) : (
                    <>
                        <button className='btn' onClick={() => signIn()}>Signin</button>
                        <a href={signUpURL}>
                            <button className='btn'>Signup</button>
                        </a>
                    </>
                ) }
            </div>
        </div>
    )
}

export default Nav;
