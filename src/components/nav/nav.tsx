import React, { useEffect, useState } from 'react';
import ASGARDEO_LOGO from "../../images/asgardeo-logo-transparent.png";
import routesConfig from '../../configs/routes-config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

const Nav: React.FunctionComponent<{}> = () => {
    const { state, signIn, signOut } = useAuthContext();
    const [ isResourcesAllowed, setIsResourcesAllowed ] = useState<boolean>();

    const navigate = useNavigate();

    const signUpURL = "https://accounts.asgardeo.io/t/dasuorg/accountrecoveryendpoint/register.do?client_id="
        + "8_0QVgk0nf5Lij6C2IIdsY4Jhl0a" + "&sp=" + "React App";

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

    // Filter the cutsom scope from the allowed scopes.
    useEffect(() => {
        if (state.isAuthenticated && state?.allowedScopes?.includes("read_profile")) {
            setIsResourcesAllowed(true);
        } 
    }, [state]);

    return (
        <div className="navbar">
            <div className="left-panel">
                <div onClick={() => navigate(routesConfig.home)}>
                    <img alt="react-logo" src={ ASGARDEO_LOGO } className="asgardeo-logo-image"/>
                </div>
            </div>
            <div className="center-panel">
                <a href="" onClick={routeHomeChange}>Home</a>
            </div>
             <div className="right-panel">
                { 
                    state.isAuthenticated
                    && <a href="" onClick={routeProfileChange}>Profile</a>
                }
                {
                    isResourcesAllowed
                    && <a href="" onClick={routeResourcesChange}>External API</a>
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
