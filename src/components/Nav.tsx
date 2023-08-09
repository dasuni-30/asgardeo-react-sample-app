import React, { useEffect, useState } from 'react';
import ASGARDEO_LOGO from '../images/asgardeo-logo-transparent.png';
import routesConfig from '../configs/routes-config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

/**
 * Nav bar component.
 */
const Nav: React.FunctionComponent<{}> = () => {
    const { state, signOut, getDecodedIDToken } = useAuthContext();
    const [ isResourcesAllowed, setIsResourcesAllowed ] = useState<boolean>();

    const navigate = useNavigate();

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

    // Filter the display of API Call section based on the application role.
    useEffect(() => {
        getDecodedIDToken().then((decodedIdToken) => {
            if (decodedIdToken?.application_roles === "React-App-Manager") {
                setIsResourcesAllowed(true);
            }
        }).catch((error) => {
            
        })
    }, [getDecodedIDToken, state]);

    return (
        <div className='navbar-section'>
            <div className='navbar'>
                <div className='left-panel'>
                    <div onClick={() => navigate(routesConfig.home)}>
                        <img alt='react-logo' src={ ASGARDEO_LOGO } className='asgardeo-logo-image-small'/>
                    </div>
                </div>
                <div className='center-panel'>
                    <a href='#/' onClick={routeHomeChange}>Home</a>
                    { 
                        state.isAuthenticated
                        && <a href='#/' onClick={routeProfileChange}>Profile</a>
                    }
                    {
                        isResourcesAllowed
                        && <a href='#/' onClick={routeResourcesChange}>API Call</a>
                    }
                </div>
                <div className='right-panel'>
                    { state.isAuthenticated &&
                        <>
                            <a href='#/'>{state?.username}</a>
                            <button className='btn-outline' onClick={() => signOut()}>Sign out</button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Nav;
